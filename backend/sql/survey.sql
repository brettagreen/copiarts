CREATE TABLE survey (
  id SERIAL PRIMARY KEY,
  entry_time timestamp default CURRENT_TIMESTAMP NOT NULL,
  name_first VARCHAR(30) NOT NULL,
  name_last VARCHAR(30),
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  color_scheme TEXT[],
  font_scheme TEXT[],
  single_page TEXT NOT NULL,
  favorite TEXT,
  least_favorite TEXT,
  other TEXT
)