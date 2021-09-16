import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@ObjectType()
@Index("something_pkey", ["id"], { unique: true })
@Entity("something")
export class SomethingEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Int)
  @Column()
  something!: number;
}
