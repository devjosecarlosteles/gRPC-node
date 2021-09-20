const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = __dirname + "/../notes.proto"

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const notesProto = grpc.loadPackageDefinition(packageDefinition).notes

/**
 * Object that we will upload to our server. 
 * Note that it has the properties of our .proto file 
 * (id, title and content).
 */
const notes = [
  { id: '1', title: 'note1', content: 'Content 1' },
  { id: '2', title: 'note2', content: 'Content 2' },
]   

const server = new grpc.Server() // gRPC server creation

function List(_, callback) {
  callback(null, { notes })
}

// we are passing the .proto file to the server
server.addService(notesProto.NoteService.service, { List })

// uploading the server on port 50051
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("server running in localhost:50051")
  server.start()
})