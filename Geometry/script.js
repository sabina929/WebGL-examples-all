let scene;
let camera;
let renderer;


scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5


renderer = new THREE.WebGLRenderer({antialias:true})
// renderer.setClearColor('#020202')
renderer.setClearColor('#efefef')
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix()
}

window.addEventListener('resize', onWindowResize)

// renderer.render(scene, camera)


let torusGeometry = new THREE.TorusGeometry( 8, 3, 16, 100 );
let torusMaterial = new THREE.MeshPhysicalMaterial({color: 0xf0ff70})
let torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
torusMesh.position.set(20,2,-50)
scene.add(torusMesh)


let coneGeometry = new THREE.ConeGeometry( 6, 10, 32 );
// let coneMaterial = new THREE.MeshPhysicalMaterial({color: 0x5055ff})
let coneMaterial = new THREE.MeshPhysicalMaterial({color:  0x1ff0dd})
let coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
coneMesh.position.set(-20,-10,-40)
scene.add(coneMesh)

let sphereGeometry = new THREE.SphereGeometry(1, 40, 40)
let sphereMaterial = new THREE.MeshPhysicalMaterial({color: 0xa7a7aa})
let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.set(-2,2,-12)
scene.add(sphereMesh)


let boxGeometry = new THREE.BoxGeometry(1, 1, 1)
let boxMaterial = new THREE.MeshPhysicalMaterial({color: 0x44dfad})
let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
// boxMesh.position.x = -2
// boxMesh.position.y = 2
// boxMesh.position.z = -2

boxMesh.position.set(-2,2,-2)
boxMesh.rotation.set(-2,0,0)
boxMesh.scale.set(2,1,2)

scene.add(boxMesh)
let light2 = new THREE.AmbientLight(0xff00ff, 1, 100)
light2.position.set(10,-50,25)
scene.add(light2)

let light1 = new THREE.PointLight(0xff00ff, 1, 500)
light1.position.set(10,0,25)
scene.add(light1)

let light3 = new THREE.DirectionalLight(0x00ff0f, 1, 500)
light3.position.set(100,-100,-25)
scene.add(light3)

// renderer.render(scene, camera)

function render(){
    requestAnimationFrame(render)

    // boxMesh.rotation.x += 0.01
    // boxMesh.rotation.y += 0.01
    // sphereMesh.position.z += 0.05
    renderer.render(scene, camera)
}

render()

var tl = gsap.timeline({repeat: -1, yoyo:true});

tl.to(boxMesh.scale, {x: 2, duration: 1, ease: "power1.out"})
.to(boxMesh.position, {x: -1, duration: 1, ease: "power1.out"})
.to(boxMesh.scale, {y: 2, duration: 1, ease: "power1.out"})
.to(boxMesh.position, {x: 1, y: -1,duration: 1, ease: "power1.out"})
.to(boxMesh.rotation, {z: 2, duration: 1, ease: "power1.out"})

var tl2 = gsap.timeline({repeat: -1, yoyo:true});

tl2.to(sphereMesh.position, {z: 5, duration: 5, ease: "power1.out"})
.to(sphereMesh.position, {x: 4, duration: .05, ease: "power1.out"})
.to(sphereMesh.position, {y: -4, duration: .05, ease: "power1.out"})
.to(sphereMesh.position, {z: -15, y: 10, x: -6, duration: 7, ease: "power1.out"})

var tl3 = gsap.timeline({repeat: -1, yoyo:true});

tl3.to(torusMesh.rotation, {x: 5, y: -10, duration: 7, ease: "power1.out"})
.to(torusMesh.rotation, {z: -5, y: 10, x: -6, duration: 7, ease: "power1.out"})

var tl4 = gsap.timeline({repeat: -1, yoyo:true});

tl4.to(coneMesh.rotation, {x: 5, y: -5, z: 5,duration: 4, ease: "power1.out"})
.to(coneMesh.position, {y: 4, duration: 1, ease: "power1.out"})