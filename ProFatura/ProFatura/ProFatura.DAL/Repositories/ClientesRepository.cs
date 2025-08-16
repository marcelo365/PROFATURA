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
    public class ClientesRepository : IClientesRepository
    {
        private readonly ProFaturaDbContext context;

        public ClientesRepository(ProFaturaDbContext context)
        {
            this.context = context;
        }

        public async Task<Cliente> GetClienteAsync(int id)
        {
            return await context.Clientes.FromSqlInterpolated($"SELECT * FROM Clientes WHERE ClienteID = {id}").FirstOrDefaultAsync();
        }

        public async Task<Cliente> GetClienteComMaisReceitaAsync()
        {
            return await context.Clientes.FromSqlInterpolated($"SELECT * FROM clienteComMaisReceita").FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Cliente>> GetAllClientesAsync()
        {
            return await context.Clientes.ToListAsync();
        }

        public async Task<int> CreateClienteAsync([FromBody] Cliente cliente)
        {
            try
            {
                context.Clientes.Add(cliente);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                return -1;
            }

            return cliente.ClienteID;
        }

        public async Task<Cliente> GetClienteByTelemovelAsync(int telemovel)
        {
            return await context.Clientes.FromSqlInterpolated($"SELECT * FROM Clientes WHERE Telemovel = {telemovel}").FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateClienteAsync([FromBody] Cliente cliente)
        {
            Cliente cli = await context.Clientes.FromSqlInterpolated($"SELECT * FROM Clientes WHERE ClienteID = {cliente.ClienteID}").FirstOrDefaultAsync();
            if (cli != null)
            {

                try
                {
                    cli.Telemovel = cliente.Telemovel;
                    cli.Nome = cliente.Nome;
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    return false;
                }


                return true;



            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteClienteAsync(int id)
        {
            Cliente cliente = await context.Clientes.FromSqlInterpolated($"SELECT * FROM Clientes WHERE ClienteID = {id}").FirstOrDefaultAsync();

            if (cliente != null)
            {

                try
                {
                    context.Clientes.Remove(cliente);
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    return false;
                }

                return true;

            }
            else
            {
                return false;
            }
        }



    }
}
