using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using ProFatura.Model;
using Shared;

namespace ProFatura.Controllers
{
    public class ProdutosController : Controller
    {
        private readonly IProdutosRepository produtosRepository;

        public ProdutosController(IProdutosRepository proRepo)
        {
            this.produtosRepository = proRepo;
        }


        [HttpGet]
        [Route("GetProdutoByID")]
        public async Task<ActionResult<Produto>> GetProdutoByID(int id)
        {
            Produto produto = await produtosRepository.GetProdutoByIDAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpGet]
        [Route("GetProdutoByNome")]
        public async Task<ActionResult<Produto>> GetProdutoByNome(string nome)
        {
            Produto produto = await produtosRepository.GetProdutoByNomeAsync(nome);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpGet]
        [Route("GetProdutosByCategoria")]
        public async Task<IActionResult> GetProdutosByCategoria(string categoria)
        {
            return Ok( await produtosRepository.GetProdutosByCategoriaAsync(categoria));
        }

        [HttpGet]
        [Route("GetAllProdutos")]
        public async Task<IActionResult> GetAllProdutos()
        {
            return Ok(await produtosRepository.GetAllProdutosAsync());
        }

        [HttpGet]
        [Route("GettopCincoProdutosMaisVendidos")]
        public async Task<IActionResult> GettopCincoProdutosMaisVendidos()
        {
            return Ok(await produtosRepository.GetTopCincoProdutosMaisVendidosAsync());
        }

        [HttpPost]
        [Route("CreateProduto")]
        public async Task<IActionResult> CreateProduto([FromBody] Produto produto)
        {
            bool verificar = await produtosRepository.CreateProdutoAsync(produto);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Produto não criado");
            }
        }

        [HttpPut]
        [Route("UpdateProduto")]
        public async Task<IActionResult> UpdateProduto([FromBody] Produto produto)
        {
            bool verificar = await produtosRepository.UpdateProdutoAsync(produto);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Produto não atualizado");
            }
        }

        [HttpDelete]
        [Route("DeleteProduto")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            bool verificar = await produtosRepository.DeleteProdutoAsync(id);

            if (verificar)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Produto não deletado");
            }
        }











    }







}
