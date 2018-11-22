CREATE TABLE project(
	ID serial PRIMARY KEY,
	creator_id integer NOT NULL,
	created TIMESTAMP NOT NULL,
	title VARCHAR (50),
	description VARCHAR (255),
	img_url VARCHAR (255),
	CONSTRAINT fk_project_user
		FOREIGN KEY (creator_id)
		REFERENCES users (ID)
);

INSERT INTO project (creatorId, created, title, description, imgUrl)
VALUES (1, current_timestamp, 'Crypto Coaster', 'I was interested in crypto currency at one point in my life and decided to create a little web application for it.', 'https://www.harveydelaney.com/static/media/crypto-coaster.2181a429.jpg')