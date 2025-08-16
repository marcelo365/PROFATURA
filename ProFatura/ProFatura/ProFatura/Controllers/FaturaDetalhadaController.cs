using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using Shared;

namespace ProFatura.Controllers
{
    public class FaturaDetalhadaController : Controller
    {
        private readonly IFaturaDetalhadaRepository faturaDetalhadaRepository;

        public FaturaDetalhadaController(IFaturaDetalhadaRepository fatRepo)
        {
            this.faturaDetalhadaRepository = fatRepo;
        }

        [HttpGet]
        [Route("GetAllFaturasDetalhadas")]
        public async Task<IActionResult> GetAllFaturasDetalhadas(int id)
        {
            return Ok(await faturaDetalhadaRepository.GetFacturasDetalhadasAsync(id) );
        }
    }
}
