import { Inventory } from "../models/Inventory";
import { Item } from "../models/Item";

// Simulação de repositório em memória (substitua por acesso ao banco de dados real)
const inventories: Inventory[] = [];

/**
 * Serviço para manipulação de inventários.
 */
export class InventoryService {
    /**
     * Busca um inventário pelo ID.
     */
    static getInventoryById(id: number): Inventory | undefined {
        return inventories.find(inv => inv.id === id);
    }

    /**
     * Busca inventário pelo dono.
     */
    static getInventoryByOwner(ownerId: number | string, ownerType: "champion" | "guild" | "shop"): Inventory | undefined {
        return inventories.find(inv => inv.ownerId === ownerId && inv.ownerType === ownerType);
    }

    /**
     * Cria um novo inventário.
     */
    static createInventory(inventory: Inventory): Inventory {
        inventories.push(inventory);
        return inventory;
    }

    /**
     * Adiciona um item ao inventário.
     */
    static addItem(inventoryId: number, item: Item, quantity: number = 1, slot?: string): Inventory | undefined {
        const inventory = this.getInventoryById(inventoryId);
        if (!inventory) return undefined;

        // Verifica se já existe o item
        let invItem = inventory.items.find(i => (i as any).itemId === item.id && (i as any).slot === slot);
        if (invItem) {
            (invItem as any).quantity += quantity;
        } else {
            const newItem = {
                id: Date.now(), // Gera um ID simples (ajuste conforme necessidade)
                itemId: item.id,
                item,
                quantity,
                slot,
                acquiredAt: new Date(),
            };
            (inventory.items as any[]).push(newItem);
        }
        inventory.lastUpdated = new Date();
        return inventory;
    }

    /**
     * Remove um item do inventário.
     */
    static removeItem(inventoryId: number, itemId: number, quantity: number = 1, slot?: string): Inventory | undefined {
        const inventory = this.getInventoryById(inventoryId);
        if (!inventory) return undefined;

        const invItem = inventory.items.find(i => (i as any).itemId === itemId && (i as any).slot === slot);
        if (!invItem) return inventory;

        if ((invItem as any).quantity > quantity) {
            (invItem as any).quantity -= quantity;
        } else {
            inventory.items = inventory.items.filter(i => !((i as any).itemId === itemId && (i as any).slot === slot));
        }
        inventory.lastUpdated = new Date();
        return inventory;
    }

    /**
     * Atualiza a quantidade de moedas do inventário.
     */
    static updateGold(inventoryId: number, amount: number): Inventory | undefined {
        const inventory = this.getInventoryById(inventoryId);
        if (!inventory) return undefined;
        inventory.gold = (inventory.gold || 0) + amount;
        inventory.lastUpdated = new Date();
        return inventory;
    }

    /**
     * Lista todos os inventários.
     */
    static getAllInventories(): Inventory[] {
        return inventories;
    }
}