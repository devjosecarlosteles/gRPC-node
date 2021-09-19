const grpc = require("grpc")
const PROTO_PATH = "../../notes.proto" // loado proto config
const NotesService = grpc.load(PROTO_PATH).NotesService

const client = new NotesService("loacalhost:50051", 
  grpc.credentials.createInsecure()) // creating calls with the server

module.exports = client
