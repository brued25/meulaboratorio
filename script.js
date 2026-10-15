// script.js - cena 3D estilo galáxia roxa + loader + filtros + modal + synth
(function(){
  // --- three.js setup ---
  const canvas = document.getElementById('bg');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // transparent, canvas over gradient

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 2000);
  camera.position.set(0,0,80);

  // subtle ambient + point light
  scene.add(new THREE.AmbientLight(0x553366, 0.6));
  const pl = new THREE.PointLight(0xffccff, 1.2, 300); pl.position.set(30,20,40); scene.add(pl);

  // resize handling
  function resize(){
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w,h);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();

  // --- starfield (points) ---
  const starCount = 1800;
  const starsGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount*3);
  const colors = new Float32Array(starCount*3);
  const sizes = new Float32Array(starCount);
  for(let i=0;i<starCount;i++){
    const r = 60 + Math.random()*420; // spread
    const theta = Math.random()*Math.PI*2;
    const phi = (Math.random()-0.5)*Math.PI;
    const x = r*Math.cos(theta)*Math.cos(phi);
    const y = r*Math.sin(phi);
    const z = r*Math.sin(theta)*Math.cos(phi);
    positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
    const c = new THREE.Color().setHSL(0.75 + Math.random()*0.12, 0.6 + Math.random()*0.4, 0.5 + Math.random()*0.3);
    colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    sizes[i]=1 + Math.random()*3;
  }
  starsGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  starsGeo.setAttribute('color', new THREE.BufferAttribute(colors,3));
  starsGeo.setAttribute('size', new THREE.BufferAttribute(sizes,1));

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: { pointTexture: { value: createStarSprite() }, uTime: { value: 0 } },
    vertexShader: `attribute float size; varying vec3 vColor; uniform float uTime; void main(){ vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (300.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }`,
    fragmentShader: `uniform sampler2D pointTexture; varying vec3 vColor; void main(){ vec4 t = texture2D(pointTexture, gl_PointCoord); gl_FragColor = vec4(vColor * 1.2, 1.0) * t; }`,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    transparent: true,
    vertexColors: true
  });
  const starPoints = new THREE.Points(starsGeo, starMaterial);
  scene.add(starPoints);

  // --- central nebula sprite layers (canvas-generated textures) ---
  function makeNebulaSprite(size, colors){
    const c = document.createElement('canvas'); c.width = c.height = size; const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(size/2, size/2, size*0.05, size/2, size/2, size*0.95);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(0.4, colors[1]);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,size,size);
    return new THREE.CanvasTexture(c);
  }
  function createNebula(size, colA, colB, z, rotation){
    const tex = makeNebulaSprite(size, [colA, colB]);
    const mat = new THREE.SpriteMaterial({map: tex, blending: THREE.AdditiveBlending, depthWrite:false, opacity:0.95});
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(size*0.15, size*0.15, 1).multiplyScalar(1.2);
    sprite.position.set(0, -5, z);
    sprite.material.rotation = rotation;
    scene.add(sprite);
    return sprite;
  }
  const nebula1 = createNebula(2048, '#8a2be2', '#b57cff', -20, 0.2);
  const nebula2 = createNebula(2048, '#4b0066', '#7a2db8', -40, -0.5);

  // --- small laboratory 'platform' (stylized) ---
  const labGroup = new THREE.Group();
  scene.add(labGroup);
  const platformGeo = new THREE.CylinderGeometry(14,14,2,64);
  const platform = new THREE.Mesh(platformGeo, new THREE.MeshStandardMaterial({color:0x200022, metalness:0.3, roughness:0.6}));
  platform.position.y = -18; labGroup.add(platform);
  // glowing orb on platform
  const orbGeo = new THREE.SphereGeometry(4.2,48,32);
  const orbMat = new THREE.MeshStandardMaterial({color:0xca7bff, emissive:0x8f3be6, emissiveIntensity:0.9, roughness:0.2, metalness:0.2});
  const orb = new THREE.Mesh(orbGeo, orbMat); orb.position.set(0,-12,0); labGroup.add(orb);

  // thin rotating rings
  const ringGeo = new THREE.RingGeometry(6.2,6.8,64);
  const ringMat = new THREE.MeshBasicMaterial({color:0xd7b3ff, side:THREE.DoubleSide, transparent:true, opacity:0.14});
  const ring = new THREE.Mesh(ringGeo, ringMat); ring.rotation.x = Math.PI/2; ring.position.set(0,-10,0); labGroup.add(ring);

  // tiny floating panels
  const panelGeo = new THREE.BoxGeometry(3.6,1.8,0.15);
  const panelMat = new THREE.MeshStandardMaterial({color:0x8b5cff, emissive:0x2d003a, emissiveIntensity:0.4, roughness:0.3});
  for(let i=0;i<4;i++){
    const p = new THREE.Mesh(panelGeo, panelMat);
    p.position.set(Math.cos(i*Math.PI/2)*8, -8 + (i%2)*1, Math.sin(i*Math.PI/2)*6);
    p.rotation.y = i*0.6;
    labGroup.add(p);
  }

  // animation loop
  let time = 0;
  function animate(){
    requestAnimationFrame(animate);
    time += 0.006;
    // rotate starfield slowly
    starPoints.rotation.y = time*0.02;
    nebula1.material.rotation += 0.0006;
    nebula2.material.rotation -= 0.0004;
    labGroup.rotation.y = Math.sin(time*0.5)*0.12;
    orb.rotation.y += 0.009;
    renderer.render(scene, camera);
  }
  animate();

  // helper: create a soft circular sprite for stars
  function createStarSprite(){
    const size = 128;
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size; const ctx = canvas.getContext('2d');
    const grd = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
    grd.addColorStop(0,'rgba(255,255,255,1)');
    grd.addColorStop(0.2,'rgba(200,170,255,0.9)');
    grd.addColorStop(0.6,'rgba(120,60,160,0.25)');
    grd.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0,0,size,size);
    return new THREE.CanvasTexture(canvas);
  }

  // interactive parallax on mouse move
  let targetX = 0, targetY = 0;
  addEventListener('pointermove', (e)=>{
    const nx = (e.clientX / innerWidth - 0.5) * 2;
    const ny = (e.clientY / innerHeight - 0.5) * -2;
    targetX = nx * 6; targetY = ny * 3;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0,0,0);
  });

  // --- rest of app: loader, filters, modal, synth (kept from previous) ---
  const grid = document.getElementById('grid');
  const filters = document.querySelectorAll('.filters .btn');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCategory = document.getElementById('modalCategory');
  const modalMedia = document.getElementById('modalMedia');
  const modalLink = document.getElementById('modalLink');
  const playSoundBtn = document.getElementById('playSound');

  let projects = [];

  async function fetchProjects(){
    try{ const res = await fetch('/projects.json'); if(res.ok) return await res.json(); }catch(e){console.warn('projects.json not found or failed to load', e)}
    return [];
  }
  function loadLocalProjects(){ try{ const raw = localStorage.getItem('local_projects'); return raw?JSON.parse(raw):[] }catch(e){return []} }
  function saveLocalProjects(list){ localStorage.setItem('local_projects',JSON.stringify(list)); }

  function renderGrid(list){
    grid.innerHTML = '';
    if(list.length===0){
      grid.innerHTML = '<p style="opacity:0.9">Nenhum projeto encontrado. Adicione um no formulário ou atualize <code>projects.json</code>.</p>';
      return;
    }
    list.forEach((item,idx)=>{
      const card = document.createElement('article'); card.className = 'card';
      const thumb = document.createElement('div'); thumb.className='thumb';
      if(item.image){ const img = document.createElement('img'); img.src = item.image; img.alt = item.title || 'thumb'; thumb.appendChild(img); }
      else{ thumb.innerHTML = '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="160" height="100" fill="#3b0a4a"/><g fill="#d9c2ff" opacity="0.9"><circle cx="40" cy="40" r="16"/><rect x="70" y="20" width="70" height="20" rx="6"/></g></svg>'; }
      const h3 = document.createElement('h3'); h3.textContent = item.title || 'Sem título';
      const meta = document.createElement('div'); meta.className='meta'; meta.textContent = item.category || 'Geral';
      const p = document.createElement('p'); p.textContent = item.description || '';
      const actions = document.createElement('div'); actions.style.marginTop = '12px';
      const viewBtn = document.createElement('button'); viewBtn.className='btn'; viewBtn.textContent='Abrir detalhes'; viewBtn.addEventListener('click', ()=> openModal(item)); actions.appendChild(viewBtn);
      if(item.link){ const a = document.createElement('a'); a.href = item.link; a.target='_blank'; a.rel='noopener'; a.className='btn'; a.style.marginLeft='8px'; a.textContent='Ir para projeto'; actions.appendChild(a); }
      card.appendChild(thumb); card.appendChild(h3); card.appendChild(meta); card.appendChild(p); card.appendChild(actions); grid.appendChild(card);
    });
  }

  function applyFilter(cat){ const list = projects.filter(p => (cat==='all' || (p.category||'Geral')===cat)); renderGrid(list); }
  filters.forEach(btn=>{ btn.addEventListener('click', ()=>{ filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); applyFilter(btn.dataset.cat); }); });

  function openModal(item){ modal.setAttribute('aria-hidden','false'); modalTitle.textContent = item.title || ''; modalDesc.textContent = item.description || ''; modalCategory.textContent = item.category || ''; modalLink.href = item.link || '#'; modalLink.style.display = item.link? 'inline-block':'none'; modalMedia.innerHTML = ''; if(item.image){ const img = document.createElement('img'); img.src = item.image; img.alt = item.title || ''; modalMedia.appendChild(img); } else { modalMedia.innerHTML = '<div style="padding:12px;color:#fff;opacity:0.9">Sem mídia</div>'; } }
  document.getElementById('modalClose').addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); stopSound(); });
  modal.addEventListener('click', (e)=>{ if(e.target===modal){ modal.setAttribute('aria-hidden','true'); stopSound(); }});

  // simple web audio synth
  let audioCtx=null, osc=null, gainNode=null;
  function startSound(){ if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)(); if(osc) stopSound(); osc = audioCtx.createOscillator(); gainNode = audioCtx.createGain(); osc.type = 'sawtooth'; osc.frequency.value = 220 + Math.random()*260; gainNode.gain.value = 0.0001; osc.connect(gainNode); gainNode.connect(audioCtx.destination); osc.start(); gainNode.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.2); }
  function stopSound(){ if(gainNode) try{ gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2); }catch(e){} if(osc){ setTimeout(()=>{ try{osc.stop(); osc.disconnect(); }catch(e){} osc=null; },300); } }
  playSoundBtn.addEventListener('click', ()=>{ if(!osc) startSound(); else stopSound(); });

  // form handling local
  const form = document.getElementById('addForm');
  form.addEventListener('submit', (ev)=>{ ev.preventDefault(); const data = new FormData(form); const item = { title: data.get('title'), category: data.get('category'), description: data.get('description'), link: data.get('link') }; const local = loadLocalProjects(); local.unshift(item); saveLocalProjects(local); projects = mergeProjects(initialRemote, local); applyFilter(document.querySelector('.filters .btn.active').dataset.cat); form.reset(); });
  document.getElementById('clearLocal').addEventListener('click', ()=>{ localStorage.removeItem('local_projects'); projects = mergeProjects(initialRemote,[]); applyFilter('all'); });
  function mergeProjects(remote, local){ return [...(local||[]), ...(remote||[])]; }

  // bootstrap loading
  let initialRemote = [];
  (async ()=>{ const remote = await fetchProjects(); const local = loadLocalProjects(); initialRemote = remote; projects = mergeProjects(remote, local); applyFilter('all'); })();
})();
