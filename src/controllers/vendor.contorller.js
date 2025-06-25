
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { userRoles } from "../utils/user-roles.enum.js"

export const addVendor = catchAsync(async (req, res, next) => {
    const { ownerId } = req.user._id
    const { name, description } = req.body

    if (!name || !description)
        return next(new AppError('All fields are required', 400));

    const owner = await User.findById(ownerId)
    if (owner.role !== userRoles.VENDOR)
        await User.findByIdAndUpdate(ownerId, { role: userRoles.VENDOR })

    const vendor = new Vendor({ name, description, owner: owner._id })
    await vendor.save()

    res.status(201).json({
        success: true,
        message: 'Vendor added successfully',
        vendor
    })
})


export const getVendors = catchAsync(async (req, res, next) => {
    const vendors = await Vendor.find()
    res.status(200).json({
        success: true,
        vendors
    })
})

export const getVendorById = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const vendor = await Vendor.findById(id)
    res.status(200).json({
        success: true,
        vendor
    })
})

export const updateVendorById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body
    const ownerId = req.user._id
    if (!name && !description)
        return next(new AppError('At least one field is required', 400));

    const vendor = await Vendor.findById(id)
    if (!vendor)
        return next(new AppError('Vendor not found', 404));

    if (vendor.owner.toString() !== ownerId)
        return next(new AppError('You are not authorized to update this vendor', 403));

    if (name) vendor.name = name
    if (description) vendor.description = description

    await vendor.save()
    res.status(200).json({
        success: true,
        message: 'Vendor updated successfully',
        vendor
    })
})

export const deleteVendorById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const ownerId = req.user._id

    const vendor = await Vendor.findById(id)
    if (!vendor)
        return next(new AppError('Vendor not found', 404));

    if (vendor.owner.toString() !== ownerId)
        return next(new AppError('You are not authorized to delete this vendor', 403));

    await vendor.remove()
    res.status(200).json({
        success: true,
        message: 'Vendor deleted successfully'
    })
})  