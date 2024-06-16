import { PrismaClient } from "@prisma/client";
import { Controller } from "../../public/controller.js";
const prisma = new PrismaClient();
class SubjectHandler extends Controller {
    #subject = prisma.subject;
    async create(call, callback) {
        try {
            const { title } = call.request;
            await this.checkExist(title, callback);
            await this.#subject.create({ data: { title } });
            callback(null, { message: 'Subject created successfully' });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async find(call, callback) {
        try {
            const subjects = await this.#subject.findMany({ where: {} });
            callback(null, { subjects });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async findOne(call, callback) {
        try {
            const { id } = call.request;
            const subject = await this.findOneById(id, callback);
            callback(null, subject);
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async update(call, callback) {
        try {
            const { id, title } = call.request;
            await this.findOneById(id, callback);
            if (title) await this.#subject.update({ where: { id }, data: { title } });
            callback(null, { message: "subject updated successfully" });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }
    async delete(call, callback) {
        try {
            const { id } = call.request;
            await this.findOneById(id, callback);
            await this.#subject.delete({ where: { id } });
            callback(null, { message: "subject deleted successfully" });
        } catch (error) {
            callback({ message: error.message }, null);
        }
    }

    async checkExist(title, callback) {
        const subejct = await this.#subject.findFirst({ where: { title } });
        if (subejct) callback({ message: "subject already exist" }, null);
        return;
    }

    async findOneById(id, callback) {
        const subject = await this.#subject.findFirst({ where: { id } });
        if (!subject) {
            callback({ message: "user not found" }, null);
            return;
        }
        return subject;
    }
}
export default new SubjectHandler();