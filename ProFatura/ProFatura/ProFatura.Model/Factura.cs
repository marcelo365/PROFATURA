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
    [Table("Facturas")]
    public class Factura
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FacturaID { get; set; }

        [Required]
        public int UserID { get; set; } //chave estrangeira do utilizador

        [JsonIgnore]
        [ForeignKey("UserID")]
        public Utilizador? Utilizador { get; set; } //propriedade de navegação

        [Required]
        public int ClienteID { get; set; }

        [JsonIgnore]
        [ForeignKey("ClienteID")]
        public Cliente? Cliente { get; set; } //propriedade de navegação

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Total { get; set; }

        [Required]
        public DateTime DataFactura { get; set; }

    }
}
