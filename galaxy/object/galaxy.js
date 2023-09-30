import * as THREE from 'three'
import {Star} from "./stars";
import {ARMS, ARM_X_DIST, ARM_X_MEAN, ARM_Y_DIST, ARM_Y_MEAN, CORE_DIST_X, CORE_DIST_Y, GALAXY_THICKNESS, HAZE_RATIO, NUM_STARS, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST} from "../configuration/galaxyConfig";
import {randomGauss, spiral} from "../helper";
import {Fog} from "./fog.js";

export class Galaxy {
    constructor(scene) {
        this.scene = scene
        this.stars = this.generateObject(NUM_STARS, (pos) => new Star(pos))
        this.fog = this.generateObject(NUM_STARS * HAZE_RATIO, (pos) => new Fog(pos))
        this.stars.forEach((star) => star.toThreeObject(scene))
        this.fog.forEach((fog) => fog.toThreeObject(scene))
    }
    updateScale(camera) {
        this.stars.forEach((star) => {
            star.updateScale(camera)
        })
        this.fog.forEach((fog) => {
            fog.updateScale(camera)
        })
    }
    generateObject(numStars, generator) {
        let objects = []
        for (let i = 0; i < numStars / 4; i++) {
            let pos = new THREE.Vector3(randomGauss(0, CORE_DIST_X), randomGauss(0, CORE_DIST_Y), randomGauss(0, GALAXY_THICKNESS))
            let obj = generator(pos)
            objects.push(obj)
        }
        for (let i = 0; i < numStars / 4; i++) {
            let pos = new THREE.Vector3(randomGauss(0, OUTER_CORE_X_DIST), randomGauss(0, OUTER_CORE_Y_DIST), randomGauss(0, GALAXY_THICKNESS))
            let obj = generator(pos)
            objects.push(obj)
        }
        for (let j = 0; j < ARMS; j++) {
            for (let i = 0; i < numStars / 4; i++) {
                let pos = spiral(randomGauss(ARM_X_MEAN, ARM_X_DIST), randomGauss(ARM_Y_MEAN, ARM_Y_DIST), randomGauss(0, GALAXY_THICKNESS), j * 2 * Math.PI / ARMS)
                let obj = generator(pos)
                objects.push(obj)
            }
        }
        return objects
    }
}