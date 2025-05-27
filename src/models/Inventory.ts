import { Item } from "./Item";

//Inventário padrão, pode ser usado por Champion, Guild ou Shop.
export interface Inventory {
    id: number;                         // ID único do inventário
    ownerId: number | string;           // ID do dono (Champion, Guild, Shop, etc)
    ownerType: "champion" | "guild" | "shop"; // Tipo do dono (Champion, Guild, Shop)
    capacity?: number;                  // Capacidade máxima de itens (opcional)
    money?: number;                     // Moedas armazenadas no inventário (opcional)
    lastUpdated?: Date;                 // Última atualização do inventário (opcional)
}