import "reflect-metadata";
import { Ctx, Query, Resolver } from "type-graphql";
import { PlayersResponse } from "./PlayerResponse";
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
