
window.addEventListener("load", function() {

    var curtains = new Curtains({
    container: "canvas"
    });
    var planeElement = document.getElementsByClassName("plane")[0];
    var params = {
    vertexShaderID: "plane-vs", 
    fragmentShaderID: "plane-fs", 
    uniforms: {
    time: {
    name: "uTime",
    type: "1f", 
    value: 0,
    },
    },
    };
      
    
    var plane = curtains.addPlane(planeElement, params);
    
    if(plane) {
        plane.onRender(function() {
        
        plane.uniforms.time.value++; // update our time uniform value
    });
    }
});