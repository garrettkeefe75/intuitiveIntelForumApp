CREATE DATABASE ForumApp;

CREATE TABLE thread(
    thread_id SERIAL PRIMARY KEY,
    description VARCHAR(100)
);


/*To delete a specific row*/
DELETE FROM thread WHERE thread_id IN (id_num);


/*To reset the primary key of the table*/
ALTER SEQUENCE thread_thread_id_seq RESTART WITH 1;