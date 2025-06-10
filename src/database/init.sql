CREATE DATABASE IF NOT EXISTS pets_db CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;

USE pets_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'adopter') NOT NULL
);

CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    species VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    status ENUM('available', 'adopted') NOT NULL DEFAULT 'available',
    description TEXT
);

CREATE TABLE adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    adoption_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);
