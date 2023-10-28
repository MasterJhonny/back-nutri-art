const { config } = require('./keys');

// import modules
const mongoose = require('mongoose');
const db = require('mongoose');

// import model database
const schemaUser = require('./model.users')
const schemaMaterial = require('./model.material')
const schemaOperations = require('./model.operations')
const schemaEmploye = require('./model.employes')


//  created model 
const ModelUser = mongoose.model('users', schemaUser);
const ModelMaterial = mongoose.model('material', schemaMaterial);
const ModelOperations = mongoose.model('operations', schemaOperations);
const ModelEmploye = mongoose.model('employes', schemaEmploye);


// destructurin config
const { user, password, database } = config;

// definid uri
const URI = `mongodb+srv://${user}:${password}@cluster0.4c64jok.mongodb.net/?retryWrites=true&w=majority`


// conected database
db.Promise = global.Promise;
db.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('database yes!!'))
.catch(err => console.error('[DATA BASE ERROR]', err))

module.exports = { db, ModelUser, ModelMaterial, ModelOperations, ModelEmploye }
