-- funcionarioComMaisReceita
CREATE VIEW funcionarioComMaisReceita AS
SELECT *
FROM Utilizadores
WHERE UserID = (
    SELECT UserID
    FROM Facturas
    GROUP BY UserID
    ORDER BY SUM(Total) DESC
    LIMIT 1
);

