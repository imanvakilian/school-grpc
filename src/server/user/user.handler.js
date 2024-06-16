import { Controller } from "../../public/controller.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class UserHandler extends Controller {
    #user = prisma.user;
    async create(call, callback) {
        try {
            const { firstname, lastname, age } = call.request;
            const checkExistUser = await this.#user.findFirst({ where: { firstname, lastname } });
            if (checkExistUser) {
                callback(new Error("User already exists"), null);
                return;
            }
            await this.#user.create({ data: { firstname, lastname, age } });
            callback(null, { message: "user created successfully" });
        } catch (error) {
            callback(error.message, null)
        }
    }
    async find(call, callback) {
        const users = await this.#user.findMany({ where: {} });
        callback(null, { users });
    }
    async findOne(call, callback) {
        const { id } = call.request;
        const user = await this.findOneById(id, callback);
        callback(null, user);
    }
    async update(call, callback) {
        const { id, firstname, lastname, age } = call.request;
        await this.#user.findFirst({ where: { id } });
        if (firstname) await this.#user.update({ where: { id }, data: { firstname } });
        if (lastname) await this.#user.update({ where: { id }, data: { lastname } });
        if (age) await this.#user.update({ where: { id }, data: { age } });
        callback(null, { message: "user updated successfully" });
    }
    async delete(call, callback) {
        const { id } = call.request;
        await this.findOneById(id, callback);
        await this.#user.delete({ where: { id } });
        callback(null, { message: "user deleted successfully" });
    }
    async findOneById(id, callback) {
        const user = await this.#user.findFirst({ where: { id } });
        if (!user) {
            callback({ message: "user not found" }, null);
            return;
        }
        // return "user not found";
        return user;
    }
}

export default new UserHandler();