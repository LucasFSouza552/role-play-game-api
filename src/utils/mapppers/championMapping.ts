import { ChampionDTO, createChampionDTO } from "../../DTOS/ChampionDTO";
import { Champion } from "../../models/Champion";


export class ChampionMapper {
    public static mapChampionToDTO(champion: Champion | createChampionDTO): createChampionDTO {
        return {
            name: champion.name,
            roleId: champion.roleId,
            userId: champion.userId,
            hp: champion.hp,
            mp: champion.mp,
            ep: champion.ep
        };
    }

    public static mapChampionToDTOList(champions: any[]): any[] {
        return champions.map(champion => this.mapChampionToDTO(champion));
    }

    public static mapCreateChampionToDTO(champion: any): any {
        return {
            name: champion.name,
            role: champion.role,
            level: champion.level,
            userId: champion.userId
        };
    }

    public static mapChampionToUpdateDTO(champion: any): any {
        return {
            id: champion.id,
            name: champion.name,
            role: champion.role,
            level: champion.level
        };
    }
}