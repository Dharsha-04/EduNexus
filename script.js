

/* ============================================================
   DATA & CONFIG
============================================================ */
const ROLES = {
  admin: {
    name: 'Sarah Johnson', initials: 'SJ', email: 'admin@edunexus.io',
    label: 'Platform Admin',
    nav: [
      { id:'admin-dashboard', icon:'bi-speedometer2', label:'Dashboard' },
      { id:'admin-users',     icon:'bi-people',        label:'Users' },
      { id:'admin-courses',   icon:'bi-journals',      label:'Courses' },
      { id:'admin-analytics', icon:'bi-bar-chart-line', label:'Analytics' },
      { id:'settings',        icon:'bi-gear',          label:'Settings' },
    ]
  },
  instructor: {
    name: 'Dr. Priya Mehta', initials: 'PM', email: 'priya@edunexus.io',
    label: 'Senior Instructor',
    nav: [
      { id:'instructor-dashboard', icon:'bi-speedometer2', label:'Dashboard' },
      { id:'instructor-mycourses', icon:'bi-journals',     label:'My Courses' },
      { id:'instructor-students',  icon:'bi-people',       label:'My Students' },
      { id:'settings',             icon:'bi-gear',         label:'Settings' },
    ]
  },
  student: {
    name: 'Arjun Kumar', initials: 'AK', email: 'arjun@edunexus.io',
    label: 'Student',
    nav: [
      { id:'student-dashboard', icon:'bi-speedometer2',  label:'My Hub' },
      { id:'student-courses',   icon:'bi-grid',          label:'Catalogue' },
      { id:'student-progress',  icon:'bi-graph-up',      label:'My Progress' },
      { id:'settings',          icon:'bi-gear',          label:'Settings' },
    ]
  }
};

const COURSES_DATA = [
  { emoji:'⚛️', title:'React Advanced Patterns', instructor:'Dr. Priya Mehta', students:128, category:'Tech', progress:72, color:'#5b55c8' },
  { emoji:'🤖', title:'ML Fundamentals with Python', instructor:'Rahul Kapoor', students:215, category:'Tech', progress:45, color:'#14b87a' },
  { emoji:'🎨', title:'UI/UX Design Systems', instructor:'Ananya Roy', students:94, category:'Design', progress:88, color:'#f25c78' },
  { emoji:'📊', title:'Data Visualization Mastery', instructor:'Dr. Priya Mehta', students:176, category:'Tech', progress:60, color:'#38b6f5' },
  { emoji:'🐍', title:'Python Bootcamp 2026', instructor:'Vikram Shah', students:302, category:'Tech', progress:30, color:'#f5a623' },
  { emoji:'📈', title:'Business Analytics Pro', instructor:'Kavya Nair', students:89, category:'Business', progress:15, color:'#a855f7' },
];

const USERS_DATA = [
  { initials:'AK', name:'Arjun Kumar',  bg:'linear-gradient(135deg,#5b55c8,#322e82)', email:'arjun@edunexus.io',  role:'Student',    courses:3, last:'2h ago',   status:'active' },
  { initials:'SP', name:'Sneha Patel',  bg:'linear-gradient(135deg,#14b87a,#0d7a52)', email:'sneha@edunexus.io',  role:'Instructor', courses:7, last:'1d ago',   status:'active' },
  { initials:'RN', name:'Raj Nair',     bg:'linear-gradient(135deg,#f25c78,#c2185b)', email:'raj@edunexus.io',    role:'Student',    courses:1, last:'3d ago',   status:'pending' },
  { initials:'PM', name:'Priya M.',     bg:'linear-gradient(135deg,#38b6f5,#0d7ab5)', email:'priya@edunexus.io',  role:'Instructor', courses:4, last:'6h ago',   status:'active' },
  { initials:'VS', name:'Vikram S.',    bg:'linear-gradient(135deg,#f5a623,#e8920a)', email:'vikram@edunexus.io', role:'Admin',      courses:0, last:'Just now', status:'active' },
  { initials:'KN', name:'Kavya Nair',   bg:'linear-gradient(135deg,#a855f7,#7c3aed)', email:'kavya@edunexus.io',  role:'Instructor', courses:2, last:'2d ago',   status:'inactive' },
  { initials:'MS', name:'Mihir Shah',   bg:'linear-gradient(135deg,#5b55c8,#322e82)', email:'mihir@edunexus.io',  role:'Student',    courses:5, last:'1h ago',   status:'active' },
];

