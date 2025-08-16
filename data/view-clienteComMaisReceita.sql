-- clienteComMaisReceita
CREATE VIEW clienteComMaisReceita AS
SELECT *
FROM Clientes
WHERE ClienteID = (
    SELECT ClienteID
    FROM Facturas
    GROUP BY ClienteID
    ORDER BY SUM(Total) DESC
    LIMIT 1
);
