import { Repository } from "typeorm";
import { CameraNetwork } from "../entity/camera-network";
import { Camera } from "../entity/camera";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express"
import { CameraNetworkBody } from "../interfaces/camera-network-interface";

export class CameraNetworkController {
    private cameraNetworkRepository: Repository<CameraNetwork> = AppDataSource.getRepository(CameraNetwork)
    private cameraRepository: Repository<Camera> = AppDataSource.getRepository(Camera)

    async createCameraNetwork(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CameraNetworkBody = req.body
            const newCameraNetwork: CameraNetwork = this.cameraNetworkRepository.create(body)
            await this.cameraNetworkRepository.save(newCameraNetwork)
            return newCameraNetwork
        } catch (error) {
            return 'Error creating camera network'
        }
    }

    async readAllCameraNetworks(req: Request, res: Response, next: NextFunction) {
        try {
            const cameraNetworks: CameraNetwork[] = await this.cameraNetworkRepository.find({
                relations: {
                    cameras: true
                }
            })
            return cameraNetworks
        } catch (error) {
            return 'Error reading camera networks'
        }
    }

    async readOneCameraNetwork(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const cameraNetwork: CameraNetwork = await this.cameraNetworkRepository.findOne({
                where: {
                    id: id
                }, relations: {
                    cameras: true
                }
            })
            return cameraNetwork
        } catch (error) {
            return 'Error reading camera network'
        }
    }

    async updateCameraNetwork(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const body: Partial<CameraNetworkBody> = req.body
            const cameraNetworkToBeUpdated: CameraNetwork = await this.cameraNetworkRepository.findOneBy({ id: id })
            if (!cameraNetworkToBeUpdated) {
                return 'No camera network with that id'
            }
            const updatedCameraNetwork = this.cameraNetworkRepository.create({
                ...cameraNetworkToBeUpdated,
                ...body
            })
            await this.cameraNetworkRepository.save(updatedCameraNetwork)
            return updatedCameraNetwork
        } catch (error) {
            return 'Error updating camera network'
        }
    }

    async deleteCameraNetwork(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const cameraNetworkToBeDeleted = await this.cameraNetworkRepository.findOneBy({ id: id })
            if (!cameraNetworkToBeDeleted) {
                return 'No camera network with that id'
            }
            await this.cameraRepository.update({camera_network_id: cameraNetworkToBeDeleted.id},{
                camera_network_id: null
            })
            await this.cameraNetworkRepository
                .createQueryBuilder('users')
                .delete()
                .from(CameraNetwork)
                .where("id = :id", { id: id })
                .execute()
            return 'Successfully deleted the camera network'
        } catch (error) {
            return 'Error deleting camera network'
        }
    }
}