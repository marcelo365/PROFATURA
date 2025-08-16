
export class ProdutoFactura {
    constructor(
      public nome: string,
      public preco: number,
      public quantidade : number,
      public subtotal : number
    ) {}
}