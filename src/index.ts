import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {connect} from 'mongoose'
import {Book}from '../models/books.js';

const MONGODB = 'mongodb+srv://localhost:27018/apollo-graph';

const typeDefs = `#graphql
type Book{
     _id :string,
    author: string,
    title: string,
    year: Int,
}

input BookInput {
  author: string,
    title: string,
    year: Int,
}

type Query {
  getBook(ID:ID!):Book!
  getBooks(limit:int):[Book]
}
type Mutation {
  createBook(bookInput: BookInput):String!
  updateBook(ID:ID!,bookInput:BookInput): String!
  deleteBook(ID:ID!):String!
}
`;