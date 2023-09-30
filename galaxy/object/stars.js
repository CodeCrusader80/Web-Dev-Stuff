import * as THREE from 'three';
import {BLOOM_LAYER, STAR_SIZE_MAX, STAR_SIZE_MIN} from "../configuration/renderConfiguration";
import {stars} from "../configuration/starsDist";
import {clamp} from "../helper";

const texture = new THREE.TextureLoader().load('../assets/White_Circle.svg.png')
const materials = stars.color.map((color) => new THREE.SpriteMaterial({map: texture, color: color}))

export class Star {
    constructor(position) {
        this.position = position
        this.starType = this.generateStarType()
        this.obj = null
    }
    generateStarType() {
        let num = Math.random() * 100.0
        let pct = stars.percentage
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            }
        }
        return 0
    }
    updateScale(camera) {
        let dist = this.position.distanceTo(camera.position) / 250
        let starSize = dist * stars.size[this.starType]
        starSize = clamp(starSize, STAR_SIZE_MIN, STAR_SIZE_MAX)
        this.obj?.scale.copy(new THREE.Vector3(starSize, starSize, starSize))
    }
    toThreeObject(scene) {
        let sprite = new THREE.Sprite(materials[this.starType])
        sprite.layers.set(BLOOM_LAYER)
        sprite.scale.multiplyScalar(stars.size[this.starType])
        sprite.position.copy(this.position)
        this.obj = sprite
        scene.add(sprite)
    }
}