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
    people(id: Int!): Person!
  }
`
const resolvers = {
  Query: {
    /**
     *
     * @param _ - Inital values
     * @param args
     * @param __ - Context
     * @returns
     */
    async people(_: null, { id }: { id: number }, __: any) {
      return api
        .get(`people/${id}`)
        .then(({ data }: { data: IPersonEntity }) => {
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
  context() {
    return {}
  },
})

server.listen(4000).then(() => console.log('server running'))
