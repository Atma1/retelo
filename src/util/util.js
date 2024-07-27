const createProductHistoryObject =  ({id, product_id, user_id, status, created_at, updated_at}) => {
    return {
        id: id,
        product_id: product_id,
        user_id: user_id,
        status: status,
        created_at: created_at,
        updated_at: updated_at
    }
};

const createProductObject = ({product_id, product_name, price, image, description, product_created_at, product_updated_at}) => {
    return {
        id: product_id,
        name: product_name,
        price: price,
        image: image,
        description: description,
        created_at: product_created_at,
        updated_at: product_updated_at,
    }
}

const createUserObject = ({user_id, user_name, role, email, user_created_at, user_updated_at}) => {
    return {
        id: user_id,
        name: user_name,
        role: role,
        email: email,
        created_at: user_created_at,
        updated_at: user_updated_at,
    }
}

module.exports = {
    createProductHistoryObject,
    createProductObject,
    createUserObject,
}