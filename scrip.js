const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
menuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

// Simple route switching (demo only)
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const crumb = document.getElementById('crumb');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const route = item.getAttribute('data-route');
    const title = route.charAt(0).toUpperCase() + route.slice(1);
    pageTitle.textContent = title;
    crumb.textContent = title;
  });
});

// Export table to CSV
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
  const rows = Array.from(document.querySelectorAll('#oppsTable tr'))
    .map(tr => Array.from(tr.children).map(td => '"' + td.textContent.replace(/"/g,'""') + '"').join(','))
    .join('
');
  const blob = new Blob([rows], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'opportunities.csv';
  a.click();
  URL.revokeObjectURL(a.href);
});

// Refresh demo KPIs with micro-anim
const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', () => {
  const r = () => Math.floor(Math.random()*400+100);
  const bump = el => { el.style.transition='transform .15s'; el.style.transform='scale(1.05)'; setTimeout(()=>{el.style.transform='';}, 160); };
  const leads = document.getElementById('kpiLeads'); leads.textContent = r(); bump(leads);
  const opps = document.getElementById('kpiOpps'); opps.textContent = Math.floor(Math.random()*120+40); bump(opps);
  const close = document.getElementById('kpiClose'); close.textContent = Math.floor(Math.random()*40+10) + '%'; bump(close);
  const rev = document.getElementById('kpiRevenue'); rev.textContent = '$' + (Math.random()*90+10).toFixed(1) + 'k'; bump(rev);
});

// Minimal chart (pure Canvas, blue line, black text)
const ctx = document.getElementById('pipelineChart').getContext('2d');
const data = [8,12,10,14,18,16];
const labels = ['W1','W2','W3','W4','W5','W6'];

function drawChart(){
  const c = ctx.canvas; const w = c.width = c.clientWidth; const h = c.height = c.clientHeight;
  ctx.clearRect(0,0,w,h);

  // axes
  const styles = getComputedStyle(document.documentElement);
  ctx.strokeStyle = styles.getPropertyValue('--border');
  ctx.fillStyle = styles.getPropertyValue('--text');
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40,10); ctx.lineTo(40,h-30); ctx.lineTo(w-10,h-30); ctx.stroke();

  // line
  const max = Math.max(...data) * 1.2;
  const stepX = (w-60)/(data.length-1);
  ctx.strokeStyle = styles.getPropertyValue('--blue');
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  data.forEach((v,i)=>{
    const x = 40 + i*stepX;
    const y = (h-30) - (v/max)*(h-50);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // points & labels
  ctx.fillStyle = styles.getPropertyValue('--blue');
  data.forEach((v,i)=>{
    const x = 40 + i*stepX;
    const y = (h-30) - (v/max)*(h-50);
    ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
  });
  ctx.fillStyle = styles.getPropertyValue('--text');
  ctx.font = '12px system-ui, sans-serif';
  labels.forEach((_,i)=>{
    const x = 40 + i*stepX;
    ctx.fillText(labels[i], x-8, h-10);
  });
}

drawChart();
window.addEventListener('resize', drawChart);

// Simple search (filters table rows) with row reveal
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('#oppsTable tbody tr').forEach(tr =>{
    const match = tr.textContent.toLowerCase().includes(q);
    tr.style.display = match ? '' : 'none';
    if(match){
      tr.style.animation='fadeInUp .25s ease both';
      setTimeout(()=>{tr.style.animation='';}, 260);
    }
  })
});

// Placeholder for + New action
const newBtn = document.getElementById('newBtn');
newBtn.addEventListener('click', ()=>{
  alert('Create modal would open here.');
});
