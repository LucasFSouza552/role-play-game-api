import { ItemType } from "../enums/ItemType";
import { ItemRarity } from "../enums/ItemRarity";

// Estrutura de dados para transferência de informações de Item entre camadas
export interface ItemDTO {
  id?: number; // Gerado pelo banco
  name: string;
  description: string;
  rarity: ItemRarity; // Enum de raridade
  level: number;
  priceMin: number;
  priceMax: number;
  type: ItemType; // Enum de tipo
}