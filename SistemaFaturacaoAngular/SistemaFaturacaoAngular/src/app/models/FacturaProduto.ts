
export class FacturaProduto {
    constructor(
        public facturaProdutoID : number,
        public facturaID : number,
        public produtoID : number,
        public quantidade : number,
        public subTotal : number
    ) {}
}