import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { PlayerEntity } from "../../schema/players/PlayerEntity";

import players from "./data/players";

export class Players implements Seeder {
  // delete this once/if connection is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(PlayerEntity)
      .values(players)
      .execute();
    await factory(PlayerEntity)().createMany(1000);
  }
}
