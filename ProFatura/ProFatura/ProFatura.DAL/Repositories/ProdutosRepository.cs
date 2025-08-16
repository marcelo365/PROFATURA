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
    public class ProdutosRepository : IProdutosRepository
    {

        private readonly ProFaturaDbContext context;

        public ProdutosRepository(ProFaturaDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> CreateProdutoAsync([FromBody] Produto produto)
        {
            try
            {
                context.Produtos.Add(produto);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                return false;
            }

            return true;
        }

        public async Task<IEnumerable<Produto>> GetAllProdutosAsync()
        {
            return await context.Produtos.ToListAsync();
        }

        public async Task<IEnumerable<Produto>> GetTopCincoProdutosMaisVendidosAsync()
        {
            return await context.Produtos.FromSqlInterpolated($"CALL topCincoProdutosMaisVendidos()").ToListAsync();
        }

        public async Task<Produto> GetProdutoByNomeAsync(string nome)
        {
            return await context.Produtos.FromSqlInterpolated($"SELECT * FROM Produtos WHERE Nome = {nome}").FirstOrDefaultAsync();
        }

        public async Task<Produto> GetProdutoByIDAsync(int id)
        {
            return await context.Produtos.FromSqlInterpolated($"SELECT * FROM Produtos WHERE ProdutoID = {id}").FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Produto>> GetProdutosByCategoriaAsync(string categoria)
        {
            return await context.Produtos.FromSqlInterpolated($"SELECT * FROM Produtos WHERE Categoria = {categoria}").ToListAsync();
        }

        public async Task<bool> DeleteProdutoAsync(int id)
        {
            Produto produto = await context.Produtos.FromSqlInterpolated($"SELECT * FROM Produtos WHERE ProdutoID = {id}").FirstOrDefaultAsync();

            if (produto != null)
            {

                try
                {
                    context.Produtos.Remove(produto);
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

        public async Task<bool> UpdateProdutoAsync([FromBody] Produto produto)
        {
            Produto prod = await context.Produtos.FromSqlInterpolated($"SELECT * FROM Produtos WHERE ProdutoID = {produto.ProdutoID}").FirstOrDefaultAsync();
            if (prod != null)
            {

                try
                {
                    prod.Preco = produto.Preco;
                    prod.Nome = produto.Nome;
                    prod.DataDeCadastro = produto.DataDeCadastro;
                    prod.Activo = produto.Activo;
                    prod.QuantidadeEmEstoque = produto.QuantidadeEmEstoque;
                    prod.Categoria = produto.Categoria;
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
