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
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )
    camera.position.z = 400
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 800 )
        camera.position.set( -400, 10, 400 )
        camera.lookAt( new THREE.Vector3( 0, 0, 0) )
        scene = new THREE.Scene()
        // Lights
        var light = new THREE.PointLight( 0xff0000, 1, 100 )
        light.position.set( 250, 250, 50 )
        scene.add( light )

    let geometry = new THREE.BoxBufferGeometry( 200, 200, 200 )
    let material = new THREE.MeshBasicMaterial(
      {
        color: new THREE.Color( 0, 100, 255 ),
        roughness: 0.7,
        metalness: 0.5,
        side: THREE.DoubleSide,
        clipIntersection: true
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
    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.01
    renderer.render( scene, camera )
  }
}

export {generator}