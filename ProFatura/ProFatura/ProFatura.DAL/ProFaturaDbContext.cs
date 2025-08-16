using Microsoft.EntityFrameworkCore;
using ProFatura.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFatura.DAL
{
    public class ProFaturaDbContext : DbContext
    {
        public ProFaturaDbContext(DbContextOptions<ProFaturaDbContext> options) : base(options)
        {
            ChangeTracker.LazyLoadingEnabled = false;
            ChangeTracker.AutoDetectChangesEnabled = true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Utilizador>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            modelBuilder.Entity<Utilizador>()
                .HasIndex(u => u.BilheteIdentidade)
                .IsUnique();

            modelBuilder.Entity<Produto>()
               .HasIndex(p => p.Nome)
               .IsUnique();

            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Telemovel)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Utilizador> Utilizadores { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Factura> Facturas { get; set; }
        public DbSet<FacturaProduto> FacturasProdutos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }

    }

}
