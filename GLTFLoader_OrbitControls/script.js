let container;
let scene;
let camera;
let renderer;
let model;
let controls;


function init(){
    container = document.querySelector('.scene');

    scene = new THREE.Scene();

    const fov = 75;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 700);


    const ambientLight = new THREE.AmbientLight(0x414141, 4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xff00f0, 2)
    directionalLight.position.set(80,40,0)
    scene.add(directionalLight)
    
    
    
    const directionalLight2 = new THREE.DirectionalLight(0x00ffb0, 2, 100)
    directionalLight2.position.set(80,-100,180)
    directionalLight2.castShadow = true; 
    scene.add(directionalLight2)
    
    directionalLight2.shadow.mapSize.width = 512; 
    directionalLight2.shadow.mapSize.height = 512; 
    directionalLight2.shadow.camera.near = 0.5;       
    directionalLight2.shadow.camera.far = 500   

    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true})
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement)

    let loader = new THREE.GLTFLoader
    loader.load('./3D-assets/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        model = gltf.scene.children[0]
        // renderer.render(scene, camera)
        model.position.set(0, 50, 0)
        model.scale.set(.6, .6, .6)

        animate()
    })

    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );
}


function animate(){
    requestAnimationFrame(animate)

    model.rotation.z +=0.005
    // model.rotation.x +=0.005

    renderer.render(scene, camera)

}
init()

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener('resize', onWindowResize)

function render() {
    renderer.render( scene, camera );

}