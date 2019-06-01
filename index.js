const MongoClient = require ('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';
const dboper = require('./operations');

MongoClient.connect(url,(err, client)=>{

    assert.equal(err, null);
    
    console.log('Connected success');

    const db = client.db(dbname);
 
    dboper.insertDocument(db, { name: "Vadonut", description: 'Test'}, 'dishes', (result)=>{
        console.log('Insert Document:\n', result.ops);
        
        dboper.findDocument(db, 'dishes', (docs)=>{
            console.log('Found Document:\n', docs);
            
            dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Undated Test'}, 'dishes', (result)=>{
                console.log('Updated doc:\n', result.result);
                
                dboper.findDocument(db, 'dishes', (docs)=>{
                    console.log('Found Document:\n', docs);

                    db.dropCollection('dishes', (err, result) =>{
                        console.log('Dropped Collection: ', result);
                        client.close();
                    });
                });        
                

            });
        });
    })
});