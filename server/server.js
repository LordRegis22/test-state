const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const db = require('./db');
const http = require('http');
const path = require('path');
const { Traql, traqlAudit, analyticsRouter } = require('@aqls/server');

const typeDefs = require('./schema');
const resolvers = { Mutation, Query, Subscription };

const PORT = 4000;
const app = express();
app.use(express.json());

const pubsub = new PubSub();
const traql = new Traql(resolvers, '2b1a1362-e7ff-4879-8a2e-2bbd75a03f15');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db, pubsub, traql },
});

setInterval(() => traqlAudit(traql), 5000);

app.get('/', express.static(path.resolve(__dirname)));

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/analytics', analyticsRouter(traql));

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
