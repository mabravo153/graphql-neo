const { gql } = require('apollo-server-express')

const typeDefs = gql`

type User {
    id: ID!
    name: String!
    lastname: String!
    phone: String
    order: [Order]
}


type Query {
    showUsers: responseUser
    showUser(id: ID!): responseUser
    showOrderByID(idOrder: ID!): responseOrder
}

type Mutation {
    storeUser(name: String! , lastname: String!, phone: String): responseUser
    updateUser(id: ID!, name: String!, lastname: String!, phone: String): responseUser
    deleteUser(id: ID!): responseUser
    createOrder(idUser:ID!, price:Int, products: [infoProduct]!): responseOrder
}

type Order {
    id: ID!
    date: String!
    price: Int!
    user: [User]
}

input infoProduct {
    quantity: Int!
    id: ID!
}

type Product {
    id: ID!
    name: String!
}


type responseUser {
    code: String!
    msg: String!
    user: [User]
}

type responseOrder {
    code: String!
    msg: String!
    order: Order
}

`;


module.exports = typeDefs