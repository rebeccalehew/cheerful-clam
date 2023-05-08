USE bookstore_db

INSERT INTO department (name)
VALUES
    ("Customer Service"),
    ("Marketing"),
    ("Warhouse");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Customer Service Associate", 35000, 1),
    ("Assistant Manager", 45000, 1),
    ("Store Manager", 60000, 1),
    ("Social Media Coordinator", 30000, 2),
    ("Community Event Planner", 30000, 2),
    ("Visual Merchandiser", 20000, 2),
    ("Shipping Clerk", 35000, 3),
    ("Inverntory Clerk", 20000, 3),
    ("Buyer", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Carol", "Danvers", 9, 3),
    ("Scott", "Lang", 1, NULL),
    ("Pepper", "Potts", 3, 1),
    ("Janet", "Van Dyne", 5, NULL),
    ("Shuri", "T'Challa", 4, NULL),
    ("Peter", "Quill", 7, NULL),
    ("Wanda", "Maximoff", 6, NULL),
    ("Jean", "Grey", 2, 1),
    ("Kamala", "Khan", 8, NULL);