import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SomethingResponse {
  @Field(() => Number)
  something: number;
}