const ACHIEVEMENTS = [
  { icon:'🔥', name:'14-Day Streak',    desc:'Study 14 days in a row',      color:'rgba(245,166,35,.15)',  border:'rgba(245,166,35,.3)' },
  { icon:'🏆', name:'Top Student',      desc:'Ranked #1 in React course',   color:'rgba(245,166,35,.15)',  border:'rgba(245,166,35,.3)' },
  { icon:'⚡', name:'Fast Learner',     desc:'Completed a course in 7 days', color:'rgba(56,182,245,.15)', border:'rgba(56,182,245,.3)' },
  { icon:'🎓', name:'Certified',        desc:'Earned 3 certificates',        color:'rgba(20,184,122,.15)', border:'rgba(20,184,122,.3)' },
  { icon:'💬', name:'Active Discusser', desc:'50+ forum posts',             color:'rgba(91,85,200,.2)',   border:'rgba(91,85,200,.3)' },
  { icon:'🌟', name:'Perfect Score',    desc:'100% on a quiz',              color:'rgba(242,92,120,.15)', border:'rgba(242,92,120,.3)' },
];

let currentRole = 'admin';
let chartsInited = {};

/* ============================================================
   LOGIN
============================================================ */
document.querySelectorAll('.role-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.role-chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentRole = btn.dataset.role;
    const emails = {admin:'admin@edunexus.io',instructor:'instructor@edunexus.io',student:'student@edunexus.io'};
    document.getElementById('loginEmail').value = emails[currentRole];
  });
});

document.getElementById('btnLogin').addEventListener('click', () => {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appLayout').style.display = 'flex';
  initApp();
});

/* ============================================================
   APP INIT
============================================================ */
function initApp() {
  const role = ROLES[currentRole];

  // Sidebar
  const badge = document.getElementById('sidebarRoleBadge');
  badge.textContent = role.label;
  badge.className = `sidebar-role-badge badge-${currentRole}`;

  // Avatar
  const avHtml = `<span>${role.initials}</span>`;
  document.getElementById('userAvatar').innerHTML = avHtml;
  document.getElementById('userAvatar').className = `user-avatar avatar-${currentRole}`;
  document.getElementById('userName').textContent = role.name;
  document.getElementById('userRoleLbl').textContent = role.label;

  // Settings
  const sa = document.getElementById('settingsAvatar');
  sa.innerHTML = role.initials;
  sa.className = `avatar-${currentRole}`;
  sa.style.cssText = `width:60px;height:60px;font-size:22px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:800`;
  document.getElementById('settingsName').textContent = role.name;
  document.getElementById('settingsRole').textContent = role.label;
  document.getElementById('settingsNameInput').value = role.name;
  document.getElementById('settingsEmailInput').value = role.email;

  // Nav
  const navContainer = document.getElementById('navItems');
  navContainer.innerHTML = '';
  role.nav.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'nav-item-btn' + (idx===0?' active':'');
    btn.dataset.section = item.id;
    btn.innerHTML = `<i class="bi ${item.icon}"></i>${item.label}`;
    btn.addEventListener('click', () => navigateTo(item.id, item.label));
    navContainer.appendChild(btn);
  });

  // Populate tables & grids
  populateUserTable();
  populateCourseGrids();
  populateStudents();
  populateTimeline();
  populateTopStudents();
  populateLeaderboard();
  populateAchievements();

  // Show first section
  navigateTo(role.nav[0].id, role.nav[0].label);
}

