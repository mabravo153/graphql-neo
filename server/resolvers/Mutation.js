const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const uuid = require('uuid')


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

    },

    deleteUser: async (parent, args, context, info) => {
        const id = args.id 

        const data = await userModel.deleteUser(id)

        return data
    },

    createOrder: async (parent, args, context, info) => {
        
        let errores = []
        let data; 

        if(!args.idUser){
            errores.push('falta el id de usuario')
        }
        if(!args.price){
            errores.push('falta el precio del producto')
        }
        if(!args.products){
            errores.push('falta el nombre del product')
        }

        if(errores.length){

            data = {
                code: 400,
                msg: 'Info is required'
            }

        }else{
            
            const promiseProducts = Promise.resolve(args.products.map(element => JSON.parse(JSON.stringify(element))))
            
            args.id = uuid.v4()
            args.date = new Date().toUTCString()

            args.products = await promiseProducts
            

            data = await orderModel.create(args)

        }

        return data;


    }


}

module.exports = Mutation