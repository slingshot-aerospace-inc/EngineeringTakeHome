# Backend
This project uses [Apollo Server](https://github.com/apollographql/apollo-server#readme) and [TypeORM](https://github.com/typeorm/typeorm#readme) to implement a GraphQL API endpoint.  It also uses [type-graphql](https://github.com/MichalLytek/type-graphql#readme) to automatically generate type definitions for the GraphQL schema.

## Getting the app running
A lot of work has been done to build this application out in docker containers to use with docker-compose or gitpod.io.  Using those tools is the preferred method to get this app running.

If you want to run this manually or natively you will need to ensure you have Node 14 or later, and a postgres database listening on localhost:5432 with a user/pass of postgres:password.

Install dependencies with `npm install`, then setup the database with `npm run typeorm:migrate` or `npm run resetDB`, finally run the app with `npm run dev`

Once this is up and running you should be able to hit the GraphQL Playground application at the URL that is printed in the console.  If running directly with npm or via docker-compose it should be http://localhost:3001, but if running inside of gitpod.io it will be a special URL that is exposed and printed out (It will be your workspace name URL but prefixed with '3001-').

## Database Container
The app expects a postgres database to be present. it uses the following config via environment variables in [src/config.ts](src/config.ts):
```
  // Database connection params
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: Number(process.env.DB_PORT ?? "5432"),
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASS: process.env.DB_PASS ?? "password",
  DB_NAME: process.env.DB_NAME ?? "postgres",
```
This means it defaults to a connection string of `psql://postgres:password@localhost:5432/postgres`.  If you run with docker-compose the [../docker-compose.yml](docker-compose.yml) file sets up host name environment variable to `postgres` to allow this container to talk to the postgres container, it also sets the postgres container to have a username and password of `postgres:password`.

## TypeORM Database Schema
This project uses [TypeORM](https://github.com/typeorm/typeorm#readme) to handle the database interactions.  TypeORM also sets the database up using source code to define the database schema.

Entities are "things" in TypeORM that are backed by a database.  Entity file paths are configured in [src/ormconfig.ts](src/ormconfig.ts) and is currently set to `  entities: [__dirname + "/schema/**/*Entity{.ts,.js}"],`.

In the `src/schema` folder there are sub directories for `matches` and `players` and inside of these there are files that end in `Entity.ts` that describe the database table and columns.

To modify the database schema you add/remove/edit `src/schema/**/*Entity.ts` files.  For example, you can edit the file `src/schema/PlayerEntity.ts` file and add another column to the table by adding this snippet:
```ts
  @Field(() => String)
  @Column()
  newColumn!: string;
```

The `@Column` decorator indicates to TypeORM that this should be a column, and the `@Field()` decorator indicates to [type-graphql](https://github.com/MichalLytek/type-graphql#readme) that this is a GraphQL field for this object.

To add this new column to the database a migration must first be generated.  This can be done by running the command `npm run typeorm migration:generate -- -n add-new-column` where the parameter after `-n` is the name of the migration.

This just generates a new migration file in the folder `src/database/migrations`.  To run this migration against the database to implement these changes run `npm run typeorm:migration`.

Now the database will have the modified `players` tables with a new column of `newColumn`.

You can verify this by running `psql` to connect to the database and look at the `players` table with `\dt players`.

## GraphQL Resolver Endpoint
Apollo sets up resolver endpoints to allow users to query the API.  An existing resolver exists at [src/schema/players/PlayerResolver.ts](src/schema/players/PlayerResolver.ts).  This resolver utilizes TypeORM to read the database and return the player objects as a GraphQL response defined by the `@Field` decorators in [src/schema/players/PlayerEntity.ts](src/schema/players/PlayerEntity.ts).

This resolver is added to the main Apollo server using [type-graphql](https://github.com/MichalLytek/type-graphql#readme) to automatically generate the schema with types in the file [src/index.ts](src/index.ts) with these lines:
```ts
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
```
