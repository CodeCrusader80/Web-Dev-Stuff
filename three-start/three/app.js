import * as THREE from 'three';



export default class Sketch {
    onWindowResize = () => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.width = '100vw';
        this.renderer.domElement.style.height = '100vh';
    }
    constructor(container) {
        this.container = container;
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.domElement.style.width = '100vw';
        this.renderer.domElement.style.height = '100vh';
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;
        window.addEventListener('resize', this.onWindowResize, false);
        this.scene = new THREE.Scene();

        this.addMesh();
        this.time = 0;
        this.render();
    }

    render = () => {
        this.time++;
        this.mesh.rotation.x = this.time / 200;
        this.mesh.rotation.y = this.time / 200;
        this.renderer.render( this.scene, this.camera );
        this.frameId = window.requestAnimationFrame(this.render);
    }

    addMesh(){
        this.geometry = new THREE.PlaneGeometry(1,1);
        this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    stop() {
        window.cancelAnimationFrame(this.frameId);
    }
}
