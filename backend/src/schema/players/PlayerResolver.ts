import "reflect-metadata";
import { Ctx, Query, Resolver } from "type-graphql";
import { Player, PlayersResponse } from "./PlayerResponse";
import data from "./data";
import { PlayerEntity } from "./PlayerEntity";
import { Context } from "../../types/Context";

@Resolver(() => PlayersResponse)
export class PlayerResolver {
  @Query(() => PlayersResponse)
  async getPlayers(@Ctx() { em }: Context): Promise<PlayersResponse> {
    const players = await em.getRepository(PlayerEntity).find();

    const playerResponse = new PlayersResponse();
    playerResponse.players = players;
    return playerResponse;
  }
}
