const firestore = require('../index');
const db=firestore.collection('products');
const retrieveById=async(id)=>{
  const doc=await db.doc(id).get();
  if(!doc.exists){
      return 'No such document';
  }
  else{
      return doc.data();
  }
}

const retrieveAll=async()=>{
let data={};
const snapShot=await firestore.collection('products').get();
if(snapShot.docs.length > 0)
{
snapShot.forEach(doc=>{
    // console.log(doc.data());
    data[doc.id]=doc.data()
    

})
    return data
}
else
{
    return 'No documents exist in collection'
}
}



module.exports={retrieveById,retrieveAll};