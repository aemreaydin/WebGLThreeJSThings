import {
    Scene,
    WebGLRenderer,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    PerspectiveCamera,
    Clock,
    LineSegments,
    EdgesGeometry,
    LineBasicMaterial
} from "three";
import { cubeGenerator, sphereGenerator } from "./polygonGenerator";

const onWindowResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
};

const animate = () => {
    const deltaTime = clock.getDelta();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cubeMesh.rotation.x += 0.05;
    cubeMesh.rotation.y += 0.05;
    cubeLine.rotation.x += 0.05;
    cubeLine.rotation.y += 0.05;
    sphereMesh.rotation.x += 0.025;
    sphereMesh.rotation.z += 0.025;
};

window.addEventListener("resize", onWindowResize, false);

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const scene = new Scene();
const clock = new Clock();
clock.start();
// const camera = new OrthographicCamera(
//     -WIDTH / 2,
//     WIDTH / 2,
//     HEIGHT / 2,
//     -HEIGHT / 2,
//     0,
//     1000
// );
const camera = new PerspectiveCamera(70, WIDTH / HEIGHT, 1, 1000);
camera.position.x = 0.0;
camera.position.y = 0.0;
camera.position.z = 10.0;
camera.lookAt(new Vector3(0, 0.0, 0.0));
const renderer = new WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

scene.add(camera);

const cubeGeometry = cubeGenerator();
const cubeMat = new MeshBasicMaterial({ color: 0x00ff00 });
const cubeMesh = new Mesh(cubeGeometry, cubeMat);

const cubeEdges = new EdgesGeometry(cubeGeometry);
const cubeLine = new LineSegments(
    cubeEdges,
    new LineBasicMaterial({ color: 0xff0000 })
);
cubeMesh.position.x = -8.0;
cubeLine.position.x = -8.0;

const sphereGeometry = sphereGenerator(1);
const sphereMat = new MeshBasicMaterial({ color: 0x00ff00 });
const sphereMesh = new Mesh(sphereGeometry, sphereMat);
// const sphereEdges = new EdgesGeometry(sphereGeometry);
// const sphereLine = new LineSegments(
//     sphereEdges,
//     new LineBasicMaterial({ color: 0xff0000 })
// );

scene.add(cubeMesh);
scene.add(cubeLine);
scene.add(sphereMesh);
// scene.add(sphereLine);
animate();
