import * as vendorController from '../controllers/vendor.contorller.js'
import { auth } from "../middlewares/auth.middleware.js";

import express from "express";


export const vendorRouter=express.Router()

vendorRouter.post('/',auth,vendorController.addVendor);
vendorRouter.get('/',auth,vendorController.getVendors);
vendorRouter.get('/:id',auth,vendorController.getVendorById);
vendorRouter.put('/:id',auth,vendorController.updateVendorById);
vendorRouter.delete('/:id',auth,vendorController.deleteVendorById);