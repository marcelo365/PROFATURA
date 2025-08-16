using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using ProFatura.Model;
using Shared;

namespace ProFatura.Controllers
{
    public class ClientesController : Controller
    {
        private readonly IClientesRepository clientesRepository;

        public ClientesController(IClientesRepository cliRepo)
        {
            this.clientesRepository = cliRepo;
        }

        [HttpGet]
        [Route("GetCliente")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            Cliente cliente = await clientesRepository.GetClienteAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpGet]
        [Route("GetClienteComMaisReceita")]
        public async Task<ActionResult<Cliente>> GetClienteComMaisReceita()
        {
            Cliente cliente = await clientesRepository.GetClienteComMaisReceitaAsync();

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpGet]
        [Route("GetAllClientes")]
        public async Task<IActionResult> GetAllClientes()
        {
            return Ok(await clientesRepository.GetAllClientesAsync());
        }

        [HttpPost]
        [Route("CreateCliente")]
        public async Task<IActionResult> CreateCliente([FromBody] Cliente cliente)
        {
            int verificar = await clientesRepository.CreateClienteAsync(cliente);

            if (verificar != -1)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Cliente não criado");
            }
        }

        [HttpGet]
        [Route("GetClienteByTelemovel")]
        public async Task<ActionResult<Cliente>> GetClienteByTelemovel(int telemovel)
        {
            Cliente cliente = await clientesRepository.GetClienteByTelemovelAsync(telemovel);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpPut]
        [Route("UpdateCliente")]
        public async Task<IActionResult> UpdateCliente([FromBody] Cliente cliente)
        {
            bool verificar = await clientesRepository.UpdateClienteAsync(cliente);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Cliente não atualizado");
            }
        }

        [HttpDelete]
        [Route("DeleteCliente")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            bool verificar = await clientesRepository.DeleteClienteAsync(id);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Cliente não deletado");
            }
        }
    }
}
