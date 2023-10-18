// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var assistantai_pb = require('./assistantai_pb.cjs');

function serialize_assistantai_PromtRequest(arg) {
  if (!(arg instanceof assistantai_pb.PromtRequest)) {
    throw new Error('Expected argument of type assistantai.PromtRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_assistantai_PromtRequest(buffer_arg) {
  return assistantai_pb.PromtRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_assistantai_PromtResponse(arg) {
  if (!(arg instanceof assistantai_pb.PromtResponse)) {
    throw new Error('Expected argument of type assistantai.PromtResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_assistantai_PromtResponse(buffer_arg) {
  return assistantai_pb.PromtResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TelegramClientServiceService = exports.TelegramClientServiceService = {
  sendMessage: {
    path: '/assistantai.TelegramClientService/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: assistantai_pb.PromtRequest,
    responseType: assistantai_pb.PromtResponse,
    requestSerialize: serialize_assistantai_PromtRequest,
    requestDeserialize: deserialize_assistantai_PromtRequest,
    responseSerialize: serialize_assistantai_PromtResponse,
    responseDeserialize: deserialize_assistantai_PromtResponse,
  },
};

exports.TelegramClientServiceClient = grpc.makeGenericClientConstructor(TelegramClientServiceService);
