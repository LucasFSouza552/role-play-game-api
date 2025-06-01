import { createMissionDTO, missionDTO, updateMissionDTO } from "../../DTOS/MissionDTO";
import { Mission } from "../../models/Mission";

export class MissionMapper {

    public static mapCreateMissionToDTO(mission: createMissionDTO): createMissionDTO {
        return {
            title: mission.title,
            description: mission.description,
            difficulty: mission.difficulty,
            XP: mission.XP,
            SP: mission.SP,
            money: mission.money
        }
    }

    public static mapUpdateMissionToDTO(mission: Mission | updateMissionDTO): updateMissionDTO {
        return {
            id: mission.id!,
            ...(mission.title && {title: mission.title}),
            ...(mission.description && {description: mission.description}),
            ...(mission.difficulty && {difficulty: mission.difficulty}),
            ...(mission.XP && {XP: mission.XP}),
            ...(mission.SP && {SP: mission.SP}),
            ...(mission.money && {money: mission.money})
        }
    }

    public static mapMissionToDTO(mission: Mission | missionDTO): missionDTO {
        return {
            title: mission.title,
            description: mission.description,
            difficulty: mission.difficulty,
            money: mission.money,
            XP: mission.XP,
            SP: mission.SP
        }
    }

    public static mapMissionToDTOList(missions: Mission[] | missionDTO[]): missionDTO[] {
        return missions.map(mission => this.mapMissionToDTO(mission));
    }
}
