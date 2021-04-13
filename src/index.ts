import gql from 'graphql-tag'
import { ApolloServer } from 'apollo-server'
import type { IPersonEntity } from './types/PersonEntity'
import type { IFilmsEntity } from './types/FilmsEntity'
import type { IStarshipEntity } from './types/StarshipsEntity'

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

  type Films {
    title: String!
    director: String!
    producer: String!
  }

  type Starships {
    name: String!
    model: String!
  }

  type Query {
    people(id: Int!): Person!
    films(id: Int!): Films!
    starships(id: Int!): Starships!
  }
`
const resolvers = {
  Query: {
    /**
     *
     * @param _ - Inital values
     * @param id - number
     * @param __ - Context
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
    /**
     *
     * @param _ - Inital values
     * @param id - number
     * @param __ - Context
     */
    async films(_: null, { id }: { id: number }, __: any) {
      return api.get(`films/${id}`).then(({ data }: { data: IFilmsEntity }) => {
        return {
          title: data.title,
          director: data.director,
          producer: data.producer,
        }
      })
    },
    /**
     *
     * @param _ - Inital values
     * @param id - number
     * @param __ - Context
     */
    async starships(_: null, { id }: { id: number }, __: any) {
      return api
        .get(`starships/${id}`)
        .then(({ data }: { data: IStarshipEntity }) => {
          return {
            name: data.name,
            model: data.model,
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
