import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { Controller } from "../../public/controller.js";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const scoreProtoPath = join(__dirname, "..", "..", "public", "proto", "score.proto");
const scoreProtoFile = protoLoader.loadSync(scoreProtoPath);
const { ScorePackage } = grpc.loadPackageDefinition(scoreProtoFile);
const scoreURL = "localhost:3003";
const scoreClient = new ScorePackage.ScoreService(scoreURL, grpc.credentials.createInsecure());

class ScoreController extends Controller {
    create(req, res, next) {
        const { userId, subjectId, rate } = req.body;
        scoreClient.create({ userId: +userId, subjectId: +subjectId, rate: +rate }, (err, resault) => {
            if (err) return res.status(500).json(resault);
            return res.json(resault);
        })
    }
    find(req, res, next) {
        scoreClient.find({}, (err, resault) => {
            if (err) return res.status(500).json(resault);
            return res.json(resault);
        })
    }
    update(req, res, next) {
        const { id } = req.params;
        const { rate } = req.body;
        scoreClient.update({ id: +id, rate: +rate }, (err, resault) => {
            if (err) return res.status(500).json(resault);
            return res.json(resault);
        })
    }
    delete(req, res, next) {
        const { id } = req.params;
        scoreClient.delete({ id: +id }, (err, resault) => {
            if (err) return res.status(500).json(resault);
            return res.json(resault);
        })
    }
}

export default new ScoreController();