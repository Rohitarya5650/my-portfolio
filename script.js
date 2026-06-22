// ============================
// AOS INIT
// ============================

AOS.init({
  duration: 1200,
  once: true,
  offset: 100
});

// ============================
// TYPED JS
// ============================

new Typed(".typing", {
  strings: [
    "Frontend Developer",
    "Freelancer",
    "Web Designer",
    "Java Developer",
    "Firebase Developer"
  ],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1500,
  loop: true
});

// ============================
// MOBILE MENU
// ============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// ============================
// CLOSE MENU ON CLICK
// ============================

document.querySelectorAll(".nav-links a")
.forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuBtn.innerHTML =
    '<i class="fas fa-bars"></i>';

  });

});

// ============================
// CUSTOM CURSOR
// ============================

const cursor =
document.querySelector(".cursor");

const blur =
document.querySelector(".cursor-blur");

document.addEventListener(
"mousemove",
(e)=>{

cursor.style.left =
e.clientX + "px";

cursor.style.top =
e.clientY + "px";

blur.style.left =
e.clientX - 150 + "px";

blur.style.top =
e.clientY - 150 + "px";

}
);

// ============================
// CURSOR HOVER EFFECT
// ============================

document
.querySelectorAll(
"a, button, .skill-card, .service-card, .project-card"
)
.forEach((elem)=>{

elem.addEventListener(
"mouseenter",
()=>{

cursor.style.transform =
"scale(2)";

cursor.style.background =
"#ffffff";

}
);

elem.addEventListener(
"mouseleave",
()=>{

cursor.style.transform =
"scale(1)";

cursor.style.background =
"#00e5ff";

}
);

});

// ============================
// PROGRESS BAR
// ============================

window.addEventListener(
"scroll",
()=>{

const scrollTop =
document.documentElement.scrollTop;

const scrollHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const progress =
(scrollTop / scrollHeight) * 100;

document.getElementById(
"progress-bar"
).style.width =
progress + "%";

}
);

// ============================
// HEADER SCROLL EFFECT
// ============================

const header =
document.getElementById("header");

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 100){

header.style.background =
"rgba(0,0,0,.8)";

header.style.backdropFilter =
"blur(20px)";

}
else{

header.style.background =
"rgba(0,0,0,.25)";

}

}
);

// ============================
// GSAP HERO ANIMATION
// ============================

gsap.from(
".hero-left",
{
x:-120,
opacity:0,
duration:1.4,
ease:"power3.out"
}
);

gsap.from(
".hero-right",
{
x:120,
opacity:0,
duration:1.4,
ease:"power3.out"
}
);

gsap.from(
".navbar",
{
y:-100,
opacity:0,
duration:1
}
);

// ============================
// FLOATING IMAGE EFFECT
// ============================

gsap.to(
".image-wrapper",
{
y:20,
duration:3,
repeat:-1,
yoyo:true,
ease:"power1.inOut"
}
);

// ============================
// ROTATING CIRCLES
// ============================

gsap.to(
".circle1",
{
rotation:360,
duration:15,
repeat:-1,
ease:"none"
}
);

gsap.to(
".circle2",
{
rotation:-360,
duration:20,
repeat:-1,
ease:"none"
}
);

// ============================
// SKILLS ANIMATION
// ============================

gsap.utils
.toArray(".skill-card")
.forEach((card)=>{

gsap.from(
card,
{
scrollTrigger:{
trigger:card,
start:"top 85%"
},
y:60,
opacity:0,
duration:1
}
);

});

// ============================
// SERVICES ANIMATION
// ============================

gsap.utils
.toArray(".service-card")
.forEach((card)=>{

gsap.from(
card,
{
scrollTrigger:{
trigger:card,
start:"top 85%"
},
scale:.8,
opacity:0,
duration:1
}
);

});

// ============================
// PROJECT ANIMATION
// ============================

gsap.utils
.toArray(".project-card")
.forEach((card)=>{

gsap.from(
card,
{
scrollTrigger:{
trigger:card,
start:"top 85%"
},
y:100,
opacity:0,
duration:1.2
}
);

});

// ============================
// ABOUT SECTION
// ============================

gsap.from(
".about-image",
{
scrollTrigger:{
trigger:".about-image",
start:"top 80%"
},
x:-100,
opacity:0,
duration:1.3
}
);

gsap.from(
".about-content",
{
scrollTrigger:{
trigger:".about-content",
start:"top 80%"
},
x:100,
opacity:0,
duration:1.3
}
);

// ============================
// CONTACT FORM ANIMATION
// ============================

gsap.from(
".contact-form",
{
scrollTrigger:{
trigger:".contact-form",
start:"top 85%"
},
scale:.8,
opacity:0,
duration:1.2
}
);

// ============================
// PARALLAX BACKGROUND
// ============================

