const grpc = require("grpc")
const notesProto = grpc.load("../notes.proto") // load proto config

/**
 * Object that we will upload to our server. 
 * Note that it has the properties of our .proto file 
 * (id, title and content).
 */
const notes = [
  { id: "1", title: "note1", content: "Content 1" },
  { id: "2", title: "note2", content: "Content 2" },
]

const server = new grpc.Server() // gRPC server creation

// we are passing the .proto file to the server
server.addService(notesProto.NoteService.service, {
  list: (_, callback) => {
    callback(null, notes)
  }
})

// uploading the server on port 50051
server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
console.log("Server running at http://127.0.0.1:50051")
server.start()