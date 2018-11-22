CREATE TABLE users(
	ID serial PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
	joined TIMESTAMP NOT NULL,
	last_logged_in TIMESTAMP NOT NULL
);

INSERT INTO users (username, email, joined, last_logged_in)
VALUES ('SmellyFoot', 'smelly.foot@gmail.com', current_timestamp, current_timestamp);