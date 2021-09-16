import { ApolloServer } from "apollo-server-express";
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { createServer } from "http";

import ormConfig from "./ormconfig";
import { SomethingResolver } from "./schema/something/SomethingResolver";
import { PlayerResolver } from "./schema/players/PlayerResolver";
import cors from "cors";

async function initialize() {
  const expressApp = express();
  expressApp.use(cors());

  expressApp.get("/", (req, res) => res.status(301).redirect("/graphql"));

  const schema = await buildSchema({
    resolvers: [SomethingResolver, PlayerResolver],
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

  const httpServer = createServer(expressApp);

  const server = httpServer.listen(3001, () =>
    console.log(`\r\n 🚀 Server ready at http://localhost:${3001}/graphql`)
  );
}

initialize();
