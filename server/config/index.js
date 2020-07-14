const neo = require('neo4j-driver')
require('dotenv').config({path: '.env'})


const connect = async () => {

    const driver = neo.driver(process.env.HOST_DB, neo.auth.basic(process.env.USER_NAME_DB,process.env.PASSWORD_DB))

    try {
        await driver.verifyConnectivity()
        return driver
    } catch (error) {
        console.log(error)
    }

}


module.exports = connect