window.addEventListener(
"scroll",
()=>{

let value =
window.scrollY;

document.querySelector(
".bg-animation"
).style.transform =
`translateY(${value * 0.15}px)`;

}
);

// ============================
// ACTIVE NAV LINK
// ============================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop;

const sectionHeight =
section.clientHeight;

if(
pageYOffset >=
sectionTop - 200
){
current =
section.getAttribute("id");
}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== `#${current}`
){
link.classList.add("active");
}

});

}
);

// ============================
// CONTACT FORM DEMO
// ============================

const form =
document.querySelector(
".contact-form"
);

form.addEventListener(
"submit",
(e)=>{

e.preventDefault();

alert(
"Message Sent Successfully 🚀"
);

form.reset();

}
);

// ============================
// PRELOADER OPTIONAL
// ============================

window.addEventListener(
"load",
()=>{

document.body.style.opacity =
"1";

}
);

console.log(
"Portfolio Loaded Successfully 🚀"
);


//===========
// loading js
//===========
window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1500);

});

//=========================
// Animated Statistics Counter
//=========================
const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=
+counter.getAttribute("data-target");

const count=
+counter.innerText;

const inc=
target/100;

if(count<target){

counter.innerText=
Math.ceil(count+inc);

setTimeout(update,20);

}else{

counter.innerText=target;

}

}

update();

});



//====================
// Testimonials Slider
//====================
let current=0;

const testimonials=
document.querySelectorAll(".testimonial");

setInterval(()=>{

testimonials[current]
.classList.remove("active");

current=
(current+1)%testimonials.length;

testimonials[current]
.classList.add("active");

},3000);


//======
//toggle
//======
const toggle =
document.getElementById("theme-toggle");

toggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

});

//============
//3D Tilt Cards
//============
VanillaTilt.init(
document.querySelectorAll(".project-card"),
{
max:15,
speed:400,
glare:true,
"max-glare":0.3
}
);

//==================
//Particle Background
//==================
particlesJS("particles-js",{

particles:{
number:{value:80},

color:{value:"#00e5ff"},

size:{value:3},

move:{speed:2}
}

});


//===================
//Project Modal Popup
//===================
// function openModal(){

// document.getElementById(
// "projectModal"
// ).style.display="flex";

// }

// function closeModal(){

// document.getElementById(
// "projectModal"
// ).style.display="none";

// }





//===========================
//project show & hidden button
//===========================
function showAll() {
  document.querySelectorAll('.project-card.hidden')
    .forEach(c => c.classList.remove('hidden'));
  document.getElementById('viewAllBtn').style.display = 'none';
}





