const neo = require('neo4j-driver')


const connect = async () => {

    const driver = neo.driver('neo4j://localhost:7687', neo.auth.basic('mabravo153', 'Barranquilla1.'))

    try {
        await driver.verifyConnectivity()
        return driver
    } catch (error) {
        console.log(error)
    }

}


module.exports = connect