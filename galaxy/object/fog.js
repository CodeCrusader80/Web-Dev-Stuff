import {BASE_LAYER, HAZE_MAX, HAZE_MIN, HAZE_OPACITY} from "../configuration/renderConfiguration";
import {clamp} from "../helper";
import * as THREE from 'three';

const fogTexture = new THREE.TextureLoader().load('../assets/blue-light-circle-png-images-download-11654185507oflwj.webp')
const fogSprite = new THREE.SpriteMaterial({map: fogTexture, color: 0x0082ff, opacity: HAZE_OPACITY, depthTest: false, depthWrite: false})

export class Fog {
    constructor(position) {
        this.position = position
        this.obj = null
    }
    updateScale(camera) {
        let dist = this.position.distanceTo(camera.position) / 250
        this.obj.material.opacity = clamp(HAZE_OPACITY * Math.pow(dist / 2.5, 2), 0, HAZE_OPACITY)
        this.obj.material.needsUpdate = true
    }
    toThreeObject(scene) {
        let sprite = new THREE.Sprite(fogSprite)
        sprite.layers.set(BASE_LAYER)
        sprite.position.copy(this.position)
        sprite.scale.multiplyScalar(clamp(HAZE_MAX * Math.random(), HAZE_MIN, HAZE_MAX))
        this.obj = sprite
        scene.add(sprite)
    }
}