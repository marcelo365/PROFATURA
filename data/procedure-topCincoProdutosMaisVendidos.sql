-- topCincoProdutosMaisVendidos
DELIMITER $$

CREATE PROCEDURE topCincoProdutosMaisVendidos()
BEGIN
    SELECT p.*
    FROM Produtos p
    JOIN (
        SELECT ProdutoID, SUM(Quantidade) AS total_vendido
        FROM FacturasProdutos
        GROUP BY ProdutoID
        ORDER BY total_vendido DESC
        LIMIT 5
    ) fp ON p.ProdutoID = fp.ProdutoID;
END$$

DELIMITER ;

