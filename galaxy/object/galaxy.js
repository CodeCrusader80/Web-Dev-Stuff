import * as THREE from 'three'
import {Star} from "./stars";
import {ARMS, ARM_X_DIST, ARM_X_MEAN, ARM_Y_DIST, ARM_Y_MEAN, CORE_DIST_X, CORE_DIST_Y, GALAXY_THICKNESS, HAZE_RATIO, NUM_STARS, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST} from "../configuration/galaxyConfig";
import {randomGauss, spiral} from "../helper";
