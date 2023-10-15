-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ove_project;
USE ove_project;

DROP TABLE IF EXISTS `reservations`;
DROP TABLE IF EXISTS `equipments`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `rooms`;

-- Create the "users" table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room INT NOT NULL,
    keyp VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT NULL
);

-- Create the "equipments" table
CREATE TABLE equipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    time TIME DEFAULT NULL,
    user_id INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the "sessions" table
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` char(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `start_time` bigint NOT NULL,
  `extended_time` bigint DEFAULT NULL,
  `expiry_time` bigint NOT NULL,
  PRIMARY KEY (`id`)
);


-- Create the "rooms" table
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomname VARCHAR(255) NOT NULL,
    roomtype VARCHAR(255) NOT NULL
);

-- Create the "reservations" table to link rooms and users
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert data into "equipments" table
INSERT INTO equipments (name, category) VALUES
    ('Washing Machine #1', 'washing'),
    ('Washing Machine #2', 'washing'),
    ('Washing Machine #3', 'washing'),
    ('Washing Machine #4', 'washing'),
    ('Washing Machine #5', 'washing'),
    ('Washing Machine #6', 'washing'),
    ('Washing Machine #7', 'washing'),
    ('Washing Machine #8', 'washing'),
    ('Washing Machine #9', 'washing'),
    ('Washing Machine #10', 'washing'),
    ('Washing Machine #11', 'washing'),
    ('Washing Machine #12', 'washing'),
    ('Washing Machine #13', 'washing'),
    ('Washing Machine #14', 'washing'),
    ('Washing Machine #15', 'washing'),
    ('Drying Machine #1', 'drying'),
    ('Drying Machine #2', 'drying'),
    ('Drying Machine #3', 'drying'),
    ('Drying Machine #4', 'drying'),
    ('Drying Machine #5', 'drying'),
    ('Drying Machine #6', 'drying'),
    ('Drying Machine #7', 'drying'),
    ('Drying Machine #8', 'drying'),
    ('Drying Machine #9', 'drying'),
    ('Drying Machine #10', 'drying'),
    ('Drying Machine #11', 'drying'),
    ('Drying Machine #12', 'drying'),
    ('Drying Machine #13', 'drying'),
    ('Drying Machine #14', 'drying'),
    ('Drying Machine #15', 'drying'),
    ('Vacuum Cleaner #1', 'vacuum'),
    ('Vacuum Cleaner #2', 'vacuum'),
    ('Vacuum Cleaner #3', 'vacuum'),
    ('Playstation 4', 'game'),
    ('XBOX Series X', 'game'),
    ('Nintendo Switch + Pro Controller', 'game');

-- Insert data into "users" table
INSERT INTO users (room, keyp, name, role) VALUES
    (202, '1234', 'John', NULL),
    (0, '0', '0', 'admin'),
    (206, '8627', 'John2', NULL),
    (195, '1268', 'John3', NULL);

-- Insert data into "rooms" table
INSERT INTO rooms (roomname, roomtype) VALUES
    ('Gaming Room #1', 'gaming'),
    ('Gaming Room #2', 'gaming'),
    ('Gaming Room #3', 'gaming'),
    ('Gaming Room #4', 'gaming'),
    ('Gaming Room #5', 'gaming'),
    ('Gaming Room #6', 'gaming'),
    ('Gaming Room #7', 'gaming'),
    ('Gaming Room #8', 'gaming'),
    ('Theater Room #1', 'multimedia'),
    ('Theater Room #2', 'multimedia'),
    ('Gym Access #1', 'gym'),
    ('Gym Access #2', 'gym'),
    ('Gym Access #3', 'gym'),
    ('Gym Access #4', 'gym'),
    ('Gym Access #5', 'gym'),
    ('Gym Access #6', 'gym'),
    ('Billard Table #1', 'billard'),
    ('Billard Table #2', 'billard'),
    ('Billard Table #3', 'billard'),
    ('Billard Table #4', 'billard'),
    ('Billard Table #5', 'billard'),
    ('Billard Table #6', 'billard'),
    ('Billard Table #7', 'billard');

-- Insert data into "reservations" table
INSERT INTO reservations (room_id, date, time, user_id) VALUES
    (1, '2023-10-04', '23:00', 1),
    (1, '2023-10-05', '00:00', 1),
    (2, '2021-06-01', '18:00', 2),
    (2, '2021-06-01', '18:00', 2),
    (2, '2021-06-01', '18:00', 2),
    (2, '2021-06-01', '18:00', 2),
    (2, '2021-06-01', '18:00', 2),
    (9, '2021-06-01', '18:00', 2),
    (10, '2021-09-01', '16:00', 2);
