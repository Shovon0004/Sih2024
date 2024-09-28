import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './Home.css';

export default function Home() {
  const mountRef = useRef(null);
  const cursorRef = useRef(null); // Reference to the cursor object

  useEffect(() => {
    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient and point lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create a sphere to act as the custom cursor
    const cursorGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const cursorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cursorSphere = new THREE.Mesh(cursorGeometry, cursorMaterial);
    scene.add(cursorSphere);
    cursorRef.current = cursorSphere; // Set reference

    // Set initial camera position
    camera.position.z = 5;

    // Mouse movement handler
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Convert mouse position to normalized device coordinates (NDC)
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5).unproject(camera);
      cursorSphere.position.set(vector.x, vector.y, vector.z);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animate the wave effect
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the wave effect
      if (cursorRef.current) {
        time += 0.05; // Adjust speed of wave
        cursorRef.current.position.z = Math.sin(time * 2) * 0.5; // Create wave effect
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo">LOGO</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><Link to="/team">Explore</Link></li>
            <li><a href="#campaigns">Campaigns</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#donate" className="donate-btn">Donate</a></li>
          </ul>
        </nav>
      </header>
      {/* The Three.js scene container */}
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />
    </div>
  );
}
