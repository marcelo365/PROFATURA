
-- Clientes
INSERT INTO Clientes (ClienteID, Telemovel, Nome) VALUES
(12, 946921967, 'Darilton Matias'),
(13, 987671123, 'Sílvia Matos'),
(14, 946921969, 'Eunice Soleno'),
(16, 946921968, 'Ernesto Amândio'),
(22, 936571234, 'João António');

-- Utilizadores
INSERT INTO Utilizadores (UserID, NomeCompleto, Email, BilheteIdentidade, UserName, Senha, Tipo) VALUES
(4, 'João Silva', 'joao.silva@gmail.com', '12345678', 'j_silva', '123', 0),
(5, 'Maria Ferreira', 'maria.ferreira@gmail.com', '23456789', 'm_ferreira', '123', 1);

-- Facturas
INSERT INTO Facturas (FacturaID, UserID, ClienteID, Total, DataFactura) VALUES
(30, 4, 14, 276450.00, '2024-07-01 11:38:03'),
(31, 4, 14, 267330.00, '2024-07-01 11:39:55'),
(32, 4, 14, 20520.00,  '2024-07-01 11:41:35'),
(33, 4, 14, 5130.00,   '2024-07-02 03:59:05'),
(34, 4, 14, 15390.00,  '2024-07-02 04:00:10'),
(35, 4, 14, 270750.00, '2024-07-02 04:01:09'),
(36, 4, 14, 90630.00,  '2024-07-10 07:26:05'),
(37, 4, 14, 256500.00, '2024-07-10 07:30:14'),
(38, 4, 14, 2878500.00,'2024-07-10 14:28:06');

-- Produtos
INSERT INTO Produtos (ProdutoID, Nome, Preco, QuantidadeEmEstoque, Categoria, DataDeCadastro, Activo) VALUES
(9,  'Arroz Branco', 1500.00, 33, 'Alimentos e Bebidas', '2024-07-01 10:48:19', 1),
(10, 'Televisão LED 42', 75000.00, 7, 'Eletrônicos', '2024-07-01 10:53:01', 1),
(11, 'Camiseta Polo', 3500.00, 89, 'Roupas e Acessórios', '2024-07-01 10:55:56', 1),
(12, 'Creme Hidratante', 2000.00, 92, 'Saúde e Beleza', '2024-07-01 10:56:29', 1),
(13, 'Ração para Cães', 5000.00, 30, 'Animais de Estimação', '2024-07-01 10:57:16', 1),
(14, 'Colecção de Panelas', 25000.00, 14, 'Casa e Jardim', '2024-07-01 10:58:15', 1),
(17, 'Computador Dell', 500000.00, 0, 'Alimentos e Bebidas', '2024-07-10 14:19:18', 0);

-- FacturasProdutos
INSERT INTO FacturasProdutos (FacturaProdutoID, FacturaID, ProdutoID, Quantidade, SubTotal) VALUES
(29, 30, 10, 3, 225000.00),
(30, 30, 11, 5, 17500.00),
(31, 31, 9,  4, 6000.00),
(32, 31, 10, 3, 225000.00),
(33, 31, 11, 1, 3500.00),
(34, 32, 11, 3, 10500.00),
(35, 32, 12, 3, 6000.00),
(36, 32, 9,  1, 1500.00),
(37, 33, 9,  3, 4500.00),
(38, 34, 11, 1, 3500.00),
(39, 34, 12, 5, 10000.00),
(40, 35, 9,  6, 9000.00),
(41, 35, 10, 3, 225000.00),
(42, 35, 11, 1, 3500.00),
(43, 36, 10, 1, 75000.00),
(44, 36, 9,  3, 4500.00),
(45, 37, 10, 3, 225000.00),
(46, 38, 17, 5, 2500000.00),
(47, 38, 14, 1, 25000.00);
