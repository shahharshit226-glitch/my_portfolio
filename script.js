// ── MOBILE NAV DRAWER ────────────────────────────────────────────────────────
const drawer = document.getElementById('nav-drawer');
const ham = document.getElementById('hamburger');
const drawerClose = document.getElementById('drawer-close');
ham.addEventListener('click',()=>{
  drawer.classList.add('open');
  document.body.classList.add('drawer-open');
});
drawerClose.addEventListener('click',()=>{
  drawer.classList.remove('open');
  document.body.classList.remove('drawer-open');
});
document.querySelectorAll('.drawer-link').forEach(a=>{
  a.addEventListener('click',()=>{
    drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
  });
});

// ── 3D HERO CANVAS ──────────────────────────────────────────────────────────
(function(){
  const canvas = document.getElementById('hero-canvas');
  const isMobile = window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.offsetWidth||window.innerWidth, canvas.offsetHeight||window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, (canvas.offsetWidth||window.innerWidth)/(canvas.offsetHeight||window.innerHeight), 0.1, 100);
  camera.position.set(0,0,5);

  // Main wireframe icosahedron
  const geoIco = new THREE.IcosahedronGeometry(1.6,1);
  const matIco = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,opacity:0.18,transparent:true});
  const ico = new THREE.Mesh(geoIco,matIco);
  scene.add(ico);

  // Inner solid with subtle glow
  const geoInner = new THREE.IcosahedronGeometry(0.9,0);
  const matInner = new THREE.MeshBasicMaterial({color:0x63dcb4,wireframe:true,opacity:0.12,transparent:true});
  const inner = new THREE.Mesh(geoInner,matInner);
  scene.add(inner);

  // Outer ring
  const geoRing = new THREE.TorusGeometry(2.4,0.005,2,80);
  const matRing = new THREE.MeshBasicMaterial({color:0xffffff,opacity:0.08,transparent:true});
  const ring3d = new THREE.Mesh(geoRing,matRing);
  ring3d.rotation.x=Math.PI/2;
  scene.add(ring3d);

  // Floating particles
  if(!isMobile){
    const ptGeo = new THREE.BufferGeometry();
    const count = 200;
    const pos = new Float32Array(count*3);
    for(let i=0;i<count;i++){
      pos[i*3]=(Math.random()-0.5)*14;
      pos[i*3+1]=(Math.random()-0.5)*14;
      pos[i*3+2]=(Math.random()-0.5)*14;
    }
    ptGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const ptMat = new THREE.PointsMaterial({color:0xffffff,size:0.025,opacity:0.35,transparent:true});
    scene.add(new THREE.Points(ptGeo,ptMat));
  }

  let targetRX=0,targetRY=0;
  document.addEventListener('mousemove',e=>{
    targetRY=(e.clientX/window.innerWidth-0.5)*0.6;
    targetRX=-(e.clientY/window.innerHeight-0.5)*0.4;
  });

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.004;
    ico.rotation.y+=0.003;
    ico.rotation.x+=0.001;
    inner.rotation.y-=0.006;
    inner.rotation.z+=0.004;
    ring3d.rotation.z+=0.001;
    scene.rotation.x+=(targetRX-scene.rotation.x)*0.04;
    scene.rotation.y+=(targetRY-scene.rotation.y)*0.04;
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    const hero=document.getElementById('hero');
    const w=hero.offsetWidth,h=hero.offsetHeight;
    camera.aspect=w/h;camera.updateProjectionMatrix();
    renderer.setSize(w,h);
  });
})();

// ── PROJECT CARDS 3D TILT (desktop only) ────────────────────────────────────
if(window.matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=e.clientX-r.left,y=e.clientY-r.top;
      const cx=r.width/2,cy=r.height/2;
      const rotX=-(y-cy)/cx*6;
      const rotY=(x-cx)/cx*6;
      card.style.transform=`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.setProperty('--mx',`${x/r.width*100}%`);
      card.style.setProperty('--my',`${y/r.height*100}%`);
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });
}

// ── SCROLL REVEALS ───────────────────────────────────────────────────────────
const revEls=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
},{threshold:0.1});
revEls.forEach(el=>obs.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit',async function(e){
  e.preventDefault();
  const form = this;
  const btn = form.querySelector('.form-submit');
  const originalText = btn.textContent;

  const name  = form.querySelector('input[type=text]').value.trim();
  const email = form.querySelector('input[type=email]').value.trim();
  const msg   = form.querySelector('textarea').value.trim();

  if (!name || !email || !msg) return;

  // Disable button + show sending state
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xrbpgrey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message: msg })
    });

    if (res.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    btn.textContent = 'Error – Try Again';
    btn.style.background = '#dc2626';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2500);
  }
});

// ── SMOOTH NAV ────────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});} 
  });
});
