const { gql } = require('apollo-server-express')

const typeDefs = gql`

type User {
    id: ID!
    name: String!
    lastname: String!
    order: [Order]
}


type Query {
    showUser: [User!]
}

`;


module.exports = typeDefs