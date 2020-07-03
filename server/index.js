const { ApolloServer } = require('apollo-server-express')
const Query = require('./resolvers/Query')
const Mutation  = require('./resolvers/Mutation')
const typeDefs = require('./schema')
const express = require('express')




const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers: { Query, Mutation}
})


server.applyMiddleware({ app })


app.listen({ port: 9000 }, () => {
    console.log(`Server ready at http://localhost:9000${server.graphqlPath}`)    
})