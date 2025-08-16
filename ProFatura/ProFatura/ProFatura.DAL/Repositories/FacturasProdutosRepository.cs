using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProFatura.Model;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFatura.DAL.Repositories
{
    public class FacturasProdutosRepository : IFacturasProdutosRepository
    {
        private readonly ProFaturaDbContext context;
        private readonly IProdutosRepository produtosRepository;
        private readonly IFacturasRepository facturasRepository;

        public FacturasProdutosRepository(ProFaturaDbContext context, IProdutosRepository produtosRepository , IFacturasRepository facturasRepository)
        {
            this.context = context;
            this.facturasRepository = facturasRepository;
            this.produtosRepository = produtosRepository;
        }

        public async Task<bool> CreateFacturaProdutoAsync([FromBody] FacturaProduto facturaProduto)
        {
            try
            {

                Produto produto = await produtosRepository.GetProdutoByIDAsync(facturaProduto.ProdutoID);

                if (produto == null)
                {
                    return false;
                }

                facturaProduto.Produto = produto;

                Factura factura = await facturasRepository.GetFacturaAsync(facturaProduto.FacturaID);

                if (factura == null)
                {
                    return false;
                }

                facturaProduto.Factura = factura;



                context.FacturasProdutos.Add(facturaProduto);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                return false;
            }

            return true;
        }




        public async Task< IEnumerable<FacturaProduto>> GetFacturaProdutoByProdutoAsync(int idProduto)
        {
            return await context.FacturasProdutos.FromSqlInterpolated($"SELECT * FROM FacturasProdutos WHERE ProdutoID = {idProduto}").ToListAsync();
        }
    }
}
