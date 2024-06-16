import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import socreHandler from "./socre.handler.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const scoreProtoPath = join(__dirname, "..", "..", "public", "proto", "score.proto");
const scoreProtoFile = protoLoader.loadSync(scoreProtoPath);
const { ScorePackage } = grpc.loadPackageDefinition(scoreProtoFile);
const scoreURL = "localhost:3003";
const server = new grpc.Server;
function scoreService() {
    server.addService(ScorePackage.ScoreService.service, {
        create: socreHandler.create,
        find: socreHandler.find,
        update: socreHandler.update,
        delete: socreHandler.delete,
    });
    server.bindAsync(scoreURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return err;
    });
}
scoreService()