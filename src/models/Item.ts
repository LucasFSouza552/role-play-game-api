// Importando o enum ItemsType existente
import { ItemsType } from '../models/ItemType'; // Atualize o caminho para o correto

export enum ItemRarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary"
}

// Interface para representar um item
export interface Item {
    id: number;           // Identificador único do item
    name: string;         // Nome do item
    description: string;  // Descrição detalhada do item
    rarity: ItemRarity;   // Raridade do item (usando o enum ItemRarity)
    level: number;        // Nível necessário para utilizar o item
    priceMin: number;     // Preço mínimo do item
    priceMax: number;     // Preço máximo do item
    type: ItemsType;      // Tipo do item (usando o enum ItemsType existente)
}
