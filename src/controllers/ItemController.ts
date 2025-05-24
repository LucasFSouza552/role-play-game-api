import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { ItemType } from "../models/enums/ItemType";
import { ItemDTO } from "../DTOS/Itens/ItemDTO";

const itemService = new ItemService();
// Controller responsável por gerenciar requisições relacionadas a itens
export class ItemController {
  // Lista todos os itens, com filtros opcionais por nome e preço
  async getAllItems(req: Request, res: Response) {
    try {
      const { name, minPrice, maxPrice } = req.query;
      const filter = {
        name: name as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      };
      const items = await itemService.getAllItems(filter);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar itens." });
    }
  }

  // Busca um item pelo ID
  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.getItemById(id);
      if (!item) {
        res.status(404).json({ error: "Item não encontrado." });
        return;
      }
      res.status(200).json(item);
    } catch {
      res.status(500).json({ error: "Erro ao buscar o item." });
    }
  }

  // Cria um novo item, validando campos obrigatórios e enums
  async createItem(req: Request, res: Response) {
    try {
      const item: ItemDTO = req.body;

      // Validação dos campos obrigatórios
      if (
        !item.name ||
        !item.description ||
        item.priceMin == null ||
        item.priceMax == null ||
        !item.type
      ) {
        res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
        return;
      }

      // Validação dos enums
      const validTypes = Object.values(ItemType) as string[];
      if (!validTypes.includes(item.type)) {
        res.status(400).json({ error: "Tipo de item inválido." });
        return;
      }

      // Regra de negócio: preço mínimo não pode ser maior que o máximo
      if (item.priceMin > item.priceMax) {
        res.status(400).json({ error: "O preço mínimo não pode ser maior que o preço máximo." });
        return;
      }

      const newItem = await itemService.createItem(item);
      res.status(201).json(newItem);
    } catch {
      res.status(500).json({ error: "Erro ao criar o item." });
    }
  }

  // Atualiza um item existente, validando regras de negócio
  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item: ItemDTO = req.body;

      // Validação de preço mínimo e máximo
      if (item.priceMin != null && item.priceMax != null && item.priceMin > item.priceMax && item.priceMin !== item.priceMax) {
        res.status(400).json({ error: "O preço mínimo não pode ser maior que o preço máximo." });
        return;
      }

      // Validação dos enums, se enviados
      const validTypes = Object.values(ItemType) as string[];
      if (item.type && !validTypes.includes(item.type)) {
        res.status(400).json({ error: "Tipo de item inválido." });
        return;
      }

      const updatedItem = await itemService.updateItem(id, item);
      if (!updatedItem) {
        res.status(404).json({ error: "Item não encontrado ou erro ao atualizar." });
        return;
      }
      res.status(200).json(updatedItem);
    } catch {
      res.status(500).json({ error: "Erro ao atualizar o item." });
    }
  }

  // Deleta um item pelo ID
  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await itemService.deleteItem(id);
      if (!result) {
        res.status(404).json({ error: "Item não encontrado ou erro ao deletar." });
        return;
      }
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Erro ao deletar o item." });
    }
  }
}