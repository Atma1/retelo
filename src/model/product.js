const dbPool = require('../config/dbconfig');

const getAllProducts = () => {
    return dbPool.execute(`SELECT * FROM products;`);
}

const getProduct = (productId) => {
    return dbPool.execute(`SELECT * FROM products WHERE id = ?;`, [productId]);
}

const searchProduct = (search) => {
    const searchParam = `%${search}%`;

    return dbPool.execute(`SELECT * FROM products
                           WHERE name LIKE ?`, [searchParam])
}

const updateProduct = async (body, productId) => {
    const {name, price, image, description} = body;
    const result = await dbPool.execute(`UPDATE products SET 
                           name = ?, price = ?, image = ?, description = ? WHERE id = ?`,
                        [name, price, image,description, productId]);
    if (result.affectedRows == 0) return [];
    return getProduct(productId)
}

const addProduct = (body) => {
    const {name, id, price, image, description} = body;
    return dbPool.execute(`INSERT INTO products (id, name, price, image, description) VALUES 
                           (?, ?, ?, ?, ?) RETURNING *`,
                        [id, name, price, image, description]);
}

const deleteProduct = (productId) => {
    dbPool.execute(`DELETE FROM products WHERE id = ?`, [productId]);
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    searchProduct,
    getProduct,
    getAllProducts,
}