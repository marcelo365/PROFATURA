using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using ProFatura.Model;
using Shared;

namespace ProFatura.Controllers
{
    public class FacturasProdutosController : Controller
    {
        private readonly IFacturasProdutosRepository facturasProdutosRepository;

        public FacturasProdutosController (IFacturasProdutosRepository fatProdRepo)
        {
            this.facturasProdutosRepository = fatProdRepo;
        }

        [HttpPost]
        [Route("CreateFacturaProduto")]
        public async Task<IActionResult> CreateFacturaProduto ([FromBody] FacturaProduto facturaProduto)
        {
            bool verificar = await facturasProdutosRepository.CreateFacturaProdutoAsync(facturaProduto);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("FacturaProduto não criado");
            }
        }

        [HttpGet]
        [Route("GetFacturasProdutosByProduto")]
        public async Task<IActionResult> GetFacturasProdutosByProduto(int id)
        {
            return Ok(await facturasProdutosRepository.GetFacturaProdutoByProdutoAsync(id));
        }
    }
}
