const firestore = require('../index');
const db=firestore.collection('products');
const deleteProduct=async(id)=>{

 const doc=  await db.doc(id).get();
//  console.log(doc.data())
 if(doc.exists){
     await db.doc(id).delete();
     return ` product with ${id} is deleted succesfully`
 }
 else
 {
     return `No such document exists`;
 }

 
}


module.exports=deleteProduct;