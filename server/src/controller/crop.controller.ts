import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../interfaces/error.interface";
import CropServices from "../services/crop.services";

export class CropController {
    public createCrop = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const {
                name,
                image,
                description,
                growthFactors,
                suitableMonths,
                alternativeCrops,
                customerTrends,
            } = req.body;

            const crop = await CropServices.createCrop({
                name,
                image,
                description,
                growthFactors,
                suitableMonths,
                alternativeCrops,
                customerTrends,
            });

            return res.status(200).json({
                success: true,
                message: "Crop created successfully",
                crop,
            });
        }
    );

    public getCropsById = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params;

            const crops = await CropServices.getCrops(id);

            return res.status(200).json({
                success: true,
                message: "Crops fetched successfully",
                crops,
            });
        }
    );

    public getCropsByMonth = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { month } = req.query;

            if (!month) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a month",
                });
            }

            const crops = await CropServices.getCropsByMonth(month as string);

            return res.status(200).json({
                success: true,
                message: "Crops fetched successfully",
                crops,
            });
        }
    );

    public getAlternativeCrops = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            const { month } = req.query;

            const crops = await CropServices.getAlternativeCrops(
                month as string
            );

            return res.status(200).json({
                success: true,
                message: "Alternative crops fetched successfully",
                crops,
            });
        }
    );

    public getCustomerPreferenceForMonth = TryCatch(
        async (req: Request, res: Response, next: NextFunction) => {
            return {
                success: true,
                message: "success",
                crop,
            };
        }
    );
}
