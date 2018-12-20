DROP DATABASE IF EXISTS mariana_trench_research;
CREATE DATABASE mariana_trench_research;

\c mariana_trench_research;

CREATE TABLE researchers(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  job_title VARCHAR NOT NULL
);

CREATE TABLE species(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  is_mammal BOOLEAN
);

CREATE TABLE animals(
  id SERIAL PRIMARY KEY,
  species_id INT REFERENCES species(id),
  nickname VARCHAR
);

CREATE TABLE habitats(
  id SERIAL PRIMARY KEY,
  category VARCHAR
);

CREATE TABLE taggings(
  id SERIAL PRIMARY KEY,
  animal_id INT REFERENCES animals(id) ON DELETE CASCADE,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL
);

CREATE TABLE sightings(
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL,
  species_id INT REFERENCES species(id) ON DELETE SET NULL,
  habitat_id INT REFERENCES habitats(id)
);

INSERT INTO researchers(name, job_title) VALUES ('Mariana Aleta', 'Project Lead'), ('Javed Patrick', 'Senior Field Researcher'), ('Carolina Itai', 'Field Researcher'), ('Jazmyn Gottfried', 'Field Researcher'), ('Ezra Flip', 'Research Intern');

INSERT INTO species(name, is_mammal) VALUES ('Dolphin', 'true'), ('Moray Eel','false'), ('Tiger Shark','false'), ('Orca Whale', 'true'), ('Moon Jelly', 'false');

INSERT INTO animals(species_id, nickname) VALUES(1, 'Flip'), (1, 'Skip'), (2, 'Jenkins'), (3, 'Sally'), (4, 'Flapjack'), (4, 'Gibbous'), (4, 'Nox');

INSERT INTO habitats(category) VALUES('Shallows'), ('Coral Reef'), ('Tide Pool'), ('Deeps');

INSERT INTO taggings(animal_id, researcher_id) VALUES (1, 5), (1, 4), (2, 3), (3, 1), (4, 2), (5, 4), (6, 4), (7, 2);

INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(4, 4, 4), (1, 3, 4), (3, 5, 3), (5, 2, 2), (2, 1, 1), (5, 2, 1)
