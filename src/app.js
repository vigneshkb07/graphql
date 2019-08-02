import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/index';
import rootResolver from './resolver/index';
const path = '/api'
const app = express();

app.use(
    path,
    jwt({
      secret: 'somesupersecret',
      credentialsRequired: false
    })
  )

const server = new ApolloServer({
  typeDefs,
  rootResolver,
})

server.applyMiddleware({ app, path })




export default app;
