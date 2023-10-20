import grpc from "@grpc/grpc-js";
import * as grpcObject from "../protos/assistantai_grpc_pb.cjs";
import pkg from "../protos/assistantai_pb.cjs";
import { GRPC_CONNECT } from "../configuration.js";

const { PromtRequest } = pkg;

export default async (req, res, next) => {
  try {
    // grpc.waitForClientReady(client, 60 * 1000)
    const client = new grpcObject.TelegramClientServiceClient(
      GRPC_CONNECT,
      grpc.credentials.createInsecure(),
      console.log("Connected to grpc Server")
    );

    const request = new PromtRequest();
    request.setMessage(req.body.message);

    client.sendMessage(request, async (err, response) => {
      const text = await response
        .getResponse()
        .replace(/"/g, "")
        .replace(/'/g, '"');
      if (text === "NoN" || err) {
        return res.status(500).json({
          message: "Не удалось сохранить статьи",
        });
      }
      req.text = JSON.parse(text);
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось созранить статьи",
    });
  }
};
