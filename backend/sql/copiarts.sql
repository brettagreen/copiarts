\echo 'Delete and recreate copiarts db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE copiarts;
CREATE DATABASE copiarts;
\connect copiarts

\i copiarts-schema.sql
-- --\i copiarts-seed.sql

\echo 'Delete and recreate copiarts_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE copiarts_test;
CREATE DATABASE copiarts_test;
\connect copiarts_test

\i copiarts-schema.sql
-- \i copiarts-seed.sql

\echo 'Delete and recreate copiarts_testing db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE copiarts_testing
CREATE DATABASE copiarts_testing
\connect copiarts_testing

\i copiarts-schema.sql
-- \i copiarts-seed.sql
