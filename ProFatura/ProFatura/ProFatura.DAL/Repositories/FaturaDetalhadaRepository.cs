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
    public class FaturaDetalhadaRepository : IFaturaDetalhadaRepository
    {
        private readonly ProFaturaDbContext context;
        

        public FaturaDetalhadaRepository(ProFaturaDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<FaturaDetalhada>> GetFacturasDetalhadasAsync(int id)
        {
            return await context.Set<FaturaDetalhada>().FromSqlInterpolated($"select facturas.FacturaID as \"numeroFatura\" , Facturas.DataFactura as \"dataFatura\" ,\r\nclientes.Nome as \"nomeCliente\" , Clientes.Telemovel as \"telemovelCliente\" , \r\nUtilizadores.NomeCompleto as \"nomeFuncionario\" , Utilizadores.BilheteIdentidade as \"BIFuncionario\",\r\nFacturasProdutos.Quantidade as \"quantidade\" , FacturasProdutos.SubTotal as \"subTotal\"\r\nfrom FacturasProdutos  inner join Facturas \r\non FacturasProdutos.ProdutoID = {id} and FacturasProdutos.FacturaID = Facturas.FacturaID \r\ninner join Utilizadores\r\non Facturas.UserID = Utilizadores.UserID\r\ninner join Clientes\r\non Facturas.ClienteID = Clientes.ClienteID;\r\n").ToListAsync();
        }
    }
}
