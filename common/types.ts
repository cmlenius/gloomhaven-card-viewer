import { ParsedUrlQuery } from "querystring";

export interface Card {
  id?: number | string;
  name: number | string;
  image: string;
  imageBack?: string;
}

export type Game = {
  id: string;
  name: string;
  defaultClass: string;
  defaultMonster: string;
};

export type Character = {
  class: string;
  colour: string;
  name: string;
  altName?: string;
  game: string;
  matImage: string;
  matImageBack: string;
  source?: string;
  sheetImage: string;
  base?: boolean;
  hidden?: boolean;
};

export type CharacterAbility = {
  name: string;
  class: string;
  game: string;
  image: string;
  initiative: number;
  level: number;
  imageBack?: string;
  milestone?: boolean;
};

export type Item = {
  id: number;
  name: string;
  game: string;
  source: string;
  image: string;
  cost: number;
  slot: string;
  imageBack?: string;
  consumed?: boolean;
  spent?: boolean;
  prosperity?: number;
};

export type Event = {
  id: number;
  name: number;
  game: string;
  eventType: string;
  image: string;
  imageBack?: string;
  season?: string;
};

export type Monster = {
  id: string;
  name: string;
  game: string;
  statCards: string[];
  abilityCards: string[];
  isVertical: boolean;
};

export type MonsterSearch = {
  monster: Monster;
  monsterList: Option[];
};

export type Option = {
  id: string;
  name: string;
};

export interface Spoilers {
  characters: Set<string>;
  items: Record<string, string | boolean>;
  level: number;
  loading: boolean;
}

export interface CharacterParams extends ParsedUrlQuery {
  game: string;
  character: string;
}

export interface MonsterParams extends ParsedUrlQuery {
  game: string;
  monster: string;
}

export interface GameParams extends ParsedUrlQuery {
  game: string;
}
