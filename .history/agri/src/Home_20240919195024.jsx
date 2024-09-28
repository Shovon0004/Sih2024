import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './Home.css'; // Ensure you have appropriate styles in Home.css

export default function Home() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Set initial camera position
    camera.position.z = 5;

    // Create particle system
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = Math.random() * 10 - 5;
      positions[i + 1] = Math.random() * 10 - 5;
      positions[i + 2] = Math.random() * 10 - 5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.05,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;

    // Function to update particle positions
    const updateParticles = (mouseX, mouseY) => {
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const targetX = mouseX + (Math.random() - 0.5) * 2;
        const targetY = mouseY + (Math.random() - 0.5) * 2;
        const targetZ = 0;

        positions[i] += (targetX - x) * 0.1;
        positions[i + 1] += (targetY - y) * 0.1;
        positions[i + 2] += (targetZ - z) * 0.1;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    };

    // Function to handle mouse movement
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      updateParticles(mouseX, mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
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