import * as THREE from "three";
import { useRef, useEffect } from "react";

const ThreeJSScreen = ({ width, height }) => {
  const mountRef = useRef(null);
  const shapes = [];

  const createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    shapes.push(cube);
    return cube;
  };

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach((shape) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    renderer.setSize(width, height);
    camera.position.z = 8;
    scene.add(createCube());

    animate();
    // return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}>

    </div>
  )
};

export default ThreeJSScreen;
