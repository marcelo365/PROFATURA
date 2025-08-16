using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    public interface IFacturasRepository
    {
        public Task<int> CreateFacturaAsync(Factura factura);
        public Task<Factura> GetFacturaAsync(int id);
        public Task<IEnumerable<Factura>> GetAllFacturasAsync();
        public Task<IEnumerable<Factura>> GetFacturasByClienteAsync(int id);
        public Task<IEnumerable<Factura>> GetFacturasByDataFacturaAsync(DateTime data1, DateTime data2);

    }
}
