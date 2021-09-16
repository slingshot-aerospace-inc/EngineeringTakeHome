import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { SomethingResponse } from "./SomethingResponse";

@Resolver(() => SomethingResponse)
export class SomethingResolver {
  @Query(() => SomethingResponse)
  async getSomething(): Promise<SomethingResponse> {
    const somethingResponse = new SomethingResponse();
    somethingResponse.something = 42;
    return somethingResponse;
  }
}
