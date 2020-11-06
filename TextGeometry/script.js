var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, .1, 700)
var renderer = new THREE.WebGLRenderer()
camera.position.set(5, 10, 35);


renderer.setClearColor(0xefefef)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMapSoft = true


  
let light1 = new THREE.PointLight(0xff00ff, 1, 500)
light1.position.set(10,0,25)
scene.add(light1)

let light2 = new THREE.AmbientLight(0xff00ff, 1, 100)
light2.position.set(10,-50,25)
scene.add(light2)

let light3 = new THREE.DirectionalLight(0x00ff0f, 1, 500)
light3.position.set(100,-100,-25)
scene.add(light3)


camera.lookAt(scene.position)
document.body.appendChild(renderer.domElement)


  var render = function () {
    requestAnimationFrame( render );

    renderer.render(scene, camera);
  };
  loadFont()
  render();


  var text = "text",
        height = 0.5,
        size = 5,
        curveSegments = 10,
        bevelThickness = 1,
        bevelSize = 0.3,
        bevelSegments = 3,
        bevelEnabled = true,
        font = undefined


  var rotation = 0
 

  function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('./fonts/helvetiker_regular.typeface.json', function (res) {
      font = res;
      createText();
    });
  }

  function createText() {
    textGeo = new THREE.TextGeometry( 'Something Here', {
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
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();



    var textMaterial = new THREE.MeshPhysicalMaterial( 
        { color: 0x44dfad}
    );
    



    var text = new THREE.Mesh(textGeo, textMaterial)
    text.position.x = -textGeo.boundingBox.max.x/2;
    text.castShadow = true;
    scene.add(text)
  }