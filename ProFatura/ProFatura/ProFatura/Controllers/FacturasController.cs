using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProFatura.DAL.Repositories;
using ProFatura.Model;
using Shared;

namespace ProFatura.Controllers
{
    public class FacturasController : Controller
    {
        private readonly IFacturasRepository facturasRepository;

        public FacturasController(IFacturasRepository fatRepo)
        {
            this.facturasRepository = fatRepo;
        }

        [HttpPost]
        [Route("CreateFactura")]
        public async Task<IActionResult> CreateFactura([FromBody] Factura factura)
        {
            int verificar = await facturasRepository.CreateFacturaAsync(factura);

            if (verificar != -1)
            {
                return Ok(verificar);
            }
            else
            {
                return BadRequest("Factura não criado");
            }
        }

        [HttpGet]
        [Route("GetFactura")]
        public async Task<ActionResult<Factura>> GetFactura(int id)
        {
            Factura factura = await facturasRepository.GetFacturaAsync(id);

            if (factura == null)
            {
                return NotFound();
            }

            return Ok(factura);
        }

        [HttpGet]
        [Route("GetAllFacturas")]
        public async Task<IActionResult> GetAllFacturas()
        {
            return Ok(await facturasRepository.GetAllFacturasAsync());
        }

        [HttpGet]
        [Route("GetFacturasByCliente")]
        public async Task<IActionResult> GetFacturasByCliente(int id)
        {
            return Ok(await facturasRepository.GetFacturasByClienteAsync(id));
        }

        [HttpGet]
        [Route("GetFacturasByDataFactura")]
        public async Task<IActionResult> GetFacturasByDataFactura(DateTime data1 , DateTime data2)
        {
            return Ok(await facturasRepository.GetFacturasByDataFacturaAsync(data1 , data2));
        }


    }
}
