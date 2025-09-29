--DDL
USE Schooldb;
IF OBJECT_ID('dbo.Employee','U') IS NOT NULL
    DROP TABLE Employee;
GO
 
 CREATE TABLE Employee(
    EmplyeeID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(20),
    Age INT,
    Department VARCHAR(10)
 );
 GO

 ALTER TABLE Employee
 ADD Salary INT;
 GO
 --DML

 INSERT INTO Employee(Name,Age,Department,Salary) VALUES
 ('kishor',20,'ECE',10000),
 ('anbu',19,'ECE',5000),
 ('arul',22,'ECE',2000);
 GO

 SELECT * FROM Employee;

 UPDATE Employee SET Salary='5000'
 WHERE Name='arul';

DELETE Employee WHERE Name = 'anbu';

SELECT * FROM Employee;

--DCL
USE master;



GRANT SELECT
ON Employee
TO MyUser;

EXECUTE AS USER='MyUser'

SELECT * FROM Employee;
-- it shows some message that says permission denied
UPDATE Employee SET Salary=12000
WHERE Name = 'kishor';

REVERT

--TCL

BEGIN TRAN

UPDATE Employee SET Salary = 12000
WHERE Name='arul';
SAVE TRAN  sp_Salary;
DELETE Employee WHERE Name='kishor';
ROLLBACK TRAN sp_salary;
COMMIT

SELECT * FROM Employee




