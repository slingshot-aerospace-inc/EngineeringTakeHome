import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { PlayerEntity } from "./PlayerEntity";

define(PlayerEntity, () => {
  const player = new PlayerEntity();

  player.name = `${Faker.name.firstName(0)} ${Faker.name.lastName(0)}`;
  player.age = Faker.datatype.number({ min: 18, max: 60 });
  player.position = Faker.random.arrayElements(
    ["LW", "CT", "RW", "ST", "CF", "CAM"],
    Faker.datatype.number({ min: 1, max: 3 })
  );
  player.team = Faker.random.arrayElement([
    "Everton",
    "PSG",
    "Dortmund",
    "Chelsea",
    "Spurs",
    "Man City",
  ]);
  player.foot = Faker.random.arrayElement(["Left", "Right", "Both"]);
  player.rating = Faker.datatype.number(100);

  return player;
});
