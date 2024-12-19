CREATE TABLE Account (
account_id INT AUTO_INCREMENT PRIMARY KEY,
creation_day TIMESTAMP DEFAULT current_timestamp,
email varchar(100) NOT NULL UNIQUE,
user_password varchar(255) NOT NULL,
is_active BOOL DEFAULT TRUE
);

CREATE TABLE User (
user_id INT AUTO_INCREMENT PRIMARY KEY,
account_id INT,
username VARCHAR(50) NOT NULL,
profile_picture VARCHAR(255),
bio TEXT,
FOREIGN KEY (account_id) references Account(account_id)
);

CREATE TABLE Game (
game_id INT AUTO_INCREMENT PRIMARY KEY,
title varchar(255),
genre varchar(50),
platform varchar(25)
);

CREATE TABLE Team (
    group_id int auto_increment primary key,
    game_id int not null,
    group_name varchar(255) not null,
    num_members int default 0,
    foreign key (game_id) references Game(game_id)
);

CREATE TABLE Message (
    message_id int auto_increment primary key,
    sender_id int not null,
    receiver_id int not null,
    group_id int not null,
    content varchar(1000),
    foreign key (group_id) references Team(group_id),
    FOREIGN KEY (sender_id) REFERENCES User(user_id),
    FOREIGN KEY (receiver_id) REFERENCES User(user_id)
);

CREATE TABLE Team_Members (
  membership_id int NOT NULL AUTO_INCREMENT,
  group_id int NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (membership_id),
  KEY group_id (group_id),
  KEY user_id (user_id),
  CONSTRAINT team_members_ibfk_1 FOREIGN KEY (group_id) REFERENCES Team (group_id),
  CONSTRAINT team_members_ibfk_2 FOREIGN KEY (user_id) REFERENCES User (user_id)
)