import { ItemType } from "../../models/enums/ItemType";
import { ItemRarity } from "../../models/enums/ItemRarity";

//DTO principal para transferência de dados de Item.
export interface ItemDTO {
  name: string;                // Nome do item
  description: string;         // Descrição detalhada
  priceMin: number;            // Preço mínimo
  priceMax: number;            // Preço máximo
  rarity: ItemRarity;          // Raridade (enum)
  type: ItemType;              // Tipo do item (enum)
}

//DTO para criação de item.
export interface ItemCreateDTO {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  rarity: ItemRarity;
  type: ItemType;
  imageUrl?: string;
}

// DTO para atualização de item.
export interface ItemUpdateDTO {
  name?: string;
  description?: string;
  priceMin?: number;
  priceMax?: number;
  rarity?: ItemRarity;
  type?: ItemType;
  imageUrl?: string;
}

export interface ItemAddToShopDTO {
  itemId: number;
  rarity: ItemRarity;
  shopId?: number;
  price?: number;
}