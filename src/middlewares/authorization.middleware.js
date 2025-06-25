
export const authorization=async (allowedRoles)=>{
    return async(req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)) return res.status(403).json({
            success:false,
            message:'you are not authorized to access this route'
        })
        next()
    }
}