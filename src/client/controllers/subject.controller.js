import { Controller } from "../../public/controller.js";
import { dirname, join } from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const subejctProtoPath = join(__dirname, "..", "..", "public", "proto", "subject.proto");
const subjectProtoFile = protoLoader.loadSync(subejctProtoPath);
const { SubjectPackage } = grpc.loadPackageDefinition(subjectProtoFile);
const subjectURL = "localhost:3002";
const subjectClient = new SubjectPackage.SubjectService(subjectURL, grpc.credentials.createInsecure());
class SubjectController extends Controller {
    create(req, res, next) {
        const { title } = req.body;
        subjectClient.create({ title }, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.json(result);
        })
    }
    find(req, res, next) {
        subjectClient.find({}, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.json(result);
        })
    }
    findOne(req, res, next) {
        const { id } = req.params;
        subjectClient.findOne({ id: +id }, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.json(result);
        })
    }
    update(req, res, next) {
        const { id } = req.params;
        const { title } = req.body;
        subjectClient.update({ id: +id, title }, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.json(result);
        })
    }
    delete(req, res, next) {
        const { id } = req.params;
        subjectClient.delete({ id: +id }, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.json(result);
        })
    }
}

export default new SubjectController();