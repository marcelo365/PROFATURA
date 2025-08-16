using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFatura.Model
{
    public class FaturaDetalhada
    {
        public int NumeroFatura { get; set; }
        public DateTime DataFatura { get; set; }
        public string NomeCliente { get; set; }
        public string TelemovelCliente { get; set; }
        public string NomeFuncionario { get; set; }
        public string BIFuncionario { get; set; }
        public int Quantidade { get; set; }
        public decimal SubTotal { get; set; }
    }
}
