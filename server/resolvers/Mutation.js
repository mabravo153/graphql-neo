const userModel = require('../models/userModel')


const Mutation = {

    storeUser: async (parent, args, context, info) => {

        let data;
        let errores = []


        if(!args.name){
            errores.push('El nombre es requerido')
        }
        if(!args.lastname){
            errores.push('El apellido es requerido')
        }
        if(!args.phone){
            errores.push('El telefono es requerido')
        }

        if(errores.length){
            data = {
                code: 400,
                msg: 'Error, info required'
            }
        }else{
            data = await userModel.create(args)
        }

        return data

    },
    updateUser: async (parent, args, context, info) => {

        let data;
        let errores = []


        if(!args.name){
            errores.push('El nombre es requerido')
        }
        if(!args.lastname){
            errores.push('El apellido es requerido')
        }
        if(!args.phone){
            errores.push('El telefono es requerido')
        }

        if(errores.length){
            data = {
                code: 400,
                msg: 'Error, info required'
            }
        }else{
            data = await userModel.updateUser(args)
        }

        return data

    }

}

module.exports = Mutation