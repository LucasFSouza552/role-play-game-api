import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";

export const ItemController = {
  // Lista todos os itens com filtros opcionais
  async getAllItems(req: Request, res: Response) {
    try {
      const { name, minPrice, maxPrice } = req.query;
      const filter = {
        name: name as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      };
      const items = await ItemService.getAllItems(filter);
      return res.status(200).json(items);
    } catch (error) {
      console.error("Erro ao listar itens:", error);
      return res.status(500).json({ error: "Erro ao listar itens." });
    }
  },

  // Busca um item específico pelo ID
  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await ItemService.getItemById(id);

      if (!item || "error" in item) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(`Erro ao buscar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar o item." });
    }
  },

  // Cria um novo item
  async createItem(req: Request, res: Response) {
    try {
      const item = req.body;
      const newItem = await ItemService.createItem(item);

      if (!newItem || "error" in newItem) {
        return res.status(400).json({ error: "Erro ao criar o item. Verifique os dados enviados." });
      }

      return res.status(201).json(newItem);
    } catch (error) {
      console.error("Erro ao criar o item:", error);
      return res.status(500).json({ error: "Erro ao criar o item." });
    }
  },

  // Atualiza um item existente
  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = req.body;
      const updatedItem = await ItemService.updateItem(id, item);

      if (!updatedItem || "error" in updatedItem) {
        return res.status(404).json({ error: "Item não encontrado ou erro ao atualizar." });
      }

      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error(`Erro ao atualizar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao atualizar o item." });
    }
  },

  // Deleta um item existente
  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ItemService.deleteItem(id);

      if (!result || "error" in result) {
        return res.status(404).json({ error: "Item não encontrado ou erro ao deletar." });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error(`Erro ao deletar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao deletar o item." });
    }
  }
};