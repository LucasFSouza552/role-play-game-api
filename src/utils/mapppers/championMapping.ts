import { ChampionDTO, createChampionDTO, updateChampionDTO, updateChampionStatusDTO } from "../../DTOS/ChampionDTO";
import { Champion } from "../../models/Champion";


export class ChampionMapper {
	public static mapChampionToDTO(champion: Champion | ChampionDTO): ChampionDTO {

		return {
			id: champion.id,
			name: champion.name,
			userId: champion.userId,
			hp: champion.hp,
			mp: champion.mp,
			ep: champion.ep,
			sp: champion.sp,
			xp: champion.xp,
			xp_max: champion.xp_max,
			level: champion.level,
			strength: champion.strength,
			dexterity: champion.dexterity,
			vitality: champion.vitality,
			intelligence: champion.intelligence,
			money: champion.money
		};
	}

	public static mapChampionToDTOList(champions: Champion[] | ChampionDTO[]): ChampionDTO[] {
		return champions.map(champion => this.mapChampionToDTO(champion));
	}

	public static mapCreateChampionToDTO(champion: Champion | createChampionDTO): createChampionDTO {
		return {
			name: champion.name.trim(),
			roleId: champion.roleId,
			userId: champion.userId,
			hp: champion.hp,
			mp: champion.mp,
			ep: champion.ep
		};
	}

	public static mapChampionToUpdateDTO(champion: Champion | updateChampionDTO): updateChampionDTO {
		return {
			id: champion.id,
			userId: champion.userId,
			name: champion.name,
            guildId: champion.guildId
		};
	}

		public static mapChampionToUpdateStatusDTO(champion: Champion | updateChampionStatusDTO): updateChampionStatusDTO {
			return {
				id: champion.id,
				userId: champion.userId,
				...(champion.strength && { strength: champion.strength }),
				...(champion.dexterity && { dexterity: champion.dexterity }),
				...(champion.intelligence && { intelligence: champion.intelligence }),
				...(champion.vitality && { vitality: champion.vitality }),
				sp: champion.sp || 0
			};
		}
}
