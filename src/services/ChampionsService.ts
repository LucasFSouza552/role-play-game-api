import { ChampionMapper } from './../utils/mapppers/championMapping';
import { FilterChampion } from "../models/Filters";
import { ChampionRole } from "../models/ChampionRole";
import { championRepo, roleRepo, skillRepo, championInventoryRepo, itemsRepo } from "../repositories/RepositoryManager";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ChampionDTO, createChampionDTO, updateChampionDTO, updatedChampionStatusDTO } from "../DTOS/ChampionDTO";
import { Inventory } from '../models/Inventory';
import { InventoryItens } from '../models/InventoryItens';
import { ThrowsError } from '../errors/ThrowsError';
import { ItemRarity } from '../models/enums/ItemRarity';

export class ChampionService implements ServiceInterface<createChampionDTO, updateChampionDTO, ChampionDTO> {

	async getAll(filter: FilterChampion): Promise<ChampionDTO[]> {
		try {
			const champions = await championRepo.getAll(filter);
			if (!champions) {
				throw new ThrowsError("Champions not found", 404);
			}
			return champions;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getById(id: number, userId: number): Promise<ChampionDTO> {
		try {
			const champion: ChampionDTO = await championRepo.getById(id, userId);
			if (!champion) {
				throw new ThrowsError("Champion not found", 404);
			}
			return champion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(champion: createChampionDTO): Promise<ChampionDTO> {

		try {
			const roleId = champion.roleId;
			const roleExists: ChampionRole = await roleRepo.getById(roleId);

			if (!roleExists) {
				throw new ThrowsError("Role not found", 404);
			}

			const newChampion: createChampionDTO = ChampionMapper.mapCreateChampionToDTO({
				name: champion.name,
				userId: champion.userId,
				roleId: roleExists.id,
				hp: roleExists.hp,
				ep: roleExists.ep,
				mp: roleExists.mp
			});

			const createdChampion: ChampionDTO = await championRepo.create(newChampion);

			const RetrievedChampion: ChampionDTO = await championRepo.getById(createdChampion.id, champion.userId);
			if (!RetrievedChampion) {
				throw new ThrowsError("Champion not found", 404);
			}
			return RetrievedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(champion: updateChampionDTO): Promise<ChampionDTO> {
		try {
			const updatedChampion = await championRepo.update(champion);
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async updateChampionStatus(champion: updatedChampionStatusDTO) {
		try {
			const updatedChampion = await championRepo.updateStatus(champion);
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async updateChampionGuild(champion: updateChampionDTO) {
		try {
			const updatedChampion = await championRepo.updateGuild(champion);
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion; 
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(championId: number, userId: number): Promise<boolean> {
		try {
			const deletedChampion = await championRepo.delete(championId, userId);
			if (!deletedChampion) {
				throw new ThrowsError("Champion not deleted", 404);
			}
			return deletedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async addSkill(championId: number, skillId: number) {
		try {
			await championRepo.addSkill(championId, skillId);
			const skill = await skillRepo.getById(skillId);
			return skill;
		} catch (error) {
			console.error(error);
			throw new Error('Error adding skill to champion');
		}
	}

	async getSkills(ChampionId: number) {
		try {
			const skills = await championRepo.getSkills(ChampionId);
			if (!skills) {
				throw new ThrowsError("Skills not found", 404);
			}
			return skills;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getSkillById(skillId: number) {
		try {
			const skill = await skillRepo.getById(skillId);
			if (!skill) {
				throw new ThrowsError("Skill not found", 404);
			}
			return skill;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
		}
	}

	async getInventory(championId: number, userId: number) {
		try {
			const inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId);
			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			return inventory;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async createInventoryItem(championId: number, userId: number, itemId: number, quantity: number, price: number, rarity: string): Promise<InventoryItens> {
		try {

			const item = await itemsRepo.getById(itemId);
			if(!item) {
				throw new ThrowsError("Item not found", 404);
			}

			const rarityValues = Object.values(ItemRarity);

			if(!rarityValues.includes(rarity as ItemRarity)) {
				throw new ThrowsError("Invalid rarity", 400);
			}

			const inventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId);

			if(!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}

			const newItem: InventoryItens = await championInventoryRepo.createInventoryItem(inventory.id, itemId, quantity, price, rarity);
			return newItem;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async updateInventoryItem(championId: number, userId: number, itemId: number, quantity?: number, price?: number): Promise<InventoryItens> {
		try {
			const inventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId);

			if(!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}

			const item: InventoryItens = await championInventoryRepo.updateInventoryItem(inventory.id, itemId, quantity, price);
			if (!item) {
				throw new ThrowsError("Item not updated", 404);
			}
			return item;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async removeInventoryItem(championId: number, userId: number, itemId: number): Promise<boolean> {
		try {

			const inventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId);

			if(!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}

			const removedItem = await championInventoryRepo.removeInventoryItem(inventory.id, itemId);
			if (!removedItem) {
				throw new ThrowsError("Item not removed", 404);
			}
			return removedItem;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

}
