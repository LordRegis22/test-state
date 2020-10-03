const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const db = require('./db');
const http = require('http');
const path = require('path');
const traql = require('./traql');

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { execute, subscribe } = require('graphql');

// const { SubscriptionServer } = require('subscriptions-transport-ws');

const typeDefs = require('./schema');
const resolvers = { Mutation, Query, Subscription };
const analyticsRouter = require('./analyticsRouter');
const PORT = 4000;
const app = express();
app.use(express.json());

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db, pubsub, traql },
});

app.get('/', express.static(path.resolve(__dirname)));

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/analytics', analyticsRouter);

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
