
export class Utilizador {
    constructor(
      public userID: number,
      public nomeCompleto: string,
      public email: string,
      public bilheteIdentidade: string,
      public userName: string,
      public senha: string,
      public tipo: number
    ) {}
}