import { User } from "../models/user.model.js"

export const getCart=async(req,res,next)=>{
    const cart=req.user.cart
    res.status(200).json({
        success:true,
        cart
    })
}

export const addProductToCart=async(req,res,next)=>{
    const {id}=req.params

    const user=await User.findById(req.user._id)

    const cart=user.cart
    cart.products.push(id)
    cart.subtotal=cart.map(item=>item.price).reduce((a,b)=>a+b,0)
    cart.total=cart.subtotal-cart.discount
    user.cart=cart
    await user.save()
    res.status(200).json({
        success:true,
        message:'Product added to cart successfully',
        cart
    })
}

export const removeProductFromCart=async(req,res,next)=>{
    const {id}=req.params

    const user=await User.findById(req.user._id)

    const cart=user.cart
    cart.products=cart.products.filter(item=>item.toString()!==id)

    cart.subtotal=cart.map(item=>item.price).reduce((a,b)=>a+b,0)
    cart.total=cart.subtotal-cart.discount
    user.cart=cart
    await user.save()
    res.status(200).json({
        success:true,
        message:'Product added to cart successfully',
        cart
    })
}

export const clearCart=async(req,res,next)=>{
    const user=await User.findById(req.user._id)
    user.cart.products=[]
    user.cart.subtotal=0
    user.cart.total=0
    await user.save()
    res.status(200).json({
        success:true,
        message:'Cart cleared successfully',
        cart:user.cart
    })
}