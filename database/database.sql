CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    users_id INTEGER REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS projectPhoto (
    id SERIAL PRIMARY KEY,
    photoPath VARCHAR(150) NOT NULL,
    projects_id INTEGER REFERENCES projects(id)
);


CREATE TABLE IF NOT EXISTS architect(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL UNIQUE,
    experience INTEGER NOT NULL,
    information TEXT NOT NULL,
    photo VARCHAR(150) NOT NULL,
    projects_id INTEGER REFERENCES projects(id)
);


CREATE TABLE IF NOT EXISTS status(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Created') THEN
    INSERT INTO status (name) VALUES ('Created');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Comfirmed') THEN
    INSERT INTO status (name) VALUES ('Comfirmed');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'In progress') THEN
    INSERT INTO status (name) VALUES ('In progress');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Done') THEN
    INSERT INTO status (name) VALUES ('Done');
  END IF;
END $$;


create table if not exists orders(
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    projectType INTEGER REFERENCES projects(id),
    status_id INTEGER default 1 REFERENCES status(id),
    users_id INTEGER REFERENCES users(id)
);