/* ============================================================
   NAVIGATION
============================================================ */
function navigateTo(sectionId, label) {
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item-btn').forEach(b=>b.classList.remove('active'));

  const target = document.getElementById(`section-${sectionId}`);
  if (target) {
    target.classList.add('active');
    target.querySelectorAll('.fade-in').forEach(el => {
      el.style.animation='none'; el.offsetHeight; el.style.animation='';
    });
  }

  document.querySelectorAll('.nav-item-btn').forEach(b => {
    if (b.dataset.section === sectionId) b.classList.add('active');
  });
  document.getElementById('topBarTitle').textContent = label || sectionId;

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebarOverlay').classList.remove('active');

  // Init charts lazily
  setTimeout(() => initChartsFor(sectionId), 80);
}

/* ============================================================
   SIDEBAR TOGGLE
============================================================ */
document.getElementById('btnToggle').addEventListener('click', () => {
  const sb = document.getElementById('sidebar');
  const mc = document.getElementById('mainContent');
  const ov = document.getElementById('sidebarOverlay');
  if (window.innerWidth >= 992) {
    sb.classList.toggle('collapsed');
    mc.classList.toggle('expanded');
  } else {
    sb.classList.toggle('mobile-open');
    ov.classList.toggle('active');
  }
});
document.getElementById('sidebarOverlay').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebarOverlay').classList.remove('active');
});
document.getElementById('btnLogout').addEventListener('click', () => {
  document.getElementById('appLayout').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  chartsInited = {};
});

/* ============================================================
   POPULATE FUNCTIONS
============================================================ */
function populateUserTable() {
  const body = document.getElementById('userTableBody');
  if (!body) return;
  body.innerHTML = USERS_DATA.map(u => `
    <tr>
      <td><div class="d-flex align-items-center gap-2">
        <div class="avatar-sm" style="background:${u.bg}">${u.initials}</div>${u.name}
      </div></td>
      <td style="color:var(--text-muted);font-size:12px">${u.email}</td>
      <td><span class="tag ${u.role==='Student'?'tag-primary':u.role==='Instructor'?'tag-active':'tag-inactive'}">${u.role}</span></td>
      <td style="color:var(--indigo-200)">${u.courses}</td>
      <td style="color:var(--text-muted);font-size:12px">${u.last}</td>
      <td><span class="tag tag-${u.status}">${u.status}</span></td>
      <td><button class="btn-ghost" style="padding:4px 12px;font-size:11px">Edit</button></td>
    </tr>
  `).join('');
}

function courseCardHTML(c, showProgress = true) {
  const cats = {Tech:'tag-primary',Design:'tag-inactive',Business:'tag-active'};
  return `
    <div class="course-card">
      <div class="course-thumb" style="background:linear-gradient(135deg,${c.color}22,${c.color}44)">${c.emoji}</div>
      <div class="course-body">
        <div class="course-tag" style="background:${c.color}22;color:${c.color}">${c.category}</div>
        <div class="course-title">${c.title}</div>
        <div class="course-meta"><i class="bi bi-person me-1"></i>${c.instructor} · ${c.students} students</div>
        ${showProgress ? `
          <div class="d-flex justify-content-between mb-1"><span class="course-progress-lbl">Progress</span><span class="course-progress-lbl">${c.progress}%</span></div>
          <div class="prog-wrap"><div class="prog-fill" style="width:${c.progress}%;background:${c.color}"></div></div>
        ` : ''}
        <div class="course-footer">
          <button class="btn-primary-lms" style="padding:7px 14px;font-size:12px">${showProgress?'Continue':'Enrol Now'}</button>
          <span style="font-size:11px;color:var(--text-muted)"><i class="bi bi-star-fill" style="color:var(--amber)"></i> 4.${Math.floor(Math.random()*3)+6}</span>
        </div>
      </div>
    </div>`;
}

