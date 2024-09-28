import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './Home.css';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;
    const mousePosition = new THREE.Vector3();
    const particleCount = 1000;

    // Set up scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    for (let i = 0; i < particleCount; i++) {
      sizes[i] = Math.random() * 0.1 + 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector3() }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform vec3 mousePos;
        void main() {
          vColor = color;
          vec3 pos = position;
          float dist = distance(pos, mousePos);
          pos += sin(time * 2.0 + dist * 3.0) * 0.1;
          pos += (mousePos - pos) * (0.1 / (dist + 1.0));
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Position camera
    camera.position.z = 5;

    // Update mouse position
    const onMouseMove = (event) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePosition.z = 0;
      mousePosition.unproject(camera);
    };

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      particles.material.uniforms.time.value = time;
      particles.material.uniforms.mousePos.value = mousePosition;

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
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
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />
    </div>
  );
}