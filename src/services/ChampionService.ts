import { ChampionRepository } from "../repositories/ChampionReposity";

const championRepo = new ChampionRepository();

export class ChampionService {
    async getAllChampions() {
        return await championRepo.findAll();
      }

      
}