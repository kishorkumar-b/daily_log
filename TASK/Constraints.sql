USE Schooldb;
IF OBJECT_ID('dbo.Employee1','U') IS NOT NULL
    DROP TABLE Employee1;
GO
 
 CREATE TABLE Employee1(
    EmplyeeID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(20) NOT NULL,
    Age INT,
    Department VARCHAR(10)
 );
 GO
 ALTER TABLE Employee1
 ALTER COLUMN Age int NOT NULL;

 ALTER TABLE Employee1
 ADD ID int UNIQUE;



 INSERT INTO Employee1(Name,Age, Department,ID) VALUES
 ('gopi',18,'cse',3);
 INSERT INTO Employee1(Name,Age, Department,ID) VALUES
 ('ABI',19,'IT',4);

SELECT * FROM Employee1;



ALTER TABLE Employee
ADD Bonus INT
CONSTRAINT CK_Employee_Bonus CHECK (Bonus > 10)

SELECT * FROM Employee;

INSERT INTO Employee(Name,Age,Department,Salary) VALUES
('KARTHICK',18,'CSE',100000)

ALTER TABLE Employee
DROP CONSTRAINT CK_Employee_Bonus;
ALTER TABLE Employee
ADD CONSTRAINT CK_Employee_Bonus DEFAULT 11 FOR Bonus;

SET SHOWPLAN_TEXT ON;
GO
SELECT *
FROM Employee1 WHERE Age = 18;
GO
SET SHOWPLAN_TEXT OFF;


CREATE INDEX idx_lastname
ON Employee1 (Age);



SELECT GETUTCDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'India Standard Time' AS LocalTime;
SELECT GETDATE() AT TIME ZONE 'India Standard Time' AT TIME ZONE 'UTC' AS UTC;

--index

CREATE TABLE Employee2(
    EmplyeeID INT PRIMARY KEY,
    Name VARCHAR(20) NOT NULL,
 );
 INSERT INTO Employee2(EmplyeeID,Name) VALUES
 (21,'cse');

 INSERT INTO Employee2(EmplyeeID,Name) VALUES
 (19,'IT');

 create index edx_name on Employee2(EmplyeeID);

 SELECT * FROM Employee2;
 EXEC sp_helpindex 'Employee2';

 -- alter table Employee2 Rename column EmplyeeID to empId;
 alter table Employee2 add email varchar(30);

 EXEC sp_rename 'Employee2', 'emp2' ;
 select * from emp2;

  create clustered index edx_email on Employee2(email);

  CREATE TABLE Employee3(
    EmplyeeID INT,
    Name VARCHAR(20) NOT NULL,
 );
 alter table Employee3 
 add age int;
  alter table Employee3 
 add num int;

INSERT INTO Employee3 VALUES
 (6);

 INSERT INTO Employee3(EmplyeeID,Name) VALUES
 (1,'surya');

 create clustered index idx_name on Employee3(EmplyeeID);
 create nonclustered index idx_age_num on Employee3(num,age);

 EXEC sp_helpindex 'Employee3';


 --join

create table Department(
	ID int,
	depart varchar(10),
	);

insert into Department (ID,depart) values
(1,'ECE'),
(2,'CSE'),
(3,'IT'),
(4,'BIO');

create table student3(
	EID int,
	Name varchar(20),
	depart varchar(20)
	);
insert into student3 (EID, Name,depart) values
(1,'kishor','ECE'),
(5,'gopi','CSE'),
(5,'arul','IT'),
(4,'arun','BIO');
--innerjoin
select Name from student3 inner join Department on student3.EID=Department.ID 
--left join
select Name from student3 left join Department on student3.EID=Department.ID 
SELECT 
    s.EID,
    s.Name,
    s.depart AS StudentDept,
    d.depart AS DeptFromMaster
FROM student3 AS s
LEFT JOIN Department AS d
    ON s.EID = d.ID;
--right join
SELECT 
    s.EID,
    s.Name,
    s.depart AS StudentDept,
    d.depart AS DeptFromMaster
FROM student3 AS s
RIGHT JOIN Department AS d
    ON s.EID = d.ID;

SELECT 
    s.EID,
    s.Name,
    s.depart AS StudentDept,
    d.depart AS DeptFromMaster
FROM student3 AS s
FULL OUTER JOIN Department AS d
    ON s.EID = d.ID;

select a.Name,a.depart,b.depart from student3 a,student3 b where a.EID = b.EID 

--agregate function
select avg(EID) from student3;

select * from student3
where name like 'k__h__%';

select depart from student3
union all
select depart from Department ;


--19/09/25












