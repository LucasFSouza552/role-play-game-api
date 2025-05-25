import { Mission } from "../models/Mission";

export type createMissionDTO = Required<Pick<Mission, 'title' | 'description' | 'difficulty' | 'targetDate'>> & Partial<Pick<Mission, 'XP' | 'SP' | 'money'>>; 
export type updateMissionDTO = Required<Pick<Mission, 'id'>> & Partial<Pick<Mission, 'title' | 'description' | 'difficulty' | 'targetDate' | 'XP' | 'SP' | 'money'>>;
