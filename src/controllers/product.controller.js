import Product from "../models/product.model.js";
import Vendor from "../models/vendor.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { productCategories } from "../utils/product-categories.enum.js";


export const addProduct=catchAsync(async(req,res,next)=>{
    const {name,description,price,vendorId,category}=req.body
    const owner=req.user._id
    if(!name || !description || !price || !vendorId)
        return next(new AppError('All fields are required', 400));

    const vendor=await Vendor.findById(vendorId)
    if(!vendor) 
        return next(new AppError('Vendor not found',404))
    if(vendor.owner.toString() !== owner.toString())
        return next(new AppError('You are not authorized to add products to this vendor',403))

    if(category && !Object.values(productCategories).includes(category)){
        const availableCategories=Object.values(productCategories).join(', ')
        return next(new AppError('Invalid category selected. Available categories are: '+availableCategories,400))
    }

    const isProductExists=await Product.findOne({name})
    if(isProductExists) 
        return next(new AppError('Product already exists',400))

    const product=new Product({name,description,price,owner,vendorId:vendor._id,category})
    await product.save()
    res.status(201).json({
        success:true,
        message:'Product added successfully',
        product
    })
})

