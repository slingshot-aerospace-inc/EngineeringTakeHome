import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@ObjectType()
@Index("player_pkey", ["id"], { unique: true })
@Entity("player")
export class PlayerEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Int)
  @Column()
  age!: number;

  @Field(() => [String])
  @Column("simple-array")
  position!: string[];

  @Field(() => String)
  @Column()
  team!: string;

  @Field(() => String)
  @Column()
  foot!: string;

  @Field(() => Int)
  @Column()
  rating!: number;
}
