import * as THREE from "three";
import { useRef, useEffect } from "react";

const ThreeJSScreen = ({ width, height }) => {
  const mountRef = useRef(null);
  const shapes = [];
  const positions = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
  const colors = [
    new THREE.Color('purple'),
    new THREE.Color('indigo'),
    new THREE.Color('blue'),
    new THREE.Color('green'),
    new THREE.Color('yellow'),
    new THREE.Color('orange'),
    new THREE.Color('red'),
    new THREE.Color('purple'),
    new THREE.Color('red'),
    new THREE.Color('orange'),
    new THREE.Color('yellow'),
    new THREE.Color('green'),
    new THREE.Color('blue'),
    new THREE.Color('indigo'),
    new THREE.Color('purple'),
  ]
  let frames = 0;

  const createCube = (index) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: colors[index], opacity: 0.65, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    shapes.push(cube);
    cube.position.x = positions[index] * 3;
    cube.position.y = positions[index];
    cube.rotSpeed = positions[index];
    return cube;
  };

  const createLight = () => {
    const light = new THREE.HemisphereLight(0xffffff, 0x000000);
    return light;
  }

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      ++frames;
      requestAnimationFrame(animate);
      shapes.forEach((shape) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01
        shape.position.x = Math.sin((frames % 180)/180 * Math.PI * 2) * shape.rotSpeed;
        shape.position.y = Math.cos((frames % 180)/180 * Math.PI * 2) * shape.rotSpeed;
        shape.position.z = -Math.sin((frames % 180) * Math.PI * 2) * shape.rotSpeed;
      });
      renderer.render(scene, camera);
    };

    renderer.setSize(width, height);
    camera.position.z = 8;
    for(let i = 0; i < 15; ++ i) {
      scene.add(createCube(i));
    }
    scene.add(createLight());

    animate();
    return () => {
      if(mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    }
  }, []);

  return (
    <div className="threeJ-container" ref={mountRef}>

    </div>
  )
};

export default ThreeJSScreen;
