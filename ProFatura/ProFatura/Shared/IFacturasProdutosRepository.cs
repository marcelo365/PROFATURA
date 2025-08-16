using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IFacturasProdutosRepository
    {
        public Task<bool> CreateFacturaProdutoAsync(FacturaProduto facturaProduto);
        public Task<IEnumerable<FacturaProduto>> GetFacturaProdutoByProdutoAsync(int idProduto);

    }
}
