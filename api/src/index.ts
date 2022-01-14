import { ApolloServer, gql } from "apollo-server";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const mongoUri: any = process.env.MONGO_DB;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT });
  })
  .then((res: any) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
