import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Shaders
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch{
    constructor(options){
        this.time = 0;

        //Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera( 75, this.viewPort.aspectRatio, 0.1, 1000 );
        this.camera.position.z = 2;

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.viewPort.width, this.viewPort.height);
        document.body.appendChild( this.renderer.domElement );

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.resize()
        this.setupResize()
        this.addObjects()
        this.render()
    }

    get viewPort(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspectRatio = width / height;

        return {
            width,
            height, 
            aspectRatio
        }
    }

    setupResize(){
        window.addEventListener('resize', this.resize.bind(this))
    }

    resize(){
        this.width = this.viewPort.width;
        this.height = this.viewPort.height;
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.viewPort.aspectRatio;
        this.camera.updateProjectionMatrix();
    }

    addObjects(){
        this.geometry = new THREE.PlaneGeometry(.5, .5, 10, 10)
        // this.material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            fragmentShader: fragment,
            vertexShader: vertex,
            wireframe: true
        })
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.cube );
    }

    render(){
        this.time += 0.5;
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch()








