
const myURI = 'mongodb+srv://Fredy93Rubio:Abecedario68@cluster0.i82krha.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';


const URI = process.env.MONGO_URI || myURI;

const mongoose = require('mongoose');

mongoose.connect(URI, {
  // sets the name of the COLLECTION in our Cluster in Mongo-Atlas
  dbName: 'Message'
});

mongoose.connection.once('open', () => console.log('Connected to Mongo')); 

const Schema = mongoose.Schema;
// set the message Schema with the desired properties
const messageSchema = new Schema({
  message: {type: String, required: true},
  password: {type: String, required: true},
  created_at: { type: Date, default: Date.now },
});

// mongoose.model("Name of the sub-list inside the collection", Name of the Schema you want to declare under that first string) 
const Message = mongoose.model('listOfMessages', messageSchema);

module.exports = Message; // <-- export your model