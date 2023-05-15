import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import Book from '../models/books.js';
const MONGODB = 'mongodb+srv://ngash:skillsapp-dev@cluster0.u8mfkue.mongodb.net/?retryWrites=true&w=majority';
//  'mongodb+srv://localhost:27018/apollo-graph';
const typeDefs = `#graphql
type Book{
     _id: String,
    author: String,
    title: String,
    year: Int,
}

input BookInput {
    author: String,
    title: String,
    year: Int,
}

type Query {
  getBook(ID:ID!):Book!
  getBooks(limit:Int):[Book]
}
type Mutation {
  createBook(bookInput: BookInput):String!
  updateBook(ID:ID!,bookInput:BookInput): String!
  deleteBook(ID:ID!):String!
}
`;
const resolvers = {
    Query: {
        async getBook(_, { ID }) {
            return await Book.findById(ID);
        },
        async getBooks(_, { limit }) {
            return await Book.find().limit(limit);
        },
    },
    Mutation: {
        async createBook(_, { bookInput: { author, title, year } }) {
            const res = new Book({ author, title, year }).save();
            return (await res)._id;
        },
        async updateBook(_, { ID, bookInput: { author, title, year } }) {
            await Book.updateOne({ _id: ID }, { $set: { author, title, year } });
            return ID;
        },
        async deleteBook(_, { ID }) {
            await Book.deleteOne({ _id: ID });
            return ID;
        }
    }
};
await connect(MONGODB);
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log(`server is readt at ${url}`);