function populateCourseGrids() {
  ['adminCourseGrid','instructorCourseGrid','studentCourseGrid','catalogueGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const isStudent = id.includes('student') || id.includes('catalogue');
    el.innerHTML = COURSES_DATA.map(c => `<div class="col-sm-6 col-lg-4">${courseCardHTML(c, isStudent && id!=='catalogueGrid')}</div>`).join('');
  });
}

function populateStudents() {
  const body = document.getElementById('instructorStudentsBody');
  if (!body) return;
  const data = [
    ['AK','Arjun Kumar','#5b55c8','React Advanced Patterns',72,'3/5','2h ago','A'],
    ['PM','Priya M.',   '#38b6f5','ML Fundamentals',         45,'2/5','1d ago','B+'],
    ['RN','Raj Nair',   '#f25c78','Data Visualization',      88,'5/5','3h ago','A+'],
    ['MS','Mihir Shah', '#14b87a','Python Bootcamp',         30,'1/5','5h ago','C+'],
    ['KS','Komal S.',   '#f5a623','React Advanced Patterns', 60,'2/5','1d ago','B'],
  ];
  body.innerHTML = data.map(([init,name,color,course,prog,assign,last,grade])=>`
    <tr>
      <td><div class="d-flex align-items-center gap-2">
        <div class="avatar-sm" style="background:linear-gradient(135deg,${color},${color}99)">${init}</div>${name}
      </div></td>
      <td style="font-size:12px">${course}</td>
      <td><div style="min-width:120px">
        <div class="d-flex justify-content-between mb-1"><span style="font-size:11px;color:var(--text-muted)">${prog}%</span></div>
        <div class="prog-wrap"><div class="prog-fill" style="width:${prog}%;background:${color}"></div></div>
      </div></td>
      <td style="color:var(--text-muted);font-size:12px">${assign}</td>
      <td style="color:var(--text-muted);font-size:12px">${last}</td>
      <td><span class="tag" style="background:rgba(20,184,122,.15);color:var(--jade)">${grade}</span></td>
    </tr>`).join('');
}

function populateTimeline() {
  const el = document.getElementById('activityTimeline');
  if (!el) return;
  const items = [
    { dot:'#f5a623', bg:'rgba(245,166,35,.15)', icon:'bi-pencil-fill', text:'Arjun submitted Assignment 3 in React Patterns', time:'2h ago' },
    { dot:'#14b87a', bg:'rgba(20,184,122,.15)',  icon:'bi-check-circle-fill', text:'Priya M. completed Module 4 of ML Fundamentals', time:'5h ago' },
    { dot:'#f25c78', bg:'rgba(242,92,120,.15)',  icon:'bi-chat-fill', text:'Raj Nair posted a question in Data Visualization', time:'1d ago' },
    { dot:'#38b6f5', bg:'rgba(56,182,245,.15)',  icon:'bi-trophy-fill', text:'Mihir Shah earned the "Fast Learner" badge', time:'2d ago' },
  ];
  el.innerHTML = items.map(i=>`
    <div class="timeline-item">
      <div class="timeline-dot" style="background:${i.bg};color:${i.dot}"><i class="bi ${i.icon}"></i></div>
      <div class="timeline-body"><div class="timeline-text">${i.text}</div><div class="timeline-time">${i.time}</div></div>
    </div>`).join('');
}

