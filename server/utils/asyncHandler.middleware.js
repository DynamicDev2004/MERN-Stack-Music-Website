const asyncHandler = (func)=> (async (req, res, next) =>{
   await Promise.resolve(func(req,res,next)).then((res)=>res).catch(
       (error)=>{
       console.log(error)
       next(error)
       }
    )
} )

export default asyncHandler;