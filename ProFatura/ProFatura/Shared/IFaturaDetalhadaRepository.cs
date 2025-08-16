using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IFaturaDetalhadaRepository
    {
        public Task<IEnumerable<FaturaDetalhada>> GetFacturasDetalhadasAsync(int id);
    }
}
