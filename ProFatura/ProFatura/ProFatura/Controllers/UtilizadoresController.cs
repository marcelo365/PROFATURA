using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using ProFatura.Model;
using Shared;

namespace ProFatura.Controllers
{

    [Route("api/Utilizadores")]
    [ApiController]
    public class UtilizadoresController : Controller
    {
        private readonly IUtilizadoresRepository utilizadoresRepository;

        public UtilizadoresController(IUtilizadoresRepository utRepo)
        {
            this.utilizadoresRepository = utRepo;
        }

        [HttpGet]
        [Route("GetUtilizador")]
        public async Task<ActionResult<Utilizador>> GetUtilizador(int id)
        {
            Utilizador utilizador = await utilizadoresRepository.GetUtilizadorAsync(id);

            if (utilizador == null)
            {
                return NotFound();
            }

            return Ok(utilizador);
        }

        [HttpGet]
        [Route("GetAllUtilizadores")]
        public async Task<IActionResult> GetAllUtilizadores()
        {
            return Ok (await utilizadoresRepository.GetAllUtilizadoresAsync());
        }

        [HttpGet]
        [Route("GetFuncionarioComMaisReceita")]
        public async Task<ActionResult<Utilizador>> GetFuncionarioComMaisReceita()
        {
            Utilizador utilizador = await utilizadoresRepository.GetFuncionarioComMaisReceitaAsync();

            if (utilizador == null)
            {
                return NotFound();
            }

            return Ok(utilizador);
        }

        [HttpPut]
        [Route("UpdateUtilizador")]
        public async Task<IActionResult> UpdateUtilizador([FromBody] Utilizador utilizador)
        {
            bool verificar = await utilizadoresRepository.UpdateUtilizadorAsync(utilizador);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Utilizador não atualizado");
            }
        }

        [HttpGet]
        [Route("GetUtilizadorByUserName")]
        public async Task<ActionResult<Utilizador>> GetUtilizadorByUserName(string userName)
        {
            Utilizador utilizador = await utilizadoresRepository.GetUtilizadorByUsernameAsync(userName);

            if (utilizador == null)
            {
                return NotFound();
            }

            return Ok(utilizador);
        }

        [HttpPost]
        [Route("CreateUtilizador")]
        public async Task<IActionResult> CreateUtilizador(Utilizador user)
        {
            bool verificar = await utilizadoresRepository.CreateUtilizadorAsync(user);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Utilizador não criado");
            }
        }

        [HttpDelete]
        [Route("DeleteUtilizador")]
        public async Task<IActionResult> DeleteUtilizador(int id)
        {
            bool verificar = await utilizadoresRepository.DeleteUtilizadorAsync(id);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Utilizador não deletado");
            }
        }




    }
}
