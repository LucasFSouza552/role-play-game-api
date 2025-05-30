import { Guild } from "../models/Guild";

export type createGuildDTO = Omit<Guild, 'id' | 'created_at'>;
export type updateGuildDTO = Required<Pick<Guild, 'id'>> & Partial<Pick<Guild, 'name' | 'level'>>;
