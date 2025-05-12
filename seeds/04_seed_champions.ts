import { Knex } from 'knex';
import { v5 as uuidv5 } from 'uuid';

const NAMESPACE = uuidv5.DNS;

export async function seed(knex: Knex): Promise<void> {
  await knex('champions').insert([
    {
      id: uuidv5('Thorgar', NAMESPACE),
      name: 'Thorgar',
      level: 1,
      hp: 0, 
      strength: 20,
      dexterity: 15,
      intelligence: 10,
      vitality: 25,
      money: 100,
      guildId: null,
      roleId: 1,
    },
    {
      id: uuidv5('Elandra', NAMESPACE),
      name: 'Elandra',
      level: 1,
      hp: 0,
      strength: 10,
      dexterity: 15,
      intelligence: 25,
      vitality: 15,
      money: 50,
      guildId: null,
      roleId: 2,
    },
    {
      id: uuidv5('Kael', NAMESPACE),
      name: 'Kael', 
      level: 1,
      hp: 0,
      strength: 15,
      dexterity: 25,
      intelligence: 10,
      vitality: 15,
      money: 75,
      guildId: null,
      roleId: 3,
    },
    {
      id: uuidv5('Seraphina', NAMESPACE),
      name: 'Seraphina',
      level: 1,
      hp: 0,
      strength: 18,
      dexterity: 12,
      intelligence: 15,
      vitality: 20,
      money: 90,
      guildId: null,
      roleId: 4,
    },
    {
      id: uuidv5('Faelar', NAMESPACE),
      name: 'Faelar', 
      level: 1,
      hp: 0,
      strength: 12,
      dexterity: 14,
      intelligence: 22,
      vitality: 18,
      money: 60,
      guildId: null,
      roleId: 5,
    },
  ]);
}
