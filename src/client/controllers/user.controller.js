import { Controller } from "../../public/controller.js";
import { dirname, join } from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath, pathToFileURL } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const userProtoPath = join(__dirname, "..", "..", "public", "proto", "user.proto");
const userProtoFile = protoLoader.loadSync(userProtoPath);
const { UserPackage } = grpc.loadPackageDefinition(userProtoFile);
const userURL = "localhost:3001";
const UserClient = new UserPackage.UserService(userURL, grpc.credentials.createInsecure());

class UserController extends Controller {

    create(req, res, next) {
        try {
            const { firstname, lastname, age } = req.body;
            UserClient.create({ firstname, lastname, age: +age }, (err, result) => {
                if (err) return res.status(500).json({ message: err.message });
                return res.json(result);
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    find(req, res, next) {
        UserClient.find({}, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.json(result);
        })
    }

    findOne(req, res, next) {
        const { id } = req.params;
        UserClient.findOne({ id: +id }, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.json(result);
        })
    }

    update(req, res, next) {
        const { id } = req.params;
        const { firstname, lastname, age } = req.body;
        UserClient.update({ id: +id, firstname, lastname, age: +age }, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.json(result);
        })

    }

    delete(req, res, next) {
        const { id } = req.params;
        UserClient.delete({ id: +id }, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.json(result);
        })
    }

}

export default new UserController();