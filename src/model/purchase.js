const dbPool = require('../config/dbconfig');

const savePurchase = (purchase) => {
    const {id, product_id, user_id, status} = purchase;
    return dbPool.execute(`INSERT INTO user_buys (id, product_id, user_id, status) VALUES 
                           (?, ?, ?, ?) RETURNING * ;`,
                        [id, product_id, user_id, status]);
}

const getPurchaseFromId = (purchase_id) => {
    return dbPool.execute(`SELECT * FROM user_buys WHERE id = ?`, [purchase_id]);
}

const updatePurchaseStatus = async (status, purchase_id) => {
    const result = await dbPool.execute(`UPDATE user_buys SET status = ? WHERE id = ? `, [status, purchase_id]);
    if (result.affectedRows == 0) return [];
    return getPurchaseFromId(purchase_id);
}

const getAllPurchases = () => {
    const query = `SELECT 
                        b.*,
                        p.name as product_name,
                        p.id as product_id,
                        p.price,
                        p.created_at as product_created_at,
                        p.updated_at as product_updated_at,
                        p.image,
                        u.name as user_name,
                        u.email,
                        u.updated_at as user_updated_at,
                        u.created_at as user_created_at,
                        u.role, u.id as user_id
                    FROM user_buys b LEFT JOIN products p ON p.id = b.product_id
                    LEFT JOIN user u ON u.id = b.user_id`;
    return dbPool.execute(query);
}

module.exports = {
    savePurchase,
    updatePurchaseStatus,
    getAllPurchases,
    getPurchaseFromId
}