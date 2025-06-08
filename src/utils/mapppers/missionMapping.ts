import { createMissionDTO, missionDTO, updateMissionDTO } from "../../DTOS/MissionDTO";
import { Mission } from "../../models/Mission";

export class MissionMapper {

    public static mapCreateMissionToDTO(mission: createMissionDTO): createMissionDTO {
        return {
            title: mission.title,
            description: mission.description,
            difficulty: mission.difficulty,
            xp: mission.xp,
            sp: mission.sp,
            money: mission.money
        }
    }

    public static mapUpdateMissionToDTO(mission: Mission | updateMissionDTO): updateMissionDTO {
        return {
            id: mission.id!,
            ...(mission.title && {title: mission.title}),
            ...(mission.description && {description: mission.description}),
            ...(mission.difficulty && {difficulty: mission.difficulty}),
            ...(mission.xp && {xp: mission.xp}),
            ...(mission.sp && {sp: mission.sp}),
            ...(mission.money && {money: mission.money})
        }
    }

    public static mapMissionToDTO(mission: Mission | missionDTO): missionDTO {
        return {
            title: mission.title,
            description: mission.description,
            difficulty: mission.difficulty,
            money: mission.money!,
            xp: mission.xp!,
            sp: mission.sp!
        }
    }

    public static mapMissionToDTOList(missions: Mission[] | missionDTO[]): missionDTO[] {
        return missions.map(mission => this.mapMissionToDTO(mission));
    }
}
