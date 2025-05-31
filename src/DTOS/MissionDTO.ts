import { Mission } from "../models/Mission";

export type createMissionDTO = Omit<Mission, 'id'>; 
export type updateMissionDTO = Required<Pick<Mission, 'id'>> & Partial<Pick<Mission, 'title' | 'description' | 'difficulty' | 'XP' | 'SP' | 'money'>>;
