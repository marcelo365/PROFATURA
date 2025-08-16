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
    public class FacturasRepository : IFacturasRepository
    {

        private readonly ProFaturaDbContext context;
        private readonly IUtilizadoresRepository utilizadoresRepository;
        private readonly IClientesRepository clientesRepository;

        public FacturasRepository(ProFaturaDbContext context ,  IUtilizadoresRepository utRepo , IClientesRepository clientesRepository)
        {
            this.context = context;
            this.utilizadoresRepository = utRepo;
            this.clientesRepository = clientesRepository;
        }

        public async Task<int> CreateFacturaAsync([FromBody] Factura factura)
        {
            try
            {

                Utilizador utilizador = await utilizadoresRepository.GetUtilizadorAsync(factura.UserID);

                if (utilizador == null)
                {
                    return -1;
                }

                factura.Utilizador = utilizador;

                Cliente cliente = await clientesRepository.GetClienteAsync(factura.ClienteID);

                if (cliente == null)
                {
                    return -1;
                }

                factura.Cliente = cliente;

                context.Facturas.Add(factura);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                return -1;
            }

            return factura.FacturaID;
        }

        public async Task<Factura> GetFacturaAsync(int id)
        {
            return await context.Facturas.FromSqlInterpolated($"SELECT * FROM Facturas WHERE FacturaID = {id}").FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Factura>> GetAllFacturasAsync()
        {
            return await context.Facturas.ToListAsync();
        }

        public async Task<IEnumerable<Factura>> GetFacturasByClienteAsync(int id)
        {
            return await context.Facturas.FromSqlInterpolated($"SELECT * FROM Facturas WHERE ClienteID = {id}").ToListAsync();
        }

        public async Task<IEnumerable<Factura>> GetFacturasByDataFacturaAsync(DateTime data1 , DateTime data2)
        {
            return await context.Facturas.FromSqlInterpolated($"SELECT * FROM Facturas WHERE DataFactura BETWEEN {data1} AND {data2} ").ToListAsync();
        }
    }
}
