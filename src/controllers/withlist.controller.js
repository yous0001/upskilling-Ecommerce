import WithList from "../models/with-list.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const addProductToWithList = catchAsync(async (req, res, next) => {
    const { id } = req.params

    let withlist = await WithList.findOne({ user: req.user._id })
    if (!withlist)
        withlist = await WithList.create({ user: req.user._id, products: [] })

    withlist.products.push(id)
    await withlist.save()
    res.status(200).json({
        success: true,
        message: 'Product added to withlist successfully',
        withlist
    })

})

export const removeProductFromWithList = catchAsync(async (req, res, next) => {
    const { id } = req.params

    let withlist = await WithList.findOne({ user: req.user._id })

    if (!withlist)
        return next(new AppError('product not found in wishedlist', 404))
    if (!withlist.products.includes(id))
        return next(new AppError('product not found in wishedlist', 404))

    withlist.products = withlist.products.filter(product => product.toString() !== id)
    await withlist.save()
    res.status(200).json({
        success: true,
        message: 'Product removed from withlist successfully',
        withlist
    })
})

export const getWithList = catchAsync(async (req, res, next) => {
    const withlist = await WithList.findOne({ user: req.user._id }).populate('products')

    if (!withlist) {
        return res.status(200).json({
                success: true,
                withlist: []
        })
    }
    res.status(200).json({
        success: true,
        withlist
    })
})