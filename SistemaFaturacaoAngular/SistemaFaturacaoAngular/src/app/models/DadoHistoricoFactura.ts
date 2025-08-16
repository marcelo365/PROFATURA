
export class DadoHistoricoFactura {
    constructor(
        public numeroFatura : number,
        public dataFatura : string,
        public nomeCliente : string,
        public telemovelCliente : number,
        public nomeFuncionario : string ,
        public BIFuncionario : string,
        public quantidade : number,
        public total : number
    ) {}
}