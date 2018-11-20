DROP TABLE Users;
CREATE TABLE Users(UserID INTEGER PRIMARY KEY, userName varchar(30), firstName varchar(20), hash valchar(20), salt valchar(20));

DROP TABLE UserKeys;
CREATE TABLE UserKeys(UserKeysID INTEGER PRIMARY KEY, UserID int, site varchar(20), accountName varchar(20), passKey varchar(500));