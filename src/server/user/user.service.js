import { dirname, join } from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import userHandler from "./user.handler.js";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const userProtoPath = join(__dirname, "..", "..", "public", "proto", "user.proto");
const userProtoFile = protoLoader.loadSync(userProtoPath);
const { UserPackage } = grpc.loadPackageDefinition(userProtoFile);
const userURL = "localhost:3001";
const server = new grpc.Server;
function grpcServer() {
    server.addService(UserPackage.UserService.service, {
        create: userHandler.create,
        find: userHandler.find,
        findOne: userHandler.findOne,
        update: userHandler.update,
        delete: userHandler.delete,
    })
    server.bindAsync(userURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) throw new Error(err.message);
        // server.start();
    })
}
grpcServer()
