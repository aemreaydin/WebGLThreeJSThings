import {
    Scene,
    Geometry,
    Vector3,
    Face3,
    WireframeGeometry,
    LineSegments,
    LineBasicMaterial,
    MeshBasicMaterial,
    Mesh
} from "three";

export const generatePolygon = (
    scene: Scene,
    sides: number,
    radius: number = 1,
    isWireframe = true
) => {
    const polygon = new Geometry();
    for (let i = 0; i != sides; i++) {
        const angle = Math.PI + (i / sides) * Math.PI * 2;

        const x = Math.cos(angle);
        const y = Math.sin(angle);

        polygon.vertices.push(new Vector3(radius * x, radius * y, 0));
    }
    polygon.faces.push(new Face3(0, 1, 2));

    if (isWireframe) {
        const wireframe = new WireframeGeometry(polygon);
        const line = new LineSegments(wireframe);
        line.material = new LineBasicMaterial({
            color: 0xff0000,
            linewidth: 43
        });
        line.material.opacity = 0.25;
        line.material.depthTest = false;
        line.material.transparent = true;

        scene.add(line);
    } else {
        const polygonMat = new MeshBasicMaterial({ color: 0x00ff00 });
        scene.add(new Mesh(polygon, polygonMat));
    }
};

export const cubeGenerator = (width = 1.0, height = 1.0, depth = 1.0) => {
    const cube = new Geometry();

    cube.vertices.push(new Vector3(-0.5, 0.5, -0.5)); // 0
    cube.vertices.push(new Vector3(0.5, 0.5, -0.5)); // 1
    cube.vertices.push(new Vector3(0.5, 0.5, 0.5)); // 2
    cube.vertices.push(new Vector3(-0.5, 0.5, 0.5)); // 3
    cube.vertices.push(new Vector3(-0.5, -0.5, -0.5)); // 4
    cube.vertices.push(new Vector3(0.5, -0.5, -0.5)); // 5
    cube.vertices.push(new Vector3(0.5, -0.5, 0.5)); // 6
    cube.vertices.push(new Vector3(-0.5, -0.5, 0.5)); // 7

    cube.faces.push(new Face3(0, 2, 1));
    cube.faces.push(new Face3(0, 3, 2));
    cube.faces.push(new Face3(2, 5, 1));
    cube.faces.push(new Face3(2, 6, 5));
    cube.faces.push(new Face3(3, 7, 6));
    cube.faces.push(new Face3(3, 6, 2));
    cube.faces.push(new Face3(4, 3, 0));
    cube.faces.push(new Face3(4, 7, 3));
    cube.faces.push(new Face3(6, 4, 5));
    cube.faces.push(new Face3(6, 7, 4));
    cube.faces.push(new Face3(1, 5, 4));
    cube.faces.push(new Face3(1, 4, 0));

    return cube;
};

export const sphereGenerator = (
    radius = 0.5,
    horizontalSlices = 5,
    verticalSlices = 5
) => {
    const sphere = new Geometry();
    for (let h = 0; h != horizontalSlices; ++h) {
        const anglePhi = Math.PI / 2 - Math.PI * (h / horizontalSlices); // horizontal
        for (let v = 0; v != verticalSlices; ++v) {
            const angleTheta = 2 * Math.PI * (v / verticalSlices); // vertical

            const x = radius * Math.cos(anglePhi) * Math.cos(angleTheta);
            const y = radius * Math.sin(anglePhi) * Math.sin(angleTheta);
            const z = radius * Math.sin(anglePhi);
            sphere.vertices.push(new Vector3(x, y, z));
        }
    }
    for (let h = 0; h != horizontalSlices; ++h) {
        for (let v = 0; v != verticalSlices; ++v) {
            if (h == 0) {
                let h0v0 = 0;
                let h0v1 = v + 1;
                let h0v2 = v + 2;
                sphere.faces.push(new Face3(h0v0, h0v1, h0v2));
                continue;
            }

            if (h == horizontalSlices - 1) {
                let h1v1 = horizontalSlices * h;
                let h0v0 = horizontalSlices * h + v;
                let h0v1 = horizontalSlices * h + v + 1;
                sphere.faces.push(new Face3(h1v1, h0v0, h0v1));
                continue;
            }

            const h0v0 = horizontalSlices * h + v + 1;
            const h0v1 = h0v0 + 1;
            const h1v0 = horizontalSlices * (h + 1) + v + 1;
            const h1v1 = h1v0 + 1;

            sphere.faces.push(new Face3(h0v0, h1v0, h1v1));
            sphere.faces.push(new Face3(h0v0, h1v1, h0v1));
        }
    }
    debugger;
    return sphere;
};
