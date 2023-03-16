use mysql;

SET PASSWORD FOR 'root'@'localhost' = PASSWORD('94dy8vURzDEF78DHZ8DZ8712DKz3Nh7');

CREATE DATABASE IF NOT EXISTS tickets;

CREATE TABLE tickets
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    author INT NOT NULL,
    category INT NOT NULL,
    title VARCHAR(60) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    screenshot BLOB,
    subcategory INT,
    createdDate DATETIME,
    closingDate DATETIME
    FOREIGN KEY (category) REFERENCES categories(id)
)

CREATE TABLE logtickets
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    author INT NOT NULL,
    message VARCHAR(1000) NOT NULL,
    ticketId INT,
    date DATETIME,
    state VARCHAR(60),
    FOREIGN KEY (ticketId) REFERENCES tickets(id)
)

CREATE TABLE categories
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    parent INT,
)

CREATE TABLE login
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idDiscord CHAR,
    username VARCHAR(60),
    profilePicture VARCHAR(255),
    logID CHAR,
    passID CHAR,
    expiration BIGINT,
    active BOOLEAN
)

CREATE TABLE token
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    token VARCHAR(100) NOT NULL,
    expire DATETIME NOT NULL,
    loginfo PRIMARY KEY NOT NULL,
    FOREIGN KEY (loginfo) REFERENCES login(id)
)

flush privileges;