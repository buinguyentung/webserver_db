CREATE TABLE IF NOT EXISTS todosTbl (
   id BIGSERIAL NOT NULL PRIMARY KEY,
   text VARCHAR(50) NOT NULL,
   isDone BOOLEAN NOT NULL
);