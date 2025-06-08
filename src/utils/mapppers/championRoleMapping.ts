import { ChampionRole } from "../../models/ChampionRole";
import { createChampionRoleDTO, updateChampionRoleDTO } from "../../DTOS/ChampionRoleDTO";

export class ChampionRoleMapper {
    
    public static mapCreateRoleToDTO(role: ChampionRole): createChampionRoleDTO {
        return {
            name: role.name,
            description: role.description,
            hp: role.hp,
            mp: role.mp,
            ep: role.ep
        }
    }

    public static mapUpdateRoleToDTO(role: ChampionRole): updateChampionRoleDTO {
        return {
            id: role.id,
            ...(role.name && { name: role.name }),
            ...(role.description && { description: role.description }),
            ...(role.hp !== undefined && { hp: role.hp }),
            ...(role.mp !== undefined && { mp: role.mp }),
            ...(role.ep !== undefined && { ep: role.ep })
        }
    }
}   