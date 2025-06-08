import { Mission } from "../models/Mission";

export type createMissionDTO = Omit<Mission, 'id' | 'created_at'>; 
export type updateMissionDTO = Required<Pick<Mission, 'id'>> & Partial<Pick<Mission, 'title' | 'description' | 'difficulty' | 'xp' | 'sp' | 'money'>>;
export type missionDTO = Omit<Mission, 'id' | 'created_at'> & Required<Pick<Mission, 'title' | 'description' | 'difficulty' | 'money'>> & Partial<Pick<Mission, 'sp' | 'xp'>>;;
