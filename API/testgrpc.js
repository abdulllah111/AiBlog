// grpc_tools_node_protoc --js_out=import_style=commonjs,binary:protos --grpc_out=grpc_js:protos -I protos protos/assistantai.proto

import grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
// import grpcObject from './protos/assistantai_grpc_pb.js';
// const grpcObject = require("./protos/assistantai_grpc_pb");
import * as grpcObject from './protos/assistantai_grpc_pb.cjs';
import pkg from './protos/assistantai_pb.cjs';
const {PromtRequest} = pkg;



const client = new grpcObject.TelegramClientServiceClient(
  "localhost:5023",
  grpc.credentials.createInsecure()
);

const request = new PromtRequest();
request.setMessage('Два заголовка по ключевым словам: Красота, здоровье');

client.sendMessage(request, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }

  const text = response.getResponse();

  console.log(text);
});

// grpc_tools_node_protoc --import_grpc --js_out=import_style=commonjs,binary:protos --grpc_out=grpc_js,import_style=commonjs,import_grpc:protos protos/assistantai.proto