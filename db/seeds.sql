USE employee_db;

-- Insert into departments
INSERT INTO departments (name)
VALUES ("IT"),
       ("HR"),
       ("PR"),
       ("Dentistry"),
       ("Comms");

-- Insert into roles
INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 4000000, 1),
       ("Manager", 50000, 2),
       ("Videographer", 25000, 3),
       ("Dentist", 6000000, 4),
       ("Intern", 0, 1);

-- Insert into employees
INSERT INTO employees (first_name, last_name, department_id, role_id, manager_id)
VALUES ("Mohammad", "Jafal-Collins", 1, 2, 3),
       ("Peter", "O'Flaile", 4, 4, 1),
       ("Gammon", "Sterilise", 1, 1, 1),
       ("Sarah P", "Whittaker", 3, 3, 7),
       ("I", "I", 5, 5, 6),
       ("Jan", "Dames", 5, 3, 7),
       ("Natasha", "Sunita", 2, 2, 3),
       ("Brock", "Heimmer", 2, 4, 2);