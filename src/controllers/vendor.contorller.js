
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