const client = require("./client-grpc") // import module client

/**
 * calling the List RPC method and returning the data 
 * to the console
 */

/**
 * the list method is the same as that defined in the 
 * .proto file and in the creation of the service in the index.js file
 */

client.list({}, (err, notes) => {
  if(!err) {
    console.log(notes)
  } else {
    console.error(err)
  }
})