"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const query = require("./schemas/query").query;
const mutation = require("./schemas/mutation").mutation;

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();
app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000, () =>
  console.log("Express GraphQL Server Now Running On localhost:3000/graphql")
);
