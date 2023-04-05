import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CameraNetwork } from "./camera-network";

@Entity()
export class Camera{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    camera_network_id: number

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: true})
    url: string;

    @ManyToOne(() => CameraNetwork, cameraNetwork => cameraNetwork.cameras)
    @JoinColumn({name: 'camera_network_id', referencedColumnName: 'id'})
    camera_network: CameraNetwork
}