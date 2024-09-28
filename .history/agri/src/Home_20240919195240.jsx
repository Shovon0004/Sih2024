import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './Home.css';

export default function Home() {
  const mountRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePosition = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    let scene, camera, renderer, cursor;

    // Set up scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create custom cursor
    const cursorGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const cursorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8
    });
    cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    scene.add(cursor);
    cursorRef.current = cursor;

    // Add a ring around the cursor
    const ringGeometry = new THREE.RingGeometry(0.07, 0.08, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    cursor.add(ring);

    // Position camera
    camera.position.z = 5;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Update mouse position
    const onMouseMove = (event) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update cursor position
      raycaster.current.setFromCamera(mousePosition.current, camera);
      const intersects = raycaster.current.intersectObject(cursor);
      
      if (intersects.length > 0) {
        const { point } = intersects[0];
        cursor.position.copy(point);
      }

      // Rotate the ring
      ring.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      document.body.style.cursor = 'default';
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
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 10, pointerEvents: 'none' }} />
    </div>
  );
} 