//=========
//footer js
//=========
const canvas = document.getElementById("clockCanvas");
      const ctx = canvas.getContext("2d");

      const radius = canvas.height / 2;
      ctx.translate(radius, radius);

      function drawClock() {
        drawFace();
        drawNumbers();
        drawTime();
        updateDigital();
      }

      function drawFace() {
        ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#07121f";
        ctx.fill();

        ctx.strokeStyle = "#00d9ff";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#00d9ff";
        ctx.fill();
      }

      function drawNumbers() {
        ctx.font = "14px Poppins";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let num = 1; num <= 12; num++) {
          let ang = (num * Math.PI) / 6;

          ctx.rotate(ang);
          ctx.translate(0, -radius + 20);
          ctx.rotate(-ang);

          ctx.fillText(num.toString(), 0, 0);

          ctx.rotate(ang);
          ctx.translate(0, radius - 20);
          ctx.rotate(-ang);
        }
      }

      function drawHand(pos, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        ctx.moveTo(0, 0);

        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
      }

      function drawTime() {
        const now = new Date();

        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        hour = hour % 12;

        hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60);

        drawHand(hour, radius * 0.45, 5, "#ffffff");

        minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);

        drawHand(minute, radius * 0.65, 3, "#00d9ff");

        second = (second * Math.PI) / 30;

        drawHand(second, radius * 0.8, 2, "#ffcc00");
      }

      function updateDigital() {
        const now = new Date();

        document.getElementById("digitalClock").innerHTML =
          now.toLocaleTimeString();

        document.getElementById("dateText").innerHTML = now.toDateString();
      }

      setInterval(drawClock, 1000);
      drawClock();
      

      // Visitor Counter

      fetch('https://api.countapi.xyz/hit/rohit-arya-portfolio-2024/visits')
      .then(r => r.json())
      .then(data => {
        document.getElementById('visitor-count').textContent = String(data.value).padStart(5, '0');
      })
      .catch(() => {document.getElementById('visitor-count').textContent = '00001';
      });


      








      //=============
      //auto slider
      //==============
      const techIcons = [
  { name: 'Python',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C',              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#',             icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'VB.NET',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualbasic/visualbasic-original.svg' },
  { name: 'Solidity',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
  { name: 'HTML5',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Flask',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'MySQL',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'SQLite',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'JSON',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg' },
  { name: 'Google Cloud',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Git',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
  { name: 'GitLab',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'Windows',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg' },
  { name: 'Ubuntu',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
  { name: 'Linux',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Arch Linux',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg' },
  { name: 'Netlify',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
  { name: 'Kali Linux',     icon: 'https://www.kali.org/images/kali-dragon-icon.svg' },
];

const container  = document.getElementById('sphereContainer');
const sphereEl   = document.getElementById('skillsSphere');

// ── Build icon elements ──
const iconEls = techIcons.map(tech => {
  const div = document.createElement('div');
  div.className = 'tech-icon';
  div.title = tech.name;
  const img = document.createElement('img');
  img.src = tech.icon;
  img.alt = tech.name;
  img.loading = 'lazy';
  div.appendChild(img);
  container.appendChild(div);
  return div;
});

// ── State ──
const rotation   = { x: 0, y: 0 };
const target     = { x: 0, y: 0 };
const velocity   = { x: 5, y: 8 };   // deg/s auto-rotate
let   isHovering = false;
let   isVisible  = false;
let   lastTime   = null;
let   rafId      = null;

// ── Position calculation (Fibonacci sphere) ──
function getPos(index, total) {
  const phi   = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  const bx = Math.cos(theta) * Math.sin(phi);
  const by = Math.sin(theta) * Math.sin(phi);
  const bz = Math.cos(phi);

  const rx = rotation.x * (Math.PI / 180);
  const ry = rotation.y * (Math.PI / 180);

  // Rotate Y
  const x1 =  bx * Math.cos(ry) - bz * Math.sin(ry);
  const z1  =  bx * Math.sin(ry) + bz * Math.cos(ry);
  // Rotate X
  const y2  =  by * Math.cos(rx) - z1 * Math.sin(rx);
  const z2  =  by * Math.sin(rx) + z1 * Math.cos(rx);

  const isMobile = window.innerWidth < 640;
  const radius   = isMobile ? 140 : 220;
  const scale    = (z2 + 1.5) / 2.5;
  const opacity  = Math.max(0.25, (z2 + 1) / 2);

  return {
    x: x1 * radius,
    y: y2 * radius,
    z: z2,
    scale,
    opacity,
  };
}

// ── Render ──
function render() {
  const total = techIcons.length;
  iconEls.forEach((el, i) => {
    const p = getPos(i, total);
    const backAmount = (1 - p.z) / 2;
    const filterVal  = p.z < 0
      ? `grayscale(${(0.3 + backAmount * 0.5).toFixed(2)}) brightness(${(1 - backAmount * 0.3).toFixed(2)})`
      : 'none';

    el.style.left      = `calc(50% + ${p.x.toFixed(1)}px)`;
    el.style.top       = `calc(50% + ${p.y.toFixed(1)}px)`;
    el.style.transform = `translate(-50%,-50%) scale(${p.scale.toFixed(3)})`;
    el.style.opacity   = p.opacity.toFixed(2);
    el.style.zIndex    = Math.round((p.z + 1) * 50);
    el.querySelector('img').style.filter = filterVal;
  });
}

// ── Animation loop ──
function animate(ts) {
  if (!lastTime) lastTime = ts;
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;

  if (isHovering) {
    const s = 0.07;
    rotation.x += (target.x - rotation.x) * s;
    rotation.y += (target.y - rotation.y) * s;
  } else {
    rotation.x += velocity.x * dt;
    rotation.y += velocity.y * dt;
  }

  render();
  rafId = requestAnimationFrame(animate);
}

function startAnim() {
  if (!rafId) {
    lastTime = null;
    rafId = requestAnimationFrame(animate);
  }
}
function stopAnim() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
}

// ── Mouse events ──
sphereEl.addEventListener('mousemove', e => {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const nx = (e.clientX - cx) / (rect.width  / 2);
  const ny = (e.clientY - cy) / (rect.height / 2);
  target.y = rotation.y + nx * 50;
  target.x = rotation.x + ny * 50;
});

sphereEl.addEventListener('mouseenter', () => { isHovering = true; });
sphereEl.addEventListener('mouseleave', () => {
  isHovering = false;
  target.x = rotation.x;
  target.y = rotation.y;
});

// ── IntersectionObserver — scroll-trigger ──
const observer = new IntersectionObserver(entries => {
  isVisible = entries[0].isIntersecting;
  isVisible ? startAnim() : stopAnim();
}, { threshold: 0.1 });
observer.observe(sphereEl);

// ── Scroll reveal for text elements ──
const revealEls = [
  document.getElementById('skillsTitle'),
  document.getElementById('skillsLeft'),
  sphereEl,
];
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));