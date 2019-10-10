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
('Honda for a Toyota', 'https://7e332c00e1be9e181e2d-d9ffe45c70bdd13b63cd77cef8e22a56.ssl.cf1.rackcdn.com/3HGGK5H46KM724872/2d494f62bd43c46eaa759cdf064827b0.jpg', 'https://images.autofusion.com/inventory_cars/1NXBR/32E15/1NXBR32E15Z455542_6.jpg', true, 1),
('Playstation 4 for Xbox One', 'https://rukminim1.flixcart.com/image/832/832/jr2dpjk0/gamingconsole/f/q/q/1-playstation-4-ps4-pro-sony-na-original-imafbb8r6j6zgsqe.jpeg?q=70', 'https://images-na.ssl-images-amazon.com/images/I/61C%2BTaZfptL._SL1036_.jpg', true, 1),
('Cat for Dog', 'http://placekitten.com/200/300', 'https://placedog.net/200/300', true, 1);

COMMIT;