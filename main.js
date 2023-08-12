import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import starsTexture from "./img/stars.jpg";
import sunTexture from "./img/sunmap.jpg";
import mercuryTexture from "./img/mercurymap.jpg";
import venusTexture from "./img/venusmap.jpg";
import earthTexture from "./img/earthmap.jpg";
import marsTexture from "./img/marsmap.jpg";
import jupiterTexture from "./img/jupitermap.jpg";
import saturnTexture from "./img/saturnmap.jpg";
import saturnRingTexture from "./img/saturnrings.jpg";
import uranusTexture from "./img/uranusmap.jpg";
import uranusRingTexture from "./img/hello.png";
import neptuneTexture from "./img/neptunemap.jpg";
import plutoTexture from "./img/plutomap1k.jpg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
controls.update();

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const createPlanete = (s, t, p, r) => {
  const geo = new THREE.SphereGeometry(s, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(t),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (r) {
    const ringGeo = new THREE.RingGeometry(r.innerRadius, r.outerRadius, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(r.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = p;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = p;
  return { mesh, obj };
};

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture,
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 2, 300, 0.3);
scene.add(pointLight);

function animate(time) {
  // self rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.38);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.004);

  // around the sun rotation
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
