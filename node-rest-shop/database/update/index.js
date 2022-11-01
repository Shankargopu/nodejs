const firestore = require('../index');

const db=firestore.collection('products')

const updateData=async(id,name,price)=>{
 const doc= await db.doc(id).get();
 if(doc.exists){
     const data={
         productName:name,
         productPrice:price
     }
     console.log(db.doc(id).set(data)  )
     return db.doc(id).set(data)  
    }
else
{
    return 'No such document is there to update'
}

}

module.exports=updateData;