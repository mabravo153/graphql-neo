const userModel = require('../models/userModel')

const Query = {

    showUsers: async (parent, args, context, info) => await userModel.show(),
    showUser: async (parent, args, context, info) => {
        const id = args.id

        const data = await userModel.showUser(id)

        return data
    }

}


module.exports = Query