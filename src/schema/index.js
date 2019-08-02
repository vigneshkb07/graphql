import { gql } from 'apollo-server-express';

const typeDefs = gql`
  directive @isAdmin on FIELD_DEFINITION

  type User {
    id: Int!
    name: String!
    email: String!
    role: String!
  }

  
  
  type Query {
  allUsers: [User] @isAdmin 
  }
  
  type Mutation {
    signup(name: String!, email: String!, password: String!,role: String!): String
    login(email:String!,password:String!):String
    
  }
`

export default typeDefs;
