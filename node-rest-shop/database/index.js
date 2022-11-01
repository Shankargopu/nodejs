const { initializeApp,cert } = require('firebase-admin/app');
const {getFirestore} =require('firebase-admin/firestore');

const serviceAccount=require('../service-account.json')
// const firebaseConfig=({
//     credential: applicationDefault(),
//     databaseURL: 'https://node-example-42697-default-rtdb.firebaseio.com'
// });
initializeApp({
    credential:cert(serviceAccount)
})

// const app=initializeApp(firebaseConfig);
const db=getFirestore();

module.exports= db;






