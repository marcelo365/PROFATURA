
export class Factura {
    constructor(
        public facturaID : number,
        public userID : number,
        public total : number,
        public dataFactura : string,
        public clienteID : number
    ) {}
}