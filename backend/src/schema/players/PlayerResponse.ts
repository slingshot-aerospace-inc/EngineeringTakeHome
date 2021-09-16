import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Player {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field(() => [String])
  position: string[];

  @Field()
  team: string;

  @Field()
  foot: string;

  @Field()
  rating: number;
}

@ObjectType()
export class PlayersResponse {
  @Field(() => [Player])
  players: Player[];
}
