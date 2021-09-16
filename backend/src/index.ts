import { ApolloServer } from "apollo-server-express";
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
import express from "express";
import { GraphQLSchema } from "graphql";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { SomethingResolver } from "./schema/something/SomethingResolver";
import { createConnection } from "typeorm";
import ormConfig from "./ormconfig";

async function initialize() {
  const expressApp = express();
  // expressApp.use(cors());

  const schema = await buildSchema({
    resolvers: [SomethingResolver],
  });
  const typeORM = await createConnection(ormConfig);
  const apolloServer = new ApolloServer({
    schema,
    context: { em: typeORM.createEntityManager() },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { ["request.credentials"]: "same-origin" },
      }),
    ],
  });
  await apolloServer.start();
  // hook apollo into express at path
  apolloServer.applyMiddleware({ app: expressApp, path: "/graphql" });

  // add support for graphql subscriptions, need to hook into raw http server
  const httpServer = createServer(expressApp);
  // apolloServer.installSubscriptionHandlers(httpServer);

  const server = httpServer.listen(3001, () =>
    console.log(
      `\r\n 🚀 Server ready at http://localhost:${3001}/graphql`
      // `\r\n 🚀 Server ready at ws://localhost:${config.PORT}${apolloServer.subscriptionsPath}`
    )
  );
}

initialize();
