let container;
let scene;
let camera;
let renderer;
let model;
let controls;

let text = "text";
let height = 0.5;
let size = 4;
let curveSegments = 10;
let bevelThickness = 1;
let bevelSize = 0.3;
let bevelSegments = 3;
let bevelEnabled = true;
let font = undefined;
let font2 = undefined;
let helperText;




function init(){
    container = document.querySelector('.scene');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
    camera.position.set(5, 10, 35);

      
    let light1 = new THREE.PointLight(0xff00ff, 1, 500)
    light1.position.set(10,0,25)
    scene.add(light1)

    let light2 = new THREE.AmbientLight(0xff00ff, 1, 100)
    light2.position.set(10,-50,25)
    scene.add(light2)

    let light3 = new THREE.DirectionalLight(0x00ff0f, 1, 500)
    light3.position.set(100,-100,-25)
    scene.add(light3)


    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xefefef)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMapSoft = true
    renderer.setPixelRatio(window.devicePixelRatio)

    camera.lookAt(scene.position)
    container.appendChild(renderer.domElement)


    loadFont2()
    loadFont()
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );
}


function animate(){
    requestAnimationFrame(animate)

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

function loadFont2() {
    var loader2 = new THREE.FontLoader();
    loader2.load('./fonts/helvetiker_regular.typeface.json', function (res) {
        font2 = res;
        createText2()
    });
}

function loadFont() {
    
    var loader = new THREE.FontLoader();
    loader.load('./fonts/helvetiker_regular.typeface.json', function (res) {
      font = res;
      createText();
    });
}



  function createText() {
    textGeo = new THREE.TextGeometry( '3D', {
      font: font,
      size: size,
      height: height,
      curveSegments:curveSegments,
      weight: "normal",
      bevelThickness:bevelThickness,
      bevelSize:bevelSize,
      bevelSegments:bevelSegments,
      bevelEnabled:bevelEnabled
    });

   

    // var sphereGeo = new THREE.SphereGeometry( 1.8, 32, 32 );
  
    // var sphereCsg = THREE.CSG.fromGeometry( sphereGeo );

    //--------------------------
  

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    var textMaterial = new THREE.MeshPhysicalMaterial( 
        { color: 0x44dfad}
    );
    

    var text = new THREE.Mesh(textGeo, textMaterial)
    text.position.x = -5;
    text.castShadow = true;



     var helperTextCsg = THREE.CSG.fromMesh(helperText);

    var textCsg = THREE.CSG.fromMesh(text);

    var subtractCsg = textCsg.intersect(helperTextCsg);


    var subtractThree  = THREE.CSG.toMesh(subtractCsg, textMaterial);

    scene.add(subtractThree)
  }


  function createText2(){
    textGeo2 = new THREE.TextGeometry( '3D', {
        font: font2,
        size: 4,
        height: height,
        curveSegments:curveSegments,
        weight: "normal",
        bevelThickness:bevelThickness,
        bevelSize:bevelSize,
        bevelSegments:bevelSegments,
        bevelEnabled:bevelEnabled
      });
  
      textGeo2.computeBoundingBox();
      textGeo2.computeVertexNormals();
  
      
      var helperTextMaterial = new THREE.MeshPhysicalMaterial( 
          { color: 0xf0ff70}
      );
      
  
       helperText = new THREE.Mesh(textGeo2, helperTextMaterial)
    
    //   helperText.position.x = -textGeo2.boundingBox.max.x/2;
      helperText.position.x = -5;
      helperText.castShadow = true;
      scene.add(helperText)
  }



 