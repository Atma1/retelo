const { createId } = require('@paralleldrive/cuid2');
const purchaseModel = require('../model/purchase');
const {createProductHistoryObject, createProductObject, createUserObject} = require('../util/util');

const getAllPurchases = async (_, res) => {
    try {
        const [result] = await purchaseModel.getAllPurchases();
        if (result.length == 0) return res.status(200).json({message: 'No purchases inserted yet!'});
        const allPurchases = result.map((purchase) => {
            return {
                ...createProductHistoryObject(purchase),
                product: createProductObject(purchase),
                user: createUserObject(purchase)
            }
        })
        return res.status(200).json({message: 'Purchases retreived!', data: allPurchases});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const savePurchase = async (req, res) => {
    try {
        const {body} = req;
        const defaultStatus = 'pending';
        if (Object.keys(body).length == 0) return res.status(400).json({error_message: 'No purchase body!'});
        body.id = createId();
        body.status = defaultStatus;
        const [result] = await purchaseModel.savePurchase(body);
        return res.status(200).json({message: 'Purchase inserted!', data: result[0]});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

const updatePurchaseStatus = async (req, res) => {
    try {
        const purchaseId = req?.params.purchaseId;
        if (!purchaseId) return res.status(400).json({message: 'No purchase id!'});
        const {status} = req.body;
        if (!status) return res.status(400).json({message: 'No purchase status!'});
        const [result] = await purchaseModel.updatePurchaseStatus(status, purchaseId);
        if (result.length == 0) return res.status(400).json({message: 'No row affected. Perhaps the purchase id is wrong?'});
        return res.status(200).json({message: 'Purchase status updated!', data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
}

module.exports = {
    getAllPurchases,
    savePurchase,
    updatePurchaseStatus,
}