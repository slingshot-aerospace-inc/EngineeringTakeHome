import { EntityManager } from "typeorm";

export interface Context {
  em: EntityManager;
}
