CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  person_first TEXT NOT NULL,
  person_last TEXT NOT NULL,
  person_handle TEXT GENERATED ALWAYS AS (coalesce(person_first || ' ' || person_last)) STORED,
  person_bio TEXT CONSTRAINT bio_length CHECK (char_length(person_bio) <= 5000)
    DEFAULT 'this author prefers to keep an air of mystery about them',
  icon TEXT DEFAULT 'defaultUserIcon.jpg'
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  nameFirst VARCHAR(30) NOT NULL,
  nameLast VARCHAR(30) NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  comment TEXT NOT NULL CONSTRAINT comment_length CHECK (char_length(comment) <= 1000)
);

CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL
);