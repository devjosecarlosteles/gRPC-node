const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = __dirname + "/../../notes.proto" // loado proto config
// const NotesService = grpc.load(PROTO_PATH).NotesService

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

const notes_proto = grpc.loadPackageDefinition(packageDefinition).notes

const client = new notes_proto.NoteService("localhost:50051", 
  grpc.credentials.createInsecure()) // creating calls with the server
  
module.exports = client
