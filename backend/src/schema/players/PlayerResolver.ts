import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { Player, PlayerResponse } from "./PlayerResponse";
import data from "./data";

@Resolver(() => PlayerResponse)
export class PlayerResolver {
  @Query(() => PlayerResponse)
  async getPlayers(): Promise<PlayerResponse> {
    const playerResponse = new PlayerResponse();
    playerResponse.players = data;
    return playerResponse;
  }
}
