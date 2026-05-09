import { useEffect, useRef } from 'react';

export default function GlobeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingScript = document.getElementById('threejs-script');
    const initGlobe = () => {
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      if (!canvas || !THREE) return;

      const W = canvas.clientWidth || 20;
      const H = canvas.clientHeight || 20;
      canvas.width = W;
      canvas.height = H;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 3.2);

      /* STARS */
      const sv = [];
      for (let i = 0; i < 2500; i++)
        sv.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
      const sg = new THREE.BufferGeometry();
      sg.setAttribute('position', new THREE.Float32BufferAttribute(sv, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.6 })));

      const group = new THREE.Group();
      scene.add(group);

      /* SHELL */
      group.add(new THREE.Mesh(
       new THREE.SphereGeometry(0.85, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x1144aa, transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false })
      ));

      /* WIREFRAME */
      group.add(new THREE.Mesh(
       new THREE.SphereGeometry(0.85, 28, 18),
        new THREE.MeshBasicMaterial({ color: 0x1a6aff, wireframe: true, transparent: true, opacity: 0.08, depthWrite: false })
      ));

      /* RIM GLOW */
      scene.add(new THREE.Mesh(
       new THREE.SphereGeometry(0.88, 64, 64),
        new THREE.ShaderMaterial({
          vertexShader: `varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
          fragmentShader: `varying vec3 vN; void main(){ float r=1.-abs(dot(vN,vec3(0,0,1))); r=pow(r,6.0); gl_FragColor=vec4(0.1,0.45,1.0,r*0.5); }`,
          side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
        })
      ));

      /* NAME ON FLAT PLANE — always faces camera, stays horizontal */
      const nc = document.createElement('canvas');
      nc.width = 1024; nc.height = 128;
      const ntx = nc.getContext('2d');
      ntx.clearRect(0, 0, 1024, 128);

      // base pass
      ntx.shadowBlur = 0;
      ntx.fillStyle = '#4daaff';
      ntx.font = 'bold 123px Arial Black, Arial, sans-serif';
      ntx.textAlign = 'center';
      ntx.textBaseline = 'middle';
      ntx.fillText('SAMIRAN', 512, 64);

      // second pass — lighter for crispness
      ntx.fillStyle = '#aaddff';
      ntx.fillText('SAMIRAN', 512, 64);

      const nameTex = new THREE.CanvasTexture(nc);
      const namePlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.22),
        new THREE.MeshBasicMaterial({
          map: nameTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        })
      );
      group.add(namePlane);

      /* ORBIT RING */
      const orRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.0, 0.003, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0x2255ff, transparent: true, opacity: 0.3 })
      );
      orRing.rotation.x = Math.PI / 2.8;
      scene.add(orRing);

      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ddff })
      );
      scene.add(dotMesh);

      /* DRAG */
      let drag = false, px = 0, py = 0, vx = 0, vy = 0, rx = 0, ry = 0;
      canvas.addEventListener('mousedown', e => { drag = true; px = e.clientX; py = e.clientY; });
      window.addEventListener('mouseup', () => { drag = false; });
      window.addEventListener('mousemove', e => {
        if (!drag) return;
        vx = (e.clientY - py) * 0.005; vy = (e.clientX - px) * 0.005;
        rx += vx; ry += vy; rx = Math.max(-1.3, Math.min(1.3, rx));
        px = e.clientX; py = e.clientY;
      });
      canvas.addEventListener('touchstart', e => { drag = true; px = e.touches[0].clientX; py = e.touches[0].clientY; }, { passive: true });
      window.addEventListener('touchend', () => { drag = false; });
      window.addEventListener('touchmove', e => {
        if (!drag) return;
        vx = (e.touches[0].clientY - py) * 0.005; vy = (e.touches[0].clientX - px) * 0.005;
        rx += vx; ry += vy; rx = Math.max(-1.3, Math.min(1.3, rx));
        px = e.touches[0].clientX; py = e.touches[0].clientY;
      }, { passive: true });

      /* ANIMATE */
      let frame = 0;
      let animId;
      function animate() {
        animId = requestAnimationFrame(animate);
        frame++;
        const t = frame * 0.016;
        if (!drag) { vx *= 0.92; vy *= 0.92; ry += 0.004 + vy; rx += vx; rx = Math.max(-1.3, Math.min(1.3, rx)); }
        else { ry += vy; rx += vx; }
        group.rotation.y = ry;
        group.rotation.x = rx;

        /* keep name flat and always facing camera */
        namePlane.rotation.y = -ry;
        namePlane.rotation.x = -rx;

        orRing.rotation.y = ry * 0.3;
        const oa = t * 0.5;
        dotMesh.position.set(
          Math.cos(oa) * 1.0,
          Math.sin(oa) * 1.0 * Math.sin(orRing.rotation.x),
          Math.sin(oa) * 1.0 * Math.cos(orRing.rotation.x)
        );
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    };

    if (existingScript) {
      if (window.THREE) initGlobe();
      else existingScript.addEventListener('load', initGlobe);
    } else {
      const script = document.createElement('script');
      script.id = 'threejs-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initGlobe;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}