CREATE TABLE project(
	ID serial PRIMARY KEY,
	creator_id integer NOT NULL,
	created TIMESTAMP NOT NULL,
	title VARCHAR (50),
	description VARCHAR (255),
	CONSTRAINT fk_project_user
		FOREIGN KEY (creator_id)
		REFERENCES users (ID)
);

INSERT INTO project (creatorId, created, title, description)
VALUES (1, current_timestamp, 'A project title', 'A simple description')