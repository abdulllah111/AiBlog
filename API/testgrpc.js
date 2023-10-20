// // grpc_tools_node_protoc --js_out=import_style=commonjs,binary:protos --grpc_out=grpc_js:protos -I protos protos/assistantai.proto

// import grpc from "@grpc/grpc-js";
// import * as grpcObject from "./protos/assistantai_grpc_pb.cjs";
// import pkg from "./protos/assistantai_pb.cjs";
// const { PromtRequest } = pkg;

// export const sendMessage = async (req, res) => {
//   try {
//     const client = new grpcObject.TelegramClientServiceClient(
//       "localhost:5023",
//       grpc.credentials.createInsecure()
//     );

//     const request = new PromtRequest();
//     request.setMessage(req.body.message);

//     client.sendMessage(request, async (err, response) => {
//       const text = await response.getResponse();
//       res.json(post);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Ошибка сервера",
//     });
//   }
// };

// // grpc_tools_node_protoc --import_grpc --js_out=import_style=commonjs,binary:protos --grpc_out=grpc_js,import_style=commonjs,import_grpc:protos protos/assistantai.proto


const str = '[{"title": "Как красота и здоровье влияют на наш образ жизни.", "text": "Красота и здоровье."},{"title": "Как красота и здоровье влияют на наш образ жизни.", "text": "Красота и здоровье."},]'
const js = str.replace(/'/g, '"');
console.log(js)

const a = JSON.parse(js)

console.log(a)