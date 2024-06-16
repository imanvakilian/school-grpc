import { dirname, join } from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import subjectHandler from "./subject.handler.js";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const subejctProtoPath = join(__dirname, "..", "..", "public", "proto", "subject.proto");
const subjectProtoFile = protoLoader.loadSync(subejctProtoPath);
const { SubjectPackage } = grpc.loadPackageDefinition(subjectProtoFile);
const subjectURL = "localhost:3002";
const server = new grpc.Server;
function subjectService() {
    server.addService(SubjectPackage.SubjectService.service, {
        create: subjectHandler.create,
        find: subjectHandler.find,
        findOne: subjectHandler.findOne,
        update: subjectHandler.update,
        delete: subjectHandler.delete,
    });
    server.bindAsync(subjectURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return err;
    })
}
subjectService();