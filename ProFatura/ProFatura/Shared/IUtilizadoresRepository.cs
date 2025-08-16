using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IUtilizadoresRepository
    {
        public Task<bool> CreateUtilizadorAsync(Utilizador utilizador);
        public Task<Utilizador> GetUtilizadorAsync(int id);
        public Task<Utilizador> GetUtilizadorByUsernameAsync(string userName);
        public Task<IEnumerable<Utilizador>> GetAllUtilizadoresAsync();
        public Task<bool> UpdateUtilizadorAsync( Utilizador utilizador);
        public Task<bool> DeleteUtilizadorAsync(int id);
        public Task<Utilizador> GetFuncionarioComMaisReceitaAsync();


    }


}
