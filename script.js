// script.js - three.js background + carregador de projetos + filtros + modal + form localStorage
(function(){
  // --- 3D background using global THREE ---
  const canvas = document.getElementById('bg');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x12021a, 0.02);

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
    lab.rotation.y = Math.sin(t*0.7)*0.18;
    orb.rotation.y += 0.012;
    orb.position.y = 2 + Math.sin(t*1.3)*0.58;
    renderer.render(scene,camera);
  }
  animate();

  // --- projects loader, filters, modal, form ---
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
    try{
      const res = await fetch('/projects.json');
      if(res.ok){
        const data = await res.json();
        return data;
      }
    }catch(e){console.warn('projects.json not found or failed to load')}
    return [];
  }

  function loadLocalProjects(){
    try{
      const raw = localStorage.getItem('local_projects');
      return raw?JSON.parse(raw):[];
    }catch(e){return []}
  }

  function saveLocalProjects(list){
    localStorage.setItem('local_projects',JSON.stringify(list));
  }

  function renderGrid(list){
    grid.innerHTML = '';
    if(list.length===0){
      grid.innerHTML = '<p style="opacity:0.9">Nenhum projeto encontrado. Adicione um no formulário ou atualize <code>projects.json</code>.</p>';
      return;
    }
    list.forEach((item,idx)=>{
      const card = document.createElement('article');
      card.className = 'card';

      const thumb = document.createElement('div'); thumb.className='thumb';
      if(item.image){
        const img = document.createElement('img'); img.src = item.image; img.alt = item.title || 'thumb';
        thumb.appendChild(img);
      }else{
        thumb.innerHTML = '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="160" height="100" fill="#4b1f65"/><g fill="#d9c2ff" opacity="0.9"><circle cx="40" cy="40" r="16"/><rect x="70" y="20" width="70" height="20" rx="6"/></g></svg>';
      }

      const h3 = document.createElement('h3'); h3.textContent = item.title || 'Sem título';
      const meta = document.createElement('div'); meta.className='meta'; meta.textContent = item.category || 'Geral';
      const p = document.createElement('p'); p.textContent = item.description || '';

      const actions = document.createElement('div'); actions.style.marginTop = '12px';
      const viewBtn = document.createElement('button'); viewBtn.className='btn'; viewBtn.textContent='Abrir detalhes';
      viewBtn.addEventListener('click', ()=> openModal(item));
      actions.appendChild(viewBtn);
      if(item.link){
        const a = document.createElement('a'); a.href = item.link; a.target='_blank'; a.rel='noopener'; a.className='btn'; a.style.marginLeft='8px'; a.textContent='Ir para projeto';
        actions.appendChild(a);
      }

      card.appendChild(thumb);
      card.appendChild(h3);
      card.appendChild(meta);
      card.appendChild(p);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function applyFilter(cat){
    const list = projects.filter(p => (cat==='all' || (p.category||'Geral')===cat));
    renderGrid(list);
  }

  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      applyFilter(cat);
    });
  });

  function openModal(item){
    modal.setAttribute('aria-hidden','false');
    modalTitle.textContent = item.title || '';
    modalDesc.textContent = item.description || '';
    modalCategory.textContent = item.category || '';
    modalLink.href = item.link || '#';
    modalLink.style.display = item.link? 'inline-block':'none';
    modalMedia.innerHTML = '';
    if(item.image){
      const img = document.createElement('img'); img.src = item.image; img.alt = item.title || '';
      modalMedia.appendChild(img);
    }else{
      modalMedia.innerHTML = '<div style="padding:12px;color:#fff;opacity:0.9">Sem mídia</div>';
    }
  }

  document.getElementById('modalClose').addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); stopSound(); });
  modal.addEventListener('click', (e)=>{ if(e.target===modal){ modal.setAttribute('aria-hidden','true'); stopSound(); }});

  // --- simple web audio synth for modal ---
  let audioCtx=null, osc=null, gainNode=null;
  function startSound(){
    if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    if(osc) stopSound();
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 220 + Math.random()*220;
    gainNode.gain.value = 0.0001;
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    // ramp up
    gainNode.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.2);
  }
  function stopSound(){
    if(gainNode) try{ gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2); }catch(e){}
    if(osc){ setTimeout(()=>{ try{osc.stop(); osc.disconnect(); }catch(e){} osc=null; },300); }
  }
  playSoundBtn.addEventListener('click', ()=>{
    if(!osc) startSound(); else stopSound();
  });

  // --- form handling (local storage) ---
  const form = document.getElementById('addForm');
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const data = new FormData(form);
    const item = { title: data.get('title'), category: data.get('category'), description: data.get('description'), link: data.get('link') };
    const local = loadLocalProjects(); local.unshift(item); saveLocalProjects(local);
    projects = mergeProjects(initialRemote, local);
    applyFilter(document.querySelector('.filters .btn.active').dataset.cat);
    form.reset();
  });
  document.getElementById('clearLocal').addEventListener('click', ()=>{ localStorage.removeItem('local_projects'); projects = mergeProjects(initialRemote,[]); applyFilter('all'); });

  // merge helper
  function mergeProjects(remote, local){
    return [...(local||[]), ...(remote||[])];
  }

  // bootstrap
  let initialRemote = [];
  (async ()=>{
    const remote = await fetchProjects();
    const local = loadLocalProjects();
    initialRemote = remote;
    projects = mergeProjects(remote, local);
    applyFilter('all');
  })();
})();
