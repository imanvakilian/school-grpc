import { PrismaClient } from "@prisma/client";
import { Controller } from "../../public/controller.js";
const prisma = new PrismaClient();
class ScoreHandler extends Controller {
    #score = prisma.score;
    async create(call, callback) {
        try {
            const { userId, subjectId, rate } = call.request;
            const checkExist = await this.#score.findFirst({ where: { userId, subjectId } });
            if (checkExist) {
                callback({ message: "Score already exists" }, null);
                return;
            }
            await this.#score.create({ data: { userId, subjectId, rate } });
            callback(null, { message: "Score created successfully" });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async find(call, callback) {
        try {
            const scores = await this.#score.findMany({
                where: {},
                select: {
                    rate: true,
                    user: {
                        select: {
                            firstname: true,
                            lastname: true,
                        }
                    },
                    subject: {
                        select: {
                            title: true,
                        }
                    }
                }
            });
            console.log(scores);
            callback(null, { scores })
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async update(call, callback) {
        try {
            const { id, rate } = call.request;
            await this.findOne(id, callback);
            await this.#score.update({ where: { id }, data: { rate } });
            callback(null, { message: "score updated successfully" });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async delete(call, callback) {
        try {
            const { id } = call.request;
            await this.findOne(id, callback);
            await this.#score.delete({ where: { id } });
            callback(null, { message: "score deleted successfully" });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }

    async findOne(id, callback) {
        const score = await this.#score.findFirst({ where: { id } });
        if (!score) {
            callback({ message: "Score not found" }, null);
            return;
        }
        return score;
    }
}

export default new ScoreHandler();