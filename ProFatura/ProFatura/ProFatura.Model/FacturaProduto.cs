using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProFatura.Model
{
    [Table("FacturasProdutos")]
    public class FacturaProduto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FacturaProdutoID { get; set; }

        [Required]
        public int FacturaID { get; set; } //chave estrangeira do utilizador

        [JsonIgnore]
        [ForeignKey("FacturaID")]
        public Factura? Factura { get; set; } //propriedade de navegação

        [Required]
        public int ProdutoID { get; set; } //chave estrangeira do utilizador

        [JsonIgnore]
        [ForeignKey("ProdutoID")]
        public Produto? Produto { get; set; } //propriedade de navegação

        [Required]
        public int Quantidade { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal SubTotal { get; set; }





    }
}
