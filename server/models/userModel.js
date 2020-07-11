const connect = require('../config')
const uuid = require('uuid')

const userModel = {

    show: async () => {
        const driver = await connect()
        let data;
        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                const query = await session.readTransaction(tx => 
                    tx.run( 'MATCH (p :Person) RETURN p' ))
    
    
                const Promisefields = Promise.resolve(query.records.map(element => element.get('p').properties ))
                const field = await Promisefields

                data = {
                    code: 200,
                    msg: 'Correct',
                    user: field 
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

    create: async (args) => {
        const { name, lastname, phone } = args 
        let data;
        const id = uuid.v4()
        const driver = await connect()

        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                const query = await session.writeTransaction(tx => 
                    tx.run('CREATE (p :Person { id: $id, name: $name, lastname: $lastname, phone: $phone  }) RETURN p',
                    {id, name, lastname, phone}))

                const field = query.records.map(element => element.get('p').properties)

                data = {
                    code: 200,
                    msg: 'User created',
                    user: field
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

    showUser: async (id) => {
        const driver = await connect()
        let data;

        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                
                const query = await session.readTransaction(tx =>
                    tx.run('MATCH (p :Person {id: $id}) RETURN p', 
                    { id }))
                
                if(query.records.length){

                    const field = query.records.map(element => element.get('p').properties)

                    data = {
                        code: 200,
                        msg: 'user found',
                        user: field
                    }

                }else{
                    data = {
                        code: 404,
                        msg: 'User not found'
                    }
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

    updateUser: async (args) => {
        const driver = await connect()
        const { id, name, lastname, phone } = args
        let data;

        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                
                const query = await session.writeTransaction(tx => 
                    tx.run('MATCH ( p :Person {id: $id} ) SET p = {id: $id, name: $name, lastname: $lastname, phone: $phone} RETURN p',
                    {id, name, lastname, phone}))

                if (query.records.length) {

                    const field = query.records.map(element => element.get('p').properties)

                    data = {
                        code: 200,
                        msg: 'User updated',
                        user: field
                    }
                    
                }else{
                    data = {
                        code: 404,
                        msg: 'User not found'
                    }
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

    deleteUser: async (id) => {
        const driver = await connect()
        let data; 

        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                
                const query = await session.writeTransaction(tx => 
                    tx.run('MATCH (p :Person {id: $id}) DELETE p RETURN p ', 
                    {id}))

                if(query.records.length){

                    const field = query.records.map(element => element.get('p').properties)

                    data = {
                        code: 200,
                        msg: 'User Deleted'
                    }

                }else{
                    data = {
                        code: 404,
                        msg: 'User not Found'
                    }
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

    showOrders: async (id) => {
        const driver = await connect()
        let data; 

        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                
                const query = await session.readTransaction(tx => 
                    tx.run('MATCH (p :Person {id: $id} ) -[b :BUY]-> (o :Order) RETURN b,o ',
                    {id}))
                
                if(query.records.length){

                    const promiseField = Promise.resolve(query.records.map(element => {
                        return {
                            ...element.get('b').properties,
                            ...element.get('o').properties
                        }
                    }))

                    data = await promiseField

                }else{
                    data = null
                }

            } catch (error) {
                console.log(error);

                data = null
            }

        }else{
            data = null
        }


        return data 
    }

}

module.exports = userModel