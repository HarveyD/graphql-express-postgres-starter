const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const { ProjectType } = require("./types");

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
        const values = [
          args.creatorId,
          new Date(),
          args.title,
          args.description,
          args.imgUrl
        ];

        return db
          .none(query, values)
          .then(res => {
            console.log("success");
          })
          .catch(err => {
            return err;
          });
      }
    }
  }
});

exports.mutation = RootMutation;
