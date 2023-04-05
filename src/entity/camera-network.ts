import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Camera } from "./camera";

@Entity()
export class CameraNetwork{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    descriptions: string;

    @OneToMany(() => Camera, camera => camera.camera_network)
    @JoinColumn({name: 'id', referencedColumnName: 'camera_network_id'})
    cameras: Camera[]
}