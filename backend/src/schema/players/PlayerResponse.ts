import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Player {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  position: string[];

  @Field()
  team: string;

  @Field()
  foot: string;

  @Field()
  rating: number;
}

@ObjectType()
export class PlayerResponse {
  @Field()
  players: Player[];
}
