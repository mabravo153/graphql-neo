const connect = require('../config')

const productModel  = {


    create: async (args) => {

        const driver = await connect()
        let data; 
        const { id, name } = args

        if(driver){

            const session = driver.session()

            try {
                
                const query = await session.writeTransaction(tx => 
                    tx.run('CREATE (pro :Product {id: $id, name: $name}) RETURN pro ',
                    { id, name }))

                const field = query.records.map(element => element.get('pro').properties)

                data = {
                    code: 200,
                    msg: 'product created',
                    product: field
                }


            } catch (error) {
                
                console.log(error);

                data = {
                    code: 500,
                    msg: 'Internal server error'
                }

            }

        }else{

            data = {
                code: 502,
                msg: 'Bad Gateway'
            }

        }

        return data

    },

    showProducts: async () => {
        const driver = await connect()
        let data;
       

        if(driver){

            const session = driver.session()

            try {
                
                const query = await session.readTransaction(tx => 
                    tx.run('MATCH ( pro :Product ) RETURN pro LIMIT 50'
                    ))

                if (query.records.length) {
                    
                    const promiseField = Promise.resolve(query.records.map(element => element.get('pro').properties ))

                    const field = await promiseField
                    
                    data = {
                        code: 200,
                        msg: 'Correct',
                        product: field
                    }

                }else{
                   
                    data = {
                        code: 404,
                        msg: 'Products not found'
                    }
                    
                }

            } catch (error) {
                
                console.log(error);

                data = {
                    code: 500,
                    msg: 'Internal Server error'
                }

            }

        }else{
            data = {
                code: 502,
                msg: 'Bad Gateway'
            }
        }

        return data
    }
}


module.exports = productModel