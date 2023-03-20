use mysql;

SET PASSWORD FOR 'root'@'localhost' = PASSWORD('94dy8vURzDEF78DHZ8DZ8712DKz3Nh7');

CREATE DATABASE IF NOT EXISTS tickets;

USE tickets;

CREATE TABLE categories
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cname VARCHAR(60) NOT NULL,
    idDiscord VARCHAR(80),
    parent INT
);

CREATE TABLE tickets
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    author INT NOT NULL,
    category VARCHAR(500) NOT NULL,
    title VARCHAR(60) NOT NULL,
    tdescription VARCHAR(1000) NOT NULL,
    screenshot BLOB,
    createdDate DATETIME,
    closingDate DATETIME
);

CREATE TABLE logtickets
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    author INT NOT NULL,
    tmessage VARCHAR(1000) NOT NULL,
    ticketId INT,
    tdate DATETIME,
    tstate VARCHAR(60),
    FOREIGN KEY (ticketId) REFERENCES tickets(id)
);

CREATE TABLE login
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idDiscord CHAR(18),
    username VARCHAR(60),
    profilePicture VARCHAR(255),
    logID INT(4),
    passID CHAR(24),
    expiration BIGINT,
    active BOOLEAN DEFAULT true
);

CREATE TABLE token
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    token VARCHAR(300) NOT NULL,
    expire DATETIME NOT NULL,
    loginfo INT UNIQUE NOT NULL,
    FOREIGN KEY (loginfo) REFERENCES login(id)
);

flush privileges;