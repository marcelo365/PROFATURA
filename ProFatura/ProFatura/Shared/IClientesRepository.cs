using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IClientesRepository
    {
        public Task<int> CreateClienteAsync(Cliente cliente);
        public Task<Cliente> GetClienteAsync(int id);
        public Task<IEnumerable<Cliente>> GetAllClientesAsync();
        public Task<Cliente> GetClienteByTelemovelAsync(int telemovel);
        public Task<bool> UpdateClienteAsync(Cliente cliente);
        public Task<bool> DeleteClienteAsync(int id);
        public Task<Cliente> GetClienteComMaisReceitaAsync();

    }
}
