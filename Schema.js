// Write a new product.gql file to match the mongoose model.

// const typeDefs = ["./schema/product.graphql"];
// const resolvers = ["./resolvers/product-resolvers.js"];

const { ApolloServer, gql} = require('apollo-server');
const app = Express();
const PORT = 4000;

const product = new Mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/150',
      validate: [v => validator.isURL(v), 'Not a valid image url']
    },
    type: {
      type: String,
      required: true,
      enum: ['GAMING_PC', 'BIKE', 'DRONE']
    },
    description: String,
    liquidCooled: {
      type: Boolean,
      required() {
        return this.type === 'GAMING_PC'
      }
    },
    bikeType: {
      type: String,
      enum: ['KIDS', 'MOUNTAIN', 'ELECTRIC', 'BEACH'],
      required() {
        return this.type === 'BIKE'
      }
    },
    range: {
      type: String,
      required() {
        return this.type === 'DRONE'
      }
	}
});
// Account for any enum types.
enum productType  {
    GAMING_PC
    BIKE
    DRONE
  }
  enum bikeType {
    KIDS
    MOUNTAIN
    ELECTRIC
    BEACH
  }
// Create a Product type.
type Product {
    name: String!
    price: Float!
    image: String!
    type: productType
    description: String
    liquidCooled: Boolean
    bikeType: bikeType
    range: String
    createdBy: user
  }

  type Query {
    allProducts: [Product]!
    productByName(name: String!): Product!
    productById(id: ID!): Product!
    myProductId (id: String!): Product!
  }

  input ProInput {
    id: ID
    name: String!
    price: Float!
    image: String!
    AvailProducts: AvailProducts
}
type Mutation {
  setProduct(input: ProInput!): Product!
  updateProduct(id: ID!, input: ProInput): Product!
  deleteProduct(id:ID!, input: ProInput): Product!
 };
//     // app.use(
//     //     "/graphql",
//     //     ExpressGraphQL({
//     //         schema: schema,
//     //         graphiql: true
//     //     })
//     // );
    
//     // app.listen(PORT, () => {
//     //     console.log(`The Server is listening on port number ${PORT}`);