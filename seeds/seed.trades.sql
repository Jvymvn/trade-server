BEGIN;

TRUNCATE
    comments,
    users,
    trades
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, full_name, password)
VALUES
('dunder', 'Bob miller', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');

INSERT INTO trades (title, image1, image2, active, user_id)
VALUES
('Post title 1', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', true, 1),
('Post title 2', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', false, 1),
('Post title 3', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', true, 1);

COMMIT;