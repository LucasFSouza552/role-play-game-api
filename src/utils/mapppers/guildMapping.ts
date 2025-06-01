import { createGuildDTO, updateGuildDTO } from "../../DTOS/GuildDTO";
import { Guild } from "../../models/Guild";

export class GuildMapper {

  public static mapGuildToDTO(guild: Guild): Guild {
    return {
        id: guild.id,
      name: guild.name,
      level: guild.level,
      created_at: guild.created_at
    };
  }

  public static mapGuildToDTOList(guilds: Guild[]): Guild[] {
    return guilds.map(guild => this.mapGuildToDTO(guild));
  }

  public static mapCreateGuildToDTO(guild: Guild): createGuildDTO {
    return {
      name: guild.name
    };
  }

  public static mapGuildToUpdateDTO(guild: Guild): updateGuildDTO {
    return {
      id: guild.id,
      name: guild.name,
      level: guild.level,
    };
  }
}
