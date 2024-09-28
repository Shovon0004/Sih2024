import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a sphere or any other object
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Move the sphere close to the camera
    camera.position.z = 5;

    // Function to update sphere position based on mouse movement
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      sphere.position.x = mouseX * 2; // Adjust scale for effect
      sphere.position.y = mouseY * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }} />;
}


const Home = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><Link to="/team">Explore</Link></li> {/* Corrected Link usage */}
          <li><a href="#campaigns">Campaigns</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#donate" className="donate-btn">Donate</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Home;
