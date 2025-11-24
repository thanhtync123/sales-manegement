CREATE DATABASE IF NOT EXISTS salesdb;
USE salesdb;
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(100),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    vat DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Categories (
    id INT PRIMARY KEY ,
    name VARCHAR(50),
    description VARCHAR(100)
);
ALTER TABLE Categories
MODIFY COLUMN id INT PRIMARY KEY AUTO_INCREMENT;
ALTER TABLE Categories DROP PRIMARY KEY;
ALTER TABLE Categories MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY(id);

ALTER TABLE products DROP FOREIGN KEY fk_category;
ALTER TABLE Categories DROP PRIMARY KEY;
ALTER TABLE Categories MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY(id);


ALTER TABLE products
ADD COLUMN category_id INT AFTER name;
ALTER TABLE products
ADD CONSTRAINT fk_category
FOREIGN KEY (category_id) REFERENCES Categories(id);

select * from products 
INSERT INTO Categories (name, description) VALUES
('Laptop', 'Máy tính xách tay'),
('Điện thoại', 'Điện thoại thông minh'),
('Phụ kiện', 'Chuột, bàn phím, tai nghe...'),
('Màn hình', 'Màn hình máy tính'),
('Mạng', 'Router, Switch...'),
('Lưu trữ', 'Ổ cứng, SSD...');

INSERT INTO products (name, sku, price, stock, category, image) VALUES
('Laptop Dell XPS 13','SKU001',1200.00,10,'Laptop','xps13.jpg'),
('MacBook Pro 16','SKU002',2500.00,5,'Laptop','mbp16.jpg'),
('iPhone 14','SKU003',999.00,20,'Điện thoại','iphone14.jpg'),
('Samsung Galaxy S23','SKU004',899.00,15,'Điện thoại','galaxyS23.jpg'),
('Chuột Logitech MX Master 3','SKU005',99.00,30,'Phụ kiện','mx3.jpg'),
('Bàn phím cơ Keychron K2','SKU006',120.00,25,'Phụ kiện','k2.jpg'),
('Tai nghe Sony WH-1000XM5','SKU007',350.00,12,'Phụ kiện','sonywh5.jpg'),
('Màn hình Dell 27"','SKU008',300.00,8,'Màn hình','dell27.jpg'),
('Router TP-Link AX3000','SKU009',150.00,18,'Mạng','tplink.jpg'),
('Ổ cứng SSD 1TB Samsung','SKU010',120.00,20,'Lưu trữ','ssd1tb.jpg');


INSERT INTO customers (name, phone, email, address) VALUES
('Nguyễn Văn A','0901001001','a@gmail.com','Hà Nội'),
('Trần Thị B','0901001002','b@gmail.com','Hải Phòng'),
('Lê Văn C','0901001003','c@gmail.com','Đà Nẵng'),
('Phạm Thị D','0901001004','d@gmail.com','Hồ Chí Minh'),
('Hoàng Văn E','0901001005','e@gmail.com','Cần Thơ'),
('Vũ Thị F','0901001006','f@gmail.com','Hải Dương'),
('Đinh Văn G','0901001007','g@gmail.com','Huế'),
('Ngô Thị H','0901001008','h@gmail.com','Nghệ An'),
('Bùi Văn I','0901001009','i@gmail.com','Bắc Ninh'),
('Phan Thị J','0901001010','j@gmail.com','Vũng Tàu');

INSERT INTO users (name, email, password, role) VALUES
('Admin','admin1@gmail.com','$2b$10$hashedpassword1','admin'),
('User1','user12@gmail.com','$2b$10$hashedpassword2','user'),
('User2','user23@gmail.com','$2b$10$hashedpassword3','user'),
('User3','user34@gmail.com','$2b$10$hashedpassword4','user'),
('User4','user45@gmail.com','$2b$10$hashedpassword5','user'),
('User5','user56@gmail.com','$2b$10$hashedpassword6','user'),
('User6','user67@gmail.com','$2b$10$hashedpassword7','user'),
('User7','user78@gmail.com','$2b$10$hashedpassword8','user'),
('User8','user89@gmail.com','$2b$10$hashedpassword9','user'),
('User9','user910@gmail.com','$2b$10$hashedpassword10','user');
INSERT INTO orders (customer_id, total, vat, discount, status) VALUES
(1,1320,120,0,'confirmed'),
(2,2750,250,0,'confirmed'),
(3,1098,99,0,'confirmed'),
(4,988,89,0,'confirmed'),
(5,330,30,0,'confirmed'),
(6,132,12,0,'confirmed'),
(7,385,35,0,'confirmed'),
(8,330,30,0,'confirmed'),
(9,165,15,0,'confirmed'),
(10,132,12,0,'confirmed');
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1,1,1,1200),
(1,5,1,120),
(2,2,1,2500),
(2,6,1,250),
(3,3,1,999),
(3,7,1,99),
(4,4,1,899),
(4,5,1,89),
(5,5,1,300),
(6,6,1,120),
(7,7,1,350),
(8,8,1,300),
(9,9,1,150),
(10,10,1,120);
use salesdb
ALTER TABLE products ADD COLUMN description varchar(100) after image
SELECT * FROM Products
alter table products drop column category
alter table products modify column price int 

SELECT p.id, p.name, c.name, p.sku, p.price, p.stock, p.image, p.description
FROM products p
INNER JOIN categories c ON c.id=p.category_id

ALTER TABLE order_items
DROP FOREIGN KEY order_items_ibfk_2;


ALTER TABLE order_items
ADD CONSTRAINT order_items_ibfk_2
FOREIGN KEY (product_id) REFERENCES products(id)
ON UPDATE CASCADE
ON DELETE CASCADE;


