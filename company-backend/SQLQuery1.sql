INSERT INTO Users (username, password, role) VALUES
('newuser1', NULL, 'EMPLOYEE');
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Users;
drop table if EXISTS TeamRevenue;

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NULL,    -- ✅ NULL allowed for first-time setup
    role VARCHAR(20) NOT NULL,
	Team varchar(100),
);

INSERT INTO Users (username, password, role) VALUES
('newuser2', NULL, 'EMPLOYEE'); 
('admin1', 'admin123', 'ADMIN'),
('manager1', 'manager123', 'MANAGER'),
('employee1', 'employee123', 'EMPLOYEE'),
('newuser1', NULL, 'EMPLOYEE');

select * from Users

SELECT * FROM Employees;
INSERT INTO Employees (name, email, department, salary) VALUES
('John Doe', 'john.doe@example.com', 'Sales', 55000.00),
('Priya Sharma', 'priya.sharma@example.com', 'Engineering', 72000.00),
('Amit Patel', 'amit.patel@example.com', 'Finance', 60000.00),
('Maria Gonzales', 'maria.gonzales@example.com', 'HR', 48000.00),
('David Lee', 'david.lee@example.com', 'IT Support', 50000.00),
('Sneha Reddy', 'sneha.reddy@example.com', 'Marketing', 58000.00),
('Ravi Kumar', 'ravi.kumar@example.com', 'Operations', 61000.00),
('Sara Johnson', 'sara.johnson@example.com', 'Engineering', 75000.00),
('Arjun Mehta', 'arjun.mehta@example.com', 'Finance', 65000.00),
('Emily Brown', 'emily.brown@example.com', 'Sales', 53000.00);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,      -- manually provide emp_id
    name VARCHAR(100) NOT NULL,
    team VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_joining DATE NOT NULL,
    designation VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    salary DECIMAL(15,2)           -- employee salary
);
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) UNIQUE NOT NULL,
    budget DECIMAL(15,2) NULL DEFAULT 0,
    total_employees INT NULL DEFAULT 0,
    team VARCHAR(100) NULL,
    status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE TeamRevenue (
    revenue_id INT IDENTITY(1,1) PRIMARY KEY,  -- auto-generated ID
    team VARCHAR(50) NOT NULL,
    month CHAR(7) NOT NULL,                     -- YYYY-MM
    no_of_sales INT DEFAULT 0,
    budget DECIMAL(15,2) DEFAULT 0,
    average_revenue DECIMAL(18,2) DEFAULT 0,
    CONSTRAINT UQ_TeamMonth UNIQUE(team, month) -- unique per team per month
);




INSERT INTO TeamRevenue (revenue_id, team, month0freavnu, no_of_sales, budget, average_revenue)
VALUES (1, 'SDMS', '2025-11', 10, 50000, 5000);



INSERT INTO Users (username, password, role, Team)
VALUES 
('admin', 'admin123', 'ADMIN'),

CREATE TABLE Users (
    id varchar(50) NULL,
    username VARCHAR(50) UNIQUE NOT NULL,  -- required for login
    password VARCHAR(100) NOT NULL,        -- required for login
    role VARCHAR(20) NULL,             -- user role
    full_name VARCHAR(100) NULL,           -- employee full name
    team VARCHAR(100) NULL,                -- team/department
    designation VARCHAR(50) NULL,          -- job title
    date_of_joining DATE NULL,             -- joining date
    salary DECIMAL(15,2) NULL,             -- salary
    status VARCHAR(20) DEFAULT 'Active'    -- Active/Inactive
);
INSERT INTO Users (id,username, password, role, full_name, team, designation, date_of_joining, salary, status)
VALUES ('001','admin', 'admin123', 'Admin', 'Administrator', 'Management', 'Admin', '2025-11-11', 100000.00, 'Active');

select * from Users;
INSERT INTO Products (product_id, product_name, budget, total_employees, team, status)
VALUES (1, 'SmartPay Portal', 250000, 8, 'SDMS', 'Active');

INSERT INTO TeamRevenue (team, month, no_of_sales, budget, average_revenue) VALUES
('SDMS', '2025-01', 5, 50000.00, 60000.00),
('LIMS', '2025-02', 7, 72000.00, 10285.71),
('SDMS', '2025-03', 4, 44000.00, 41000.00),
('SDMS', '2025-04', 8, 96000.00, 100000.00),
('SDMS', '2025-05', 6, 78000.00, 53000.00),
('SDMS', '2025-06', 10, 150000.00, 85000.00);

select * from TeamRevenue;
SELECT * FROM TeamRevenue ORDER BY month ASC;
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users';
ALTER TABLE Products ADD created_date DATE DEFAULT GETDATE();
select * FROM Products;
SELECT COUNT(*) AS no_of_sales, COALESCE(SUM(budget),0) AS budget
FROM Products
WHERE team = 'SDMS' AND FORMAT(created_date, 'yyyy-MM') = '2025-11';
                SELECT COUNT(*) AS no_of_sales, COALESCE(SUM(budget), 0) AS budget
                FROM Products
                WHERE team = ? AND CONVERT(CHAR(7), created_date, 120) = '2025-11';
SELECT COUNT(*) FROM TeamRevenue WHERE team = 'SDMS' AND month ='2025-11'












