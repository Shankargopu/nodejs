//     retrieveAll().then((data)=>{
  //         console.log(data) ;
  //         res.status(200).json({
  //         productDetails:data
  //  });
  //     }).catch(err=>{
  //         res.status(500).json({
  //             message:err.message
  //         })
  //     })


  // retrieveById(id).then(data=>{
  //     res.status(200).json({
  //         details:{
  //             data
  //         }
  //     });
  // }).catch(()=>{
  //     const error=new Error('error in fetching the data')
  //     error.status=400;
  //     res.status(error.status||500).json({
  //      err:{
  //     message:error.message
  //      }
  //     })

  // })
  // router.use((error,req,res,next)=>{
  //     res.status(error.status||500).json({
  //         error:{
  //             message:error.message
  //         }
  //     });
  // });

  // insert(product.name,product.price).then((id)=>{
  //     console.log(id);
  //     res.status(200).json({
  //         message:'handling POST requests to /products',

  //         createdProduct:{
  //             productId:id,
  //             product
  // //         }
  //     });
  // })
  // .catch(err=>{
  //     err=new Error('error in  inserting the data');
  //     err.status=500;
  //     next(err);
  // })
  // const productName=req.body.name;
  // const productPrice=req.body.price;
  // updateData(req.params.id,productName,productPrice).then(data=>{
  //     console.log(data);
  // })
  // res.status(200).json({
  //     message:"product updated successfully"
  // });


   // deleteProduct(req.params.id).then(data=>{
  //     res.status(200).json({
  //         message:data
  //     });
  // })
