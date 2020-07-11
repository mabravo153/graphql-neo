const orderModel = require('../models/orderModel')


const Order = {

    user: async (parent, args, context, info) => await orderModel.showUserOrder(parent.id)

}


module.exports = Order