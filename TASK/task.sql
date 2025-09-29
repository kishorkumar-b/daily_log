use Schooldb;
go



--table creation
Create table Developer (
	SNO int primary key identity(1,1),
	EPID int,
	Name varchar(20),
	Date_of_joining varchar(20),
	Salary int);


Create table test (
	SNO int primary key identity(1,1),
	EPID int,
	Name varchar(20),
	Date_of_joining varchar(20),
	Salary int);

alter table Developer
add Roll varchar(10);

alter table test
add Roll varchar(10);
select * from Developer;
select * from test;

select getdate
()  

-- data insertion
insert into Developer values
(1,'kishor',getdate(),54000,'React'),
(3,'arul',dateadd(HOUR,-5,getdate()),50000,'SQL'),
(4,'ravi',dateadd(DAY,-10,getdate()),34000,'postgras'),
(5,'priya',dateadd(MONTH,-2,GETDATE()),70000,'React'),
(6,'varun',dateadd(DAY,-3,getdate()),58000,'manager'),
(7,'arun',getdate(),20000,'TL');

insert into test(EPID,Name,Date_of_joining,Salary,Roll) values
(1,'kishor',getdate(),40000,'backend'),
(2,'pram',dateadd(HOUR,-5,getdate()),35000,'tester'),
(3,'guna',dateadd(day,-5,getdate()),50000,'TL');

--grouping the employee joined in same date
select * from Developer where CAST(Date_of_joining as DATE) ='Sep 19 2025'
union all
select * from test where CAST(Date_of_joining as DATE) ='Sep 19 2025';

-- find max salary
select
    coalesce(d.Name, t.Name)      AS EmployeeName,
    coalesce(d.Roll, t.Roll)      AS RoleName,
    coalesce(d.Salary, t.Salary)  AS Salary
from Developer d
full OUTER JOIN test t
    ON d.EPID = t.EPID
where coalesce(d.Salary, t.Salary) =
      (
        select max(coalesce(d2.Salary, t2.Salary))
        from Developer d2
        full OUTER JOIN test t2
            on d2.EPID = t2.EPID
      );

-- find min salary
select
	coalesce(d.EPID, t.EPID)      AS EmployeeID,
    coalesce(d.Name, t.Name)      AS EmployeeName,
    coalesce(d.Roll, t.Roll)      AS RoleName,
    coalesce(d.Salary, t.Salary)  AS Salary
from Developer d
full OUTER JOIN test t
    ON d.EPID = t.EPID
where coalesce(d.Salary, t.Salary) =
      (
        select min(coalesce(d2.Salary, t2.Salary))
        from Developer d2
        full OUTER JOIN test t2
            on d2.EPID = t2.EPID
      );

-- removing duplicate values -cte
with cts as (
	select *,
	row_number() over (
	partition by EPID order by SNO
	) as rn
	from Developer)
select * from cts where rn=1 order by EPID;
---------------------

-- get time in utc
select SNO,EPID,Name,
cast(Date_of_joining as datetime2) at time zone 'UTC' at time zone 'India Standard Time' as utctime
,Salary,Roll from Developer;

-- order a-z
select * from DEVELOPER
union
select * from test order by Name desc ;

--order developer[a-z] than test[a-z]

select *, 'dev' as sortorder
from Developer union all
select *, 'test' as sortorder
from test order by sortorder,name

-- select top next 3 salary
select * from (
select * from Developer
union all
select * from test
) as combained
order by Salary desc
offset 3 rows
fetch next 3 rows only;


create function dbo.getname1(@EPID int)
returns table
as
return(
select SNO, EPID, Name, Date_of_joining, Salary from Developer where EPID=@EPID);

select * from dbo.getname1(1);

create view getdata as 
select * from Developer where Salary >40000

select * from getdata

create function dbo.getsalary1(@salary int)
returns varchar(50)
as
begin
return (
select Name from Developer where Salary = @salary)
end

select dbo.getsalary(58000) as Department