function populateTopStudents() {
  const body = document.getElementById('topStudentsBody');
  if (!body) return;
  const data = [
    [1,'Raj Nair','#f25c78','Data Visualization',88,96],
    [2,'Arjun Kumar','#5b55c8','React Advanced Patterns',72,91],
    [3,'Priya M.','#38b6f5','ML Fundamentals',45,88],
    [4,'Komal S.','#f5a623','React Advanced Patterns',60,85],
    [5,'Mihir Shah','#14b87a','Python Bootcamp',30,78],
  ];
  body.innerHTML = data.map(([rank,name,color,course,prog,score])=>`
    <tr>
      <td><span class="rank-num rank-${rank}">#${rank}</span></td>
      <td><div class="d-flex align-items-center gap-2">
        <div class="avatar-sm" style="background:linear-gradient(135deg,${color},${color}99)">${name.split(' ').map(n=>n[0]).join('')}</div>${name}
      </div></td>
      <td style="font-size:12px">${course}</td>
      <td><div style="min-width:100px">
        <div class="prog-wrap"><div class="prog-fill" style="width:${prog}%;background:${color}"></div></div>
      </div></td>
      <td><span style="font-family:'Syne',sans-serif;font-weight:700;color:var(--amber)">${score}%</span></td>
      <td style="font-size:12px;color:var(--text-muted)">Today</td>
    </tr>`).join('');
}

function populateLeaderboard() {
  const el = document.getElementById('leaderboard');
  if (!el) return;
  const data = [
    [1,'Raj Nair','#f25c78',2840,'🥇'],
    [2,'Mihir Shah','#5b55c8',2510,'🥈'],
    [3,'Arjun Kumar','#38b6f5',2380,'🥉'],
    [4,'Komal S.','#14b87a',2100,''],
    [5,'Priya M.','#f5a623',1950,''],
  ];
  el.innerHTML = data.map(([rank,name,color,pts,medal])=>`
    <div class="d-flex align-items-center gap-3 py-2 ${rank<data.length?'border-bottom':''}' style="border-color:rgba(91,85,200,.1)!important">
      <span class="rank-num rank-${rank}" style="width:30px">${medal||'#'+rank}</span>
      <div class="avatar-sm" style="background:linear-gradient(135deg,${color},${color}99)">${name.split(' ').map(n=>n[0]).join('')}</div>
      <span style="flex:1;font-size:14px;font-weight:500">${name}</span>
      <span style="font-family:'Syne',sans-serif;font-weight:700;color:var(--amber);font-size:14px">${pts.toLocaleString()} pts</span>
    </div>`).join('');
}

function populateAchievements() {
  const el = document.getElementById('achievements');
  if (!el) return;
  el.innerHTML = ACHIEVEMENTS.map(a=>`
    <div class="col-6 col-md-4 col-lg-2">
      <div style="background:${a.color};border:1px solid ${a.border};border-radius:14px;padding:18px 12px;text-align:center;transition:var(--transition)" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
        <div style="font-size:32px;margin-bottom:8px">${a.icon}</div>
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:12px;margin-bottom:4px">${a.name}</div>
        <div style="font-size:10px;color:var(--text-muted)">${a.desc}</div>
      </div>
    </div>`).join('');
}

/* ============================================================
   CHARTS
============================================================ */
const C = {
  indigo:   '#5b55c8',
  amber:    '#f5a623',
  jade:     '#14b87a',
  rose:     '#f25c78',
  sky:      '#38b6f5',
  purple:   '#a855f7',
  gridLine: 'rgba(91,85,200,.1)',
  text:     '#8e8fb5',
};

function chartDefaults() {
  return {
    plugins: { legend: { labels: { color: C.text, font:{family:'DM Sans',size:12}, boxWidth:12, padding:16 } } },
    scales: {
      x: { grid:{ color:C.gridLine }, ticks:{ color:C.text, font:{family:'DM Sans',size:11} } },
      y: { grid:{ color:C.gridLine }, ticks:{ color:C.text, font:{family:'DM Sans',size:11} } },
    }
  };
}

function mkGrad(ctx, color) {
  const g = ctx.createLinearGradient(0,0,0,300);
  g.addColorStop(0, color+'88'); g.addColorStop(1, color+'00');
  return g;
}

