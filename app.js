'use strict';
const db = require('./psqlAdapter').psql;
var express = require('express');
var expressGraphQl = require('express-graphql');
var graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
 } = graphql;

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLString },
        creator_id: { type: GraphQLString },
        created: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        img_url: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        joined: { type: GraphQLString },
        last_logged_in: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => {
        return {
            project: {
                type: ProjectType,
                args: { id: { type: GraphQLID }},
                resolve(parentValue, args) {
                    const query = `select * from project where id=${args.id}`;
    
                    return db.one(query).then(res => {
                        return res;
                    })
                    .catch(err => {
                        return err;
                    })
                }
            },
            user: {
                type: UserType,
                args: { id: { type: GraphQLID }},
                resolve(parentValue, args) {
                    const query = `select * from users where id=${args.id}`;
    
                    return db.one(query)
                    .then(res => res)
                    .catch(err => err)
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery
});

var app = express();
app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));
