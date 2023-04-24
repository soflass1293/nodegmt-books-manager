import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { Author, Book, Category } from "./models";
import {
  getAuthorById,
  getAuthors,
  getBooks,
  getCategoryById,
  getCategories,
  createAuthor,
  createBook,
  createCategory,
} from "./resolvers";

// Define AuthorType
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author: Author) => getBooks(author.books),
    },
  }),
});

// Define BookType
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (book: Book) => getAuthorById(book.author),
    },
    category: {
      type: CategoryType,
      resolve: (book: Book) => getCategoryById(book.category),
    },
  }),
});

// Define CategoryType
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (category: Category) => getBooks(category.books),
    },
  }),
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    // Define query fields for authors, books, and categories
  }),
});

// Define RootMutation
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    // Define mutation fields for creating authors, books, and categories
  }),
});

// Create schema with RootQuery and RootMutation
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
