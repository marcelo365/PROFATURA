using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IProdutosRepository
    {
        public Task<bool> CreateProdutoAsync(Produto produto);
        public Task<IEnumerable<Produto>> GetAllProdutosAsync();
        public Task<Produto> GetProdutoByNomeAsync(string nome);
        public Task<Produto> GetProdutoByIDAsync(int id);
        public Task<IEnumerable<Produto>> GetProdutosByCategoriaAsync(string categoria);
        public Task<bool> DeleteProdutoAsync(int id);
        public Task<bool> UpdateProdutoAsync(Produto produto);
        public Task<IEnumerable<Produto>> GetTopCincoProdutosMaisVendidosAsync();

    }
}
