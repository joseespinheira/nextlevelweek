import { Request, Response } from 'express';
import knex from "../database/connection";

class PointsController {
    async index(request: Request, response: Response) {
        // filtros vem do query
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.2.74:3333/uploads/${point.image}`
                };
            })


        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: "Ponto não encontrado" });
        }

        const items = await await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');

            const serializedPoints = {
                    ...point,
                    image_url: `http://192.168.2.74:3333/uploads/${point.image}`
            }
        return response.json({ point: serializedPoints, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();
        // console.log("chegou");
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });
        console.log(pointItems);


        await trx('points_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    }

}

export default PointsController;