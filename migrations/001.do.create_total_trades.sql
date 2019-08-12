CREATE TABLE trades (
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    content TEXT,
    image1 TEXT NOT NULL,
    image2 TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);