function initChartsFor(sectionId) {
  if (chartsInited[sectionId]) return;
  chartsInited[sectionId] = true;

  if (sectionId === 'admin-dashboard') {
    // Enrollment trend
    const ctx1 = document.getElementById('chartEnrollment');
    if (ctx1) new Chart(ctx1, {
      type:'line',
      data:{
        labels:['Dec','Jan','Feb','Mar','Apr','May'],
        datasets:[
          { label:'New Enrollments', data:[320,480,410,590,760,840],
            borderColor:C.indigo, backgroundColor:mkGrad(ctx1.getContext('2d'),C.indigo), tension:.4, fill:true, borderWidth:2.5, pointRadius:4, pointBackgroundColor:C.indigo },
          { label:'Completions', data:[180,260,300,380,490,560],
            borderColor:C.jade, backgroundColor:mkGrad(ctx1.getContext('2d'),C.jade), tension:.4, fill:true, borderWidth:2.5, pointRadius:4, pointBackgroundColor:C.jade }
        ]
      },
      options:{...chartDefaults(), plugins:{...chartDefaults().plugins}}
    });

    // Role donut
    const ctx2 = document.getElementById('chartRoleDonut');
    if (ctx2) new Chart(ctx2, {
      type:'doughnut',
      data:{
        labels:['Students','Instructors','Admins'],
        datasets:[{ data:[3840,890,91], backgroundColor:[C.indigo,C.jade,C.rose], borderColor:'transparent', borderRadius:4, spacing:3 }]
      },
      options:{cutout:'70%',plugins:{legend:{position:'bottom',labels:{color:C.text,font:{family:'DM Sans',size:12},padding:14}}}}
    });

    // Rev bar
    const ctx3 = document.getElementById('chartRevBar');
    if (ctx3) new Chart(ctx3, {
      type:'bar',
      data:{
        labels:['Tech','Design','Business','Science'],
        datasets:[{ label:'Revenue ($K)', data:[42,18,24,11],
          backgroundColor:[C.indigo+'cc',C.rose+'cc',C.jade+'cc',C.amber+'cc'],
          borderRadius:8, borderSkipped:false }]
      },
      options:{...chartDefaults(), plugins:{legend:{display:false}}}
    });

    // Completion line
    const ctx4 = document.getElementById('chartCompletion');
    if (ctx4) new Chart(ctx4, {
      type:'line',
      data:{
        labels:['Dec','Jan','Feb','Mar','Apr','May'],
        datasets:[{ label:'Completion %', data:[70,74,72,76,80,78],
          borderColor:C.amber, backgroundColor:mkGrad(ctx4.getContext('2d'),C.amber), tension:.4, fill:true, borderWidth:2.5, pointRadius:4, pointBackgroundColor:C.amber }]
      },
      options:{...chartDefaults(),plugins:{legend:{display:false}}}
    });
  }

  if (sectionId === 'admin-analytics') {
    const ctx5 = document.getElementById('chartMAU');
    if (ctx5) new Chart(ctx5, {
      type:'bar',
      data:{
        labels:['Dec','Jan','Feb','Mar','Apr','May'],
        datasets:[{ label:'Monthly Active Users', data:[2100,2400,2250,2800,3100,3400],
          backgroundColor:C.indigo+'aa', borderRadius:8, borderSkipped:false }]
      },
      options:{...chartDefaults(),plugins:{legend:{display:false}}}
    });

    const ctx6 = document.getElementById('chartCategory');
    if (ctx6) new Chart(ctx6, {
      type:'pie',
      data:{
        labels:['Tech','Design','Business','Science','Other'],
        datasets:[{ data:[45,20,18,10,7], backgroundColor:[C.indigo,C.rose,C.jade,C.amber,C.sky], borderColor:'transparent' }]
      },
      options:{plugins:{legend:{position:'right',labels:{color:C.text,font:{family:'DM Sans',size:12},padding:12}}}}
    });

    const ctx7 = document.getElementById('chartLogins');
    if (ctx7) {
      const labels = Array.from({length:30},(_,i)=>`May ${i+1}`);
      const data = Array.from({length:30},()=>Math.floor(200+Math.random()*300));
      new Chart(ctx7, {
        type:'bar',
        data:{ labels, datasets:[{ label:'Logins', data, backgroundColor:C.sky+'88', borderRadius:4, borderSkipped:false }] },
        options:{...chartDefaults(),plugins:{legend:{display:false}}}
      });
    }
  }

  if (sectionId === 'instructor-dashboard') {
    const ctx8 = document.getElementById('chartStudentDist');
    if (ctx8) new Chart(ctx8, {
      type:'bar',
      data:{
        labels:['0–20%','21–40%','41–60%','61–80%','81–100%'],
        datasets:[{ label:'Students', data:[18,45,92,112,75],
          backgroundColor:[C.rose+'cc',C.amber+'cc',C.sky+'cc',C.indigo+'cc',C.jade+'cc'],
          borderRadius:8, borderSkipped:false }]
      },
      options:{...chartDefaults(),plugins:{legend:{display:false}},scales:{...chartDefaults().scales,y:{...chartDefaults().scales.y,title:{display:true,text:'No. of Students',color:C.text}}}}
    });
  }

  if (sectionId === 'student-dashboard') {
    const ctx9 = document.getElementById('chartStudyActivity');
    if (ctx9) new Chart(ctx9, {
      type:'bar',
      data:{
        labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets:[{ label:'Study Hours', data:[1.5,2,3,2.5,4,1,2],
          backgroundColor:C.indigo+'cc', borderRadius:8, borderSkipped:false }]
      },
      options:{...chartDefaults(),plugins:{legend:{display:false}}}
    });

    const ctx10 = document.getElementById('chartMyCourseProgress');
    if (ctx10) new Chart(ctx10, {
      type:'doughnut',
      data:{
        labels:['Completed','In Progress','Not Started'],
        datasets:[{ data:[60,30,10], backgroundColor:[C.jade,C.amber,C.rose+'88'], borderColor:'transparent', spacing:3, borderRadius:4 }]
      },
      options:{cutout:'65%',plugins:{legend:{position:'bottom',labels:{color:C.text,font:{family:'DM Sans',size:11},padding:12}}}}
    });
  }

  if (sectionId === 'student-progress') {
    const ctx11 = document.getElementById('chartSkillRadar');
    if (ctx11) new Chart(ctx11, {
      type:'radar',
      data:{
        labels:['JavaScript','Python','React','SQL','ML','Design'],
        datasets:[{ label:'Skill Level', data:[85,60,78,50,40,65],
          backgroundColor: C.indigo+'44', borderColor:C.indigo, borderWidth:2.5,
          pointBackgroundColor:C.amber, pointRadius:5 }]
      },
      options:{
        scales:{ r:{ grid:{color:C.gridLine}, pointLabels:{color:C.text,font:{family:'DM Sans',size:12}}, ticks:{display:false} } },
        plugins:{legend:{labels:{color:C.text,font:{family:'DM Sans',size:12}}}}
      }
    });

    const ctx12 = document.getElementById('chartLearningHours');
    if (ctx12) new Chart(ctx12, {
      type:'line',
      data:{
        labels:['Dec','Jan','Feb','Mar','Apr','May'],
        datasets:[{ label:'Hours Studied', data:[12,18,15,22,30,38],
          borderColor:C.amber, backgroundColor:mkGrad(ctx12.getContext('2d'),C.amber), tension:.4, fill:true, borderWidth:2.5, pointRadius:4, pointBackgroundColor:C.amber }]
      },
      options:{...chartDefaults(),plugins:{legend:{display:false}}}
    });
  }
}

// Init on load in case login auto-fires
window.addEventListener('resize', () => {
  const sb = document.getElementById('sidebar');
  if (window.innerWidth >= 992) {
    sb.classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  }
});