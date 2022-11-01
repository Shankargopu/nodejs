const firestore=require('../index');


// const docRef=db.collection('products').doc('samsung');
const add= async (name,price)=>{
  const res=await firestore.collection('products').add({
      ProductName:name,
      ProductPrice:price
  })
//   console.log(res.id);
  return res.id;
};



module.exports=add;