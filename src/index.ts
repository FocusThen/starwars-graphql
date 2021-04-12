import gql from 'graphql-tag'
import { ApolloServer } from 'apollo-server'

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]
  }

  type Query {
    me: User!
  }
`
const resolvers = {
  Query: {
    me() {
      return {
        email: 'foo@foo.com',
        avatar: 'foo',
        friends: [
          {
            email: 'bar@bar.com',
            avatar: 'bar',
          },
        ],
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('server running'))
