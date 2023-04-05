import "reflect-metadata"
import { DataSource } from "typeorm"
import { Camera } from "./entity/camera"
import { CameraNetwork } from "./entity/camera-network"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root@123",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Camera, CameraNetwork],
    migrations: [],
    subscribers: [],
})
