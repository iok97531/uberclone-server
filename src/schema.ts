import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: GraphQLSchema[] = fileLoader(path.join(__dirname, "./api/**/*.graphql").replace(/\\/g,"/"));
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.resolvers.*").replace(/\\/g,"/"));

const mergedTypes = mergeTypes(allTypes, {all: true});
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;