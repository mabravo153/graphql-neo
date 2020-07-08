const { gql } = require('apollo-server-express')

const typeDefs = gql`

type User {
    id: ID!
    name: String!
    lastname: String!
    phone: String
}


type Query {
    showUsers: responseUser
    showUser(id: ID!): responseUser
}

type Mutation {
    storeUser(name: String! , lastname: String!, phone: String): responseUser
    updateUser(id: ID!, name: String!, lastname: String!, phone: String): responseUser
}


type responseUser {
    code: String!
    msg: String!
    user: [User]
}

`;


module.exports = typeDefs