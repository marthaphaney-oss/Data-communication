// ============ NAVIGATION ============
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function navigateTo(sectionId) {
  sections.forEach(s => s.classList.remove('active-section'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active-section');

  const activeLinks = document.querySelectorAll(`[data-section="${sectionId}"]`);
  activeLinks.forEach(l => l.classList.add('active'));

  // Close mobile nav
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');

  window.scrollTo(0, 0);
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.dataset.section;
    if (section) navigateTo(section);
  });
});

// CTA button
document.querySelector('.cta-btn')?.addEventListener('click', e => {
  e.preventDefault();
  navigateTo('introduction');
});

// Logo
document.querySelector('.header-logo')?.addEventListener('click', e => {
  e.preventDefault();
  navigateTo('home');
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// ============ STAR FIELD ============
function createStars() {
  const container = document.getElementById('starField');
  if (!container) return;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      opacity: ${Math.random() * 0.5 + 0.1};
      animation: twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite alternate;
    `;
    container.appendChild(star);
  }
}

const style = document.createElement('style');
style.textContent = `@keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.7; } }`;
document.head.appendChild(style);
createStars();

// ============ PROFILE PHOTO UPLOAD (secret double-click) ============
const profileUpload = document.getElementById('profileUpload');
const profileImg = document.getElementById('profileImg');
const profilePlaceholder = document.getElementById('profilePlaceholder');
const uploadBtn = document.getElementById('uploadBtn');
const profilePic = document.getElementById('profilePic');

profilePic.addEventListener('dblclick', () => {
  uploadBtn.style.display = uploadBtn.style.display === 'none' ? 'inline-flex' : 'none';
});

profileUpload.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    profileImg.src = e.target.result;
    profileImg.style.display = 'block';
    profilePlaceholder.style.display = 'none';
    localStorage.setItem('marthaProfilePhoto', e.target.result);
    uploadBtn.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// ============ LOAD SAVED PHOTO ============
function loadSavedData() {
  const savedPhoto = localStorage.getItem('marthaProfilePhoto');
  if (savedPhoto) {
    profileImg.src = savedPhoto;
    profileImg.style.display = 'block';
    profilePlaceholder.style.display = 'none';
  }
}

loadSavedData();

// Hash on load
const hash = window.location.hash.replace('#', '');
if (hash) navigateTo(hash);
