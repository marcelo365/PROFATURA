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
    [Table("Utilizadores")]
    public class Utilizador
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }


        [Required]
        [StringLength(100)]
        public string? NomeCompleto { get; set; }

        [Required]
        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        [StringLength(16)]
        public string? BilheteIdentidade { get; set; }

        [Required]
        [StringLength(50)]
        public string? UserName { get; set; }

        [Required]
        [StringLength(50)]
        public string? Senha { get; set; }

        [Required]
        public int Tipo { get; set; } // pode ser um usuário normal (0) ou admnistrador (1)



    }
}
