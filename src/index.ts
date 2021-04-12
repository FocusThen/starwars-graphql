import gql from 'graphql-tag'
import { ApolloServer } from 'apollo-server'
import type { IPersonEntity } from './types/PersonEntity'

// axios
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
})

const typeDefs = gql`
  type Person {
    name: String!
    gender: String
    eyeColor: String
  }

  type Query {
    people: Person!
  }
`
const resolvers = {
  Query: {
    async people() {
      return api.get('people/1').then(({ data }: { data: IPersonEntity }) => {
        return {
          name: data.name,
          gender: data.gender,
          eyeColor: data.eye_color,
        }
      })
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('server running'))
