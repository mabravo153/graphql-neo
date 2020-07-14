const userModel = require('../models/userModel')


const User = {
    order: async (parent, args, context, info) => {

        const id = parent.id

        const data = await userModel.showOrders(id)

        return data

    }
}

module.exports = User 