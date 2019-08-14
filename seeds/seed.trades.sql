BEGIN;

TRUNCATE
    users,
    trades
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, full_name, password)
VALUES
('dunder', 'Bob miller', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');

INSERT INTO trades (title, image1, image2, active, user_id)
VALUES
('Playstation 4 for Xbox One', 'https://rukminim1.flixcart.com/image/832/832/jr2dpjk0/gamingconsole/f/q/q/1-playstation-4-ps4-pro-sony-na-original-imafbb8r6j6zgsqe.jpeg?q=70', 'https://images-na.ssl-images-amazon.com/images/I/61C%2BTaZfptL._SL1036_.jpg', true, 1),
('Post title 2', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', false, 1),
('Post title 3', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', true, 1);

COMMIT;