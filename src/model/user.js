const dbPool = require('../config/dbconfig');

const getUserPurchaseHistory = (userId) => {
    return dbPool.execute(`SELECT b.*,
                                p.id as product_id,
                                p.name as product_name,
                                p.price,
                                p.image,
                                p.created_at as product_created_at,
                                p.updated_at as product_updated_at
                            FROM user_buys b LEFT JOIN products p
                            ON p.id = b.product_id
                            WHERE b.user_id = ?; `,[userId]);
}

module.exports = {getUserPurchaseHistory}