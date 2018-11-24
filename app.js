"use strict";
const db = require("./pgAdaptor").db;
var express = require("express");
var expressGraphQl = require("express-graphql");
var graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = graphql;

const ProjectType = new GraphQLObjectType({
  name: "Project",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    creator_id: { type: GraphQLString },
    created: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    img_url: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    joined: { type: GraphQLString },
    last_logged_in: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `select * from project where id=${args.id}`;

        return db
          .one(query)
          .then(res => res)
          .catch(err => err);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `select * from users where id=${args.id}`;

        return db
          .one(query)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        creatorId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        imgUrl: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO project(creator_id, created, title, description, img_url) VALUES ($1, $2, $3, $4, $5)`;
        const values = [args.creatorId, new Date(), args.title, args.description, args.imgUrl];

        return db
          .none(query, values)
          .then(res => {
              console.log("success");
          })
          .catch(err => {
              console.log(err);
              
              return err;
          });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
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
