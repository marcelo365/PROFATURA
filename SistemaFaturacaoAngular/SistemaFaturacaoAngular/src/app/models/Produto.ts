
export class Produto {
    constructor(
      public produtoID: number,
      public nome: string,
      public preco: number,
      public quantidadeEmEstoque: number,
      public categoria: string,
      public dataDeCadastro: string,
      public activo: boolean
    ) {}
}