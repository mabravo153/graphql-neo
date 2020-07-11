const connect = require('../config')

const orderModel = {

    create: async (args) => {
        const driver = await connect()
        const { id, date, idUser, price, products } = args
        let data;


        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try {
                
                const query = await session.writeTransaction(tx => 
                    tx.run('MATCH (p :Person { id: $idUser })' +
                    'CREATE (p) -[ b :BUY {date: $date}]-> ( o :Order {id: $id, price: $price})' +
                    'WITH o,b UNWIND $products as product MATCH (pro :Product { id: product.id }) CREATE (pro) <-[c :CONTAIN {quantity: product.quantity }]- (o) RETURN b,o, pro' ,
                    { id, date, idUser, price, products } ))


                if(query.records.length){
                    const field = query.records.map(element => {
                        return {
                            ...element.get('o').properties,
                            ...element.get('b').properties                        
                        }
                    })
    
                    
                    

                    data = {
                        code: 200,
                        msg: 'Order created',
                        order: field[0]
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
                msg: 'Bad Request '
            }
        }

        return data
    },
    
    showOrder: async (id) => {
        const driver = await connect()
        let data; 


        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try{

                const query = await session.readTransaction(tx => 
                    tx.run('MATCH (o :Order {id: $id}) <-[b :BUY]- ( :Person) RETURN o, b',
                    {id}))

                if(query.records.length){

                    const field = query.records.map(element => {

                        return {
                            ...element.get('o').properties,
                            ...element.get('b').properties
                        }

                    })

                    data = {
                        code: 200,
                        msg: 'Order',
                        order: field
                    }

                }else{

                    data = {
                        code: 404,
                        msg: 'Order not found'
                    }

                }

            }catch(error){
                console.log(error);

                data = {
                    code: 500,
                    msg: 'Internal server error'
                }
                
            }

        }else{
            data = {
                code: 502,
                msg: 'Bad gateway'
            }
        }

        return data
    },

    showUserOrder: async (id) => {
        const driver = await connect()
        let data; 


        if(driver){

            const session = driver.session({database: 'proyectoneo'})

            try{

                const query = await session.readTransaction(tx => 
                    tx.run('MATCH (o :Order {id: $id}) <-[b :BUY]- (p :Person) RETURN p',
                    {id}))

                if(query.records.length){

                    data = query.records.map(element => element.get('p').properties)

                }else{
                    console.log('aqui 1');
                    
                    data = null

                }

            }catch(error){
                console.log(error);

                data = null
                
            }

        }else{
            data =null
            console.log('aqui 2');
        }

        return data
    }

}

module.exports = orderModel