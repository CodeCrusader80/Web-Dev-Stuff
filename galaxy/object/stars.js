import * as THREE from 'three';
import {BLOOM_LAYER, STAR_SIZE_MAX, STAR_SIZE_MIN} from "../configuration/renderConfiguration";
import {stars} from "../configuration/starsDist";
import {clamp} from "../helper";

const texture = new THREE.TextureLoader().load()