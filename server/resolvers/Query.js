const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')

const Query = {

    showUsers: async (parent, args, context, info) => await userModel.show(),
    
    showUser: async (parent, args, context, info) => {
        const id = args.id

        const data = await userModel.showUser(id)

        return data
    },

    showOrderByID: async (parent, args, context, info) => {
        const id = args.idOrder

        const data = await orderModel.showOrder(id)

        return data
    },
    
    showProducts: async (parent, args, context, info) => {
    

        const data = await productModel.showProducts()

        return data

    }

}


module.exports = Query