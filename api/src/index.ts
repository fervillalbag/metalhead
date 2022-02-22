import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: ".env" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET_KEY_LOGIN as string
        );

        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
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
