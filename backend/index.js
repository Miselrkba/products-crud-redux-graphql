const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { v4: uuidv4 } = require("uuid");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    createProduct(name: String!, price: Float!): Product!
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, name: String, price: Float): Product!
  }
`;

const products = [
  { id: "1", name: "Product 1", price: 9.99 },
  { id: "2", name: "Product 2", price: 19.99 },
];

const resolvers = {
  Query: {
    products: () => products,
  },
  Mutation: {
    createProduct: (_, { name, price }) => {
      const newProduct = { id: uuidv4(), name, price };
      products.push(newProduct);
      return newProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        return false;
      }
      products.splice(index, 1);
      return true;
    },
    updateProduct: (_, { id, name, price }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      return product;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
