const productModel = require('../model/product');
const {createId} = require('@paralleldrive/cuid2');

const getAllProducts = async (req, res, next) => {
    const search = req.query?.search;

    try {
        if (!search) {
            const [result] = await productModel.getAllProducts();
            if (!result) return res.status(200).json({message: 'No products inserted yet'});
            return res.status(200).json({message: 'All product(s) successfully retreived!', data: result})
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const searchProduct = async (req, res) => {
    const search = req.query?.search;

    try {
        if (!search) return res.status(400).json({message: 'No products query!'});
        const [result] = await productModel.searchProduct(search);
        return res.status(200).json({message: 'Product sucessfully retreived!', data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const addProduct = async (req, res) => {
    const {body} = req;
    const imageName = req?.file.filename;
    if (!imageName) return res.status(400).json({message: 'No product image!'});
    body.id = createId();
    body.image = imageName;
    try {
        const [result] = await productModel.addProduct(body);
        return res.status(200).json({message: 'Product sucessfully created!', data: result[0]}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const updateProduct = async (req, res) => {
    const {body} = req;
    const imageName = req?.file.filename;
    const productId = req?.params.productId;
    if (!imageName) return res.status(400).json({message: 'No product image!'});
    if (!productId) return res.status(400).json({message: 'No product id!'});
    body.image = imageName;
    try {
        const [result] = await productModel.updateProduct(body, productId);
        if (result.length == 0) return res.status(400).json({message: 'No row affected. Perhaps the product id is wrong?'});
        return res.status(200).json({message: 'Product sucessfully updated!', data: result}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const deleteProduct = async (req, res) => {
    const productId = req?.params.productId;
    if (!productId) return res.status(400).json({message: 'No product id!'});
    try {
        await productModel.getAllProducts();
        return res.status(200).json({message: 'Product deleted!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const getProduct = async (req, res) => {
    const productId = req.params?.productId;

    try {
        if (!productId) return res.status(400).json({message: 'No products id!'}); 
        const [result] = await productModel.getProduct();
        return res.status(200).json({message: 'Product sucessfully retreived!', data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProduct
}