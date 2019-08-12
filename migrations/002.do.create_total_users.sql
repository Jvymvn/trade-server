CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP
);

CREATE TYPE category AS ENUM (
    'Electronics',
    'Furniture',
    'Clothing',
    'Games',
    'Transport'
);

ALTER TABLE trades
    ADD COLUMN
        user_id INTEGER REFERENCES users(id)
        ON DELETE SET NULL;

ALTER TABLE trades
    ADD COLUMN
        claim_user INTEGER REFERENCES users(id)
        ON DELETE SET NULL;