// Enum para os tipos de itens
export enum ItemType {
    SPELLS = "Spells",
    ARMOUR = "Armour",
    WEPONS = "Wepons",
    POTIONS = "Potions"
}

// Interface para representar um item
export interface Item {
    id: number;           // Identificador único do item
    name: string;         // Nome do item
    description: string;  // Descrição detalhada do item
    rarity: string;       // Raridade do item (ex.: comum, raro, épico)
    level: number;        // Nível necessário para utilizar o item
    priceMin: number;     // Preço mínimo do item
    priceMax: number;     // Preço máximo do item
    type: ItemType;       // Tipo do item (usando o enum ItemType)
}