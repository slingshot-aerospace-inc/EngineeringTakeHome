import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Index("match_pkey", ["id"], { unique: true })
@Entity("match")
export class MatchEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  date!: Date;

  @Field(() => String)
  @Column()
  team1: string;

  @Field(() => String)
  @Column()
  team2: string;

  @Field(() => Int)
  @Column()
  team1Score!: number;

  @Field(() => Int)
  @Column()
  team2Score!: number;

  @Field(() => String)
  @Column()
  winner: string;
}
