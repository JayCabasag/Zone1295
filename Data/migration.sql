CREATE TABLE zone1295_user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_username VARCHAR(250) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    user_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 🛠 Fixed DEFAULT
    user_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 🛠 Updated correctly
);

CREATE TABLE zone1295_product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(250) NOT NULL,
    product_image TEXT NULL,
    product_price DECIMAL(10,2) NOT NULL, -- 🛠 Use DECIMAL for money
    product_onsale_price DECIMAL(10,2) DEFAULT NULL, -- 🛠 onsale_price can be null if no sale
    product_stock_count INT NOT NULL DEFAULT 0, -- 🛠 Safe default 0
    product_category VARCHAR(250) DEFAULT NULL,
    product_collection TEXT NULL,
    product_rating DECIMAL(3,2),
    product_artist VARCHAR(250) DEFAULT NULL,
    product_is_deleted TINYINT(1) NOT NULL DEFAULT 0, -- 🛠 Add default for flags
    product_is_bestselling TINYINT(1) NOT NULL DEFAULT 0,
    product_is_popular TINYINT(1) NOT NULL DEFAULT 0,
    product_is_onsale TINYINT(1) NOT NULL DEFAULT 0,
    product_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 🛠 Fixed DEFAULT
    product_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 🛠 Fixed typo and added ON UPDATE
);
