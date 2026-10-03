// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    if (scrollY >= top) current = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
  // navbar shadow
  document.getElementById('navbar').style.boxShadow = scrollY > 10 ? '0 4px 20px rgba(15,23,42,.06)' : 'none';
});

// Contact form validation + toast
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const formNote = document.getElementById('formNote');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function setError(input, msg) {
  input.classList.add('invalid');
  const err = input.parentElement.querySelector('.error-msg');
  if (err) err.textContent = msg;
}
function clearError(input) {
  input.classList.remove('invalid');
  const err = input.parentElement.querySelector('.error-msg');
  if (err) err.textContent = '';
}

form.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => clearError(el));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) { setError(name, 'Please enter your name'); valid = false; }
  if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) { setError(email, 'Enter a valid email'); valid = false; }
  if (!message.value.trim()) { setError(message, 'Please enter a message'); valid = false; }

  if (!valid) {
    formNote.textContent = 'Please fix the errors above.';
    formNote.className = 'form-note error';
    return;
  }

  formNote.textContent = 'Message sent successfully! I will get back to you soon.';
  formNote.className = 'form-note success';
  showToast('Message sent successfully!');
  form.reset();
  setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 4000);
});
