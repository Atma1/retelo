const userModel = require('../model/user');
const {createProductHistoryObject, createProductObject} = require('../util/util');

const getUserPurchase = async (req, res) => {
    try {
        const userId = req?.params.userId;
        if (!userId) return res.status(400).json({message: 'No user id!'});
        const [result] = await userModel.getUserPurchaseHistory(userId);
        const allUserPurchases = result.map((purchase) => {
            return {
                ...createProductHistoryObject(purchase),
                product: createProductObject(purchase),
            }
        })
    return res.status(200).json({message: 'User purchase(s) retreived successfully!', data: allUserPurchases});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error!', error_message: error});
    }
    
}

module.exports = {getUserPurchase}
