"use strict";

var container;
var camera, scene, renderer;
var uniforms;
init();
function start_backAni() {  
  animate();
}


function init() {
  console.log("back-ani init");
  container = document.getElementById('js-app');
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  var geometry = new THREE.PlaneBufferGeometry(2, 2);
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize(event) {
  console.log("onMouseResize");
  renderer.setSize(900, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  // console.log("animate");
  // requestID = requestAnimationFrame(animate);
  requestAnimationFrame(animate);
  render();
}

function cancel_backAni() {
  cancelAnimationFrame(requestID);
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
}