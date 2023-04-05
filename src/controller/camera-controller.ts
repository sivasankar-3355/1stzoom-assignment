import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Camera } from "../entity/camera";
import { NextFunction, Request, Response } from "express"
import { CameraBody } from "../interfaces/camera-interface";

export class CameraController {
    private cameraRepository: Repository<Camera> = AppDataSource.getRepository(Camera)

    async createCamera(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CameraBody = req.body
            const newCamera: Camera = this.cameraRepository.create(body)
            await this.cameraRepository.save(newCamera)
            return newCamera
        } catch (error) {
            return 'Error creating new camera'
        }
    }

    async readAllCameras(req: Request, res: Response, next: NextFunction) {
        try {
            const cameras: Camera[] = await this.cameraRepository.find({
                relations: {
                    camera_network: true
                }
            })
            return cameras
        } catch (error) {
            return 'Error fetching cameras'
        }
    }

    async readOneCamera(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const camera: Camera = await this.cameraRepository.findOne({
                where: {
                    id: id
                }, relations: {
                    camera_network: true
                }
            })
            return camera
        } catch (error) {
            return 'No camera with that id'
        }
    }

    async updateCamera(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const body: Partial<CameraBody> = req.body
            const cameraToBeUpdated: Camera = await this.cameraRepository.findOneBy({ id: id })
            if (!cameraToBeUpdated) {
                return 'No camera with that id'
            }
            const updatedCamera = this.cameraRepository.create({
               ...cameraToBeUpdated,
               ...body
            })
            await this.cameraRepository.save(updatedCamera)
            return updatedCamera
        } catch (error) {
            return 'error updating camera'
        }
    }

    async deleteCamera(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const cameraToBeDeleted: Camera = await this.cameraRepository.findOneBy({ id: id })
            if (!cameraToBeDeleted) {
                return 'No camera with that id'
            }
            return this.cameraRepository.delete({ id: id })
        } catch (error) {
            return 'Error deleting camera'
        }
    }
}