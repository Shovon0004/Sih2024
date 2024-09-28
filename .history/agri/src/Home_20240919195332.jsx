import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './Home.css';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, trail;
    const points = [];
    const maxPoints = 50;
    const trailLength = 20;
    const mousePos = new THREE.Vector3();

    // Set up scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create trail
    const trailGeometry = new THREE.BufferGeometry();
    const trailMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      vertexColors: true,
      linewidth: 1,
      opacity: 0.8,
      transparent: true
    });

    trail = new THREE.Line(trailGeometry, trailMaterial);
    scene.add(trail);

    // Position camera
    camera.position.z = 5;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Update mouse position
    const onMouseMove = (event) => {
      mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.z = 0;
      mousePos.unproject(camera);
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

      // Add new point to the trail
      points.push(new THREE.Vector3(mousePos.x, mousePos.y, 0));

      // Remove old points if we exceed the maximum
      if (points.length > maxPoints) {
        points.shift();
      }

      // Update trail geometry
      const positions = new Float32Array(points.length * 3);
      const colors = new Float32Array(points.length * 3);
      for (let i = 0; i < points.length; i++) {
        positions[i * 3] = points[i].x;
        positions[i * 3 + 1] = points[i].y;
        positions[i * 3 + 2] = points[i].z;

        const alpha = i / points.length;
        colors[i * 3] = alpha;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = alpha;
      }

      trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      trailGeometry.setDrawRange(0, Math.min(points.length, trailLength));

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