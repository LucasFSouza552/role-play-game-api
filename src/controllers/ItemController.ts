import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";

export class ItemController {
  // Lista todos os itens com filtros opcionais
  static async getAllItems(req: Request, res: Response) {
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
  }

  // Busca um item específico pelo ID
  static async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await ItemService.getItemById(id);

      if (!item) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(`Erro ao buscar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar o item." });
    }
  }

  // Cria um novo item
  static async createItem(req: Request, res: Response) {
    try {
      const item = req.body;

      // Validação dos dados de entrada
      if (
        !item.name ||
        !item.description ||
        item.minPrice == null ||
        item.maxPrice == null
      ) {
        return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
      }
      if (item.minPrice > item.maxPrice) {
        return res.status(400).json({ error: "O preço mínimo não pode ser maior que o preço máximo." });
      }

      const newItem = await ItemService.createItem(item);

      return res.status(201).json(newItem);
    } catch (error) {
      console.error("Erro ao criar o item:", error);
      return res.status(500).json({ error: "Erro ao criar o item." });
    }
  }

  // Atualiza um item existente
  static async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = req.body;

      // Validação dos dados de entrada (opcional, mas recomendado)
      if (item.minPrice != null && item.maxPrice != null && item.minPrice > item.maxPrice) {
        return res.status(400).json({ error: "O preço mínimo não pode ser maior que o preço máximo." });
      }

      const updatedItem = await ItemService.updateItem(id, item);

      if (!updatedItem) {
        return res.status(404).json({ error: "Item não encontrado ou erro ao atualizar." });
      }

      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error(`Erro ao atualizar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao atualizar o item." });
    }
  }

  // Deleta um item existente
  static async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ItemService.deleteItem(id);

      if (!result) {
        return res.status(404).json({ error: "Item não encontrado ou erro ao deletar." });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error(`Erro ao deletar o item com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao deletar o item." });
    }
  }
}