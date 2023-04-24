import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import { schema } from './schema';

// Connect to MongoDB (Use your own URL)
mongoose.connect('mongodb://localhost/book_management_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

// Configure GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
