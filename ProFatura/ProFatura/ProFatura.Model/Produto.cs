using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProFatura.Model
{
    [Table("Produtos")]
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProdutoID { get; set; }// Identificador único do produto

        [Required]
        [StringLength(50)]
        public string? Nome { get; set; } // Nome do produto 

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Preco { get; set; } // Preço do produto

        [Required]
        public int QuantidadeEmEstoque { get; set; } // Quantidade disponível em estoque

        [Required]
        [StringLength(50)]
        public string? Categoria { get; set; } // Categoria do produto


        [Required]
        public DateTime DataDeCadastro { get; set; }  // Data de cadastro do produto

        [Required]
        public bool Activo { get; set; } // Indica se o produto está ativo ou descontinuado


    }
}
