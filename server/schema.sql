DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms(
  ID int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (ID),
  UNIQUE (name)
);

INSERT INTO rooms(name)
VALUES ('lobby');

CREATE TABLE users(
  ID int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (ID),
  UNIQUE (name)
);
INSERT INTO users(name)
VALUES ('djeff');

CREATE TABLE messages (
  ID int NOT NULL AUTO_INCREMENT,
  message text,
  userID int,
  roomID int DEFAULT 1,
  PRIMARY KEY (ID),
  FOREIGN KEY (userID) REFERENCES users(ID),
  FOREIGN KEY(roomID) REFERENCES rooms(ID)
);
INSERT INTO messages (message, userID, roomID)
VALUES('test message', 1, 1);




/*  Execute this file from the command line by typing:
 *    mysql -u student < server/schema.sql
 *  to create the database and the tables.*/

