import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { Player, PlayersResponse } from "./PlayerResponse";
import data from "./data";

@Resolver(() => PlayersResponse)
export class PlayerResolver {
  @Query(() => PlayersResponse)
  async getPlayers(): Promise<PlayersResponse> {
    const playerResponse = new PlayersResponse();
    playerResponse.players = data;
    return playerResponse;
  }
}
