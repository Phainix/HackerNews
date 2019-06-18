import { Reddit } from 'graphqlhub-schemas';
import { GraphQLSchema, graphql } from 'graphql';

console.log('made it');

let schema = new GraphQLSchema({
    query: Reddit.QueryObjectType
});

let query = ' { user(username: "kn0thing") { username } } ';
graphql(schema, query).then((result) => {
    console.log(result);
});