import * as THREE from 'three'
import OrbitControls from './components/OrbitControls'

let camera, scene, renderer
let mesh

class generator {
  constructor() {
    console.log("Starting generator")
    console.log(THREE)
    this.generate.bind(this)()
  }

  generate() {
    console.log("generating")

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 800 )
    camera.position.set( -20, 10, 20 )
    camera.lookAt( new THREE.Vector3( 0, 0, 0) )
    scene = new THREE.Scene()
    
    var light = new THREE.PointLight( 0xff0000, 5, 1000 )
    light.position.set( 250, 250, 250 )
    scene.add( light )

    var light2 = new THREE.PointLight( 0xff0000, 2, 1000 )
    light2.position.set( -250, -250, -250 )
    scene.add( light2 )

    let geometry = new THREE.BoxBufferGeometry( 10, 10, 10 )
    let material = new THREE.MeshPhongMaterial( 
      { 
        color: 0xdddddd, 
        specular: 0x009900, 
        shininess: 30, 
        shading: THREE.FlatShading 
      }
    )
    mesh = new THREE.Mesh( geometry, material )
    scene.add( mesh )
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
    window.addEventListener( 'resize', this.onWindowResize, false )

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 1, 0 );
    controls.update();

    this.animate.bind(this)()
  }

  onWindowResize() {
    console.log("resizing")
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
  }

  animate() {
    console.log("animating")
    requestAnimationFrame( this.animate.bind(this) )
    // mesh.rotation.x += 0.005
    // mesh.rotation.y += 0.01
    renderer.render( scene, camera )
  }
}

export {generator}