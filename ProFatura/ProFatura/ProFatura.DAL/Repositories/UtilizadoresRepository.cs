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
    public class UtilizadoresRepository : IUtilizadoresRepository
    {

        private readonly ProFaturaDbContext context;

        public UtilizadoresRepository(ProFaturaDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> CreateUtilizadorAsync(Utilizador utilizador)
        {
            try
            {
                if ((utilizador.Tipo > 1) || (utilizador.Tipo < 0))
                {
                    return false;
                }

                context.Utilizadores.Add(utilizador);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                return false;
            }

            return true;
        }

        public async Task<Utilizador> GetUtilizadorAsync(int id)
        {
            return await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM Utilizadores WHERE UserId = {id}").FirstOrDefaultAsync();
        }

        public async Task<Utilizador> GetUtilizadorByUsernameAsync(string userName)
        {
            return await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM Utilizadores WHERE UserName = {userName}").FirstOrDefaultAsync();
        }

        public async Task<Utilizador> GetFuncionarioComMaisReceitaAsync()
        {
            return await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM funcionarioComMaisReceita").FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Utilizador>> GetAllUtilizadoresAsync()
        {
            return await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM Utilizadores").ToListAsync();
        }

        public async Task<bool> UpdateUtilizadorAsync([FromBody] Utilizador utilizador)
        {
            Utilizador ut = await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM Utilizadores WHERE UserID = {utilizador.UserID}").FirstOrDefaultAsync();
            if (ut != null)
            {

                try
                {
                    ut.Tipo = utilizador.Tipo;
                    ut.Email = utilizador.Email;
                    ut.Senha = utilizador.Senha;
                    ut.UserName = utilizador.UserName;
                    ut.BilheteIdentidade = utilizador.BilheteIdentidade;
                    ut.NomeCompleto = utilizador.NomeCompleto;
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

        public async Task<bool> DeleteUtilizadorAsync(int id)
        {
            Utilizador utilizador = await context.Utilizadores.FromSqlInterpolated($"SELECT * FROM Utilizadores WHERE UserID = {id}").FirstOrDefaultAsync();

            if (utilizador != null)
            {

                try
                {
                    context.Utilizadores.Remove(utilizador);
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
