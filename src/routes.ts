import { CameraController } from "./controller/camera-controller"
import { CameraNetworkController } from "./controller/camera-network-controller"

export const Routes = [ {
    method: 'post',
    route: '/camera',
    controller: CameraController,
    action: 'createCamera'
}, {
    method: 'get',
    route: '/camera',
    controller: CameraController,
    action: 'readAllCameras'
}, {
    method: 'get',
    route: '/camera/:id',
    controller: CameraController,
    action: 'readOneCamera'
}, {
    method: 'put',
    route: '/camera/:id',
    controller: CameraController,
    action: 'updateCamera'
}, {
    method: 'delete',
    route: '/camera/:id',
    controller: CameraController,
    action: 'deleteCamera'
}, {
    method: 'post',
    route: '/camera-network',
    controller: CameraNetworkController,
    action: 'createCameraNetwork'
}, {
    method: 'get',
    route: '/camera-network',
    controller: CameraNetworkController,
    action: 'readAllCameraNetworks'
}, {
    method: 'get',
    route: '/camera-network/:id',
    controller: CameraNetworkController,
    action: 'readOneCameraNetwork'
}, {
    method: 'put',
    route: '/camera-network',
    controller: CameraNetworkController,
    action: 'updateCameraNetwork'
}, {
    method: 'delete',
    route: '/camera-network/:id',
    controller: CameraNetworkController,
    action: 'deleteCameraNetwork'
}]