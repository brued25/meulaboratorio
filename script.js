// script.js - three.js background + carregador de projetos
import * as THREE from 'three';

(function(){
  // --- 3D background ---
  const canvas = document.getElementById('bg');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x18021e, 0.02);

  const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 2000);
  camera.position.set(0,0,60);

  const light = new THREE.DirectionalLight(0xffe6ff, 0.9);
  light.position.set(5,10,7);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x402748,0.8));

  // central "laboratory" group
  const lab = new THREE.Group();
  scene.add(lab);

  const glossyMat = new THREE.MeshStandardMaterial({color:0xbd7bff,metalness:0.6,roughness:0.15,transparent:true,opacity:0.95});
  const glassMat = new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:0.8,opacity:0.9,metalness:0.1,roughness:0.05,clearcoat:0.3});

  // base platform
  const baseGeo = new THREE.CylinderGeometry(18,18,2,64);
  const base = new THREE.Mesh(baseGeo,new THREE.MeshStandardMaterial({color:0x2c0b3a,metalness:0.2,roughness:0.6}));
  base.position.y=-10;lab.add(base);

  // flasks/test tubes (simple shapes)
  const flaskGeo = new THREE.ConeGeometry(2.2,6,32);
  for(let i=0;i<6;i++){
    const m = new THREE.Mesh(flaskGeo,glassMat);
    const a = (i/6)*Math.PI*2;
    const r = 8+Math.sin(i)*1.6;
    m.position.set(Math.cos(a)*r, -6 + (i%2)*0.6, Math.sin(a)*r);
    m.rotation.x = Math.PI;
    lab.add(m);
  }

  // floating orb
  const orb = new THREE.Mesh(new THREE.SphereGeometry(4,48,32),glossyMat);
  orb.position.set(0,2,0);
  lab.add(orb);

  // little orbiting particles
  const pGeo = new THREE.SphereGeometry(0.18,10,8);
  for(let i=0;i<30;i++){
    const p = new THREE.Mesh(pGeo,new THREE.MeshStandardMaterial({color:0xffd3ff,emissive:0x5f2f6e,roughness:0.4}));
    const a = Math.random()*Math.PI*2;
    const dist = 10 + Math.random()*12;
    p.position.set(Math.cos(a)*dist, (Math.random()-0.5)*8, Math.sin(a)*dist);
    scene.add(p);
  }

  // resize
  function resize(){
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w,h);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();

  // animation
  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t += 0.005;
    lab.rotation.y = Math.sin(t*0.7)*0.2;
    orb.rotation.y += 0.01;
    orb.position.y = 2 + Math.sin(t*1.3)*0.6;
    renderer.render(scene,camera);
  }
  animate();

  // --- carregar projetos (projects.json) e popular grid ---
  async function loadProjects(){
    try{
      const res = await fetch('/projects.json');
      if(!res.ok) throw new Error('Falha ao carregar projects.json');
      const data = await res.json();
      const grid = document.getElementById('grid');
      grid.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        const h3 = document.createElement('h3'); h3.textContent = item.title || 'Sem título';
        const meta = document.createElement('div'); meta.className='meta'; meta.textContent = item.category || 'Geral';
        const p = document.createElement('p'); p.textContent = item.description || '';
        card.appendChild(h3); card.appendChild(meta); card.appendChild(p);
        if(item.link){
          const a = document.createElement('a'); a.href = item.link; a.target='_blank'; a.rel='noopener'; a.textContent='Ver projeto';
          card.appendChild(a);
        }
        grid.appendChild(card);
      });
    }catch(e){
      console.error(e);
    }
  }
  loadProjects();
})();
