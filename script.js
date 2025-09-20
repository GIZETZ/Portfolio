
const iconBoxes = document.querySelectorAll(".icon-box");
const iconBoxContainers = document.querySelectorAll(".icon-container");
const closeBtns = document.querySelectorAll(".close-btn");
const maximizeBtns = document.querySelectorAll(".maximize-btn");
const body = document.querySelector("body");

iconBoxes.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
    body.classList.add("prevent-background-scroll");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    modal.style.display = "none";
    body.classList.remove("prevent-background-scroll");
    iconBoxContainers.forEach((container) => {
      container.style.display = "flex";
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    e.target.style.display = "none";
    body.classList.remove("prevent-background-scroll");
  }
});

maximizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    let container = modal.querySelector(".popup-container");
    let body = modal.querySelector(".popup-body");

    if (modal.classList.contains("maximized")) {
      container.style.width = "min(900px, 90%)";
      container.style.top = "45%";
      body.style.height = "70vh";
    } else {
      container.style.width = "100%";
      container.style.top = "50%";
      body.style.height = "90vh";
    }

    modal.classList.toggle("maximized");
    body.classList.toggle("prevent-scroll");
  });
});

// Certificate dropdown functionality
const certificateDropdown = document.querySelector('.certificate-dropdown');
const dropdownBtn = document.querySelector('.dropdown-btn');

if (dropdownBtn) {
  dropdownBtn.addEventListener('click', function(e) {
    e.preventDefault();
    certificateDropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!certificateDropdown.contains(e.target)) {
      certificateDropdown.classList.remove('active');
    }
  });
}

// 3D Images effect
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('section > div:first-of-type img');
  
  // Utiliser requestAnimationFrame pour une meilleure performance
  requestAnimationFrame(() => {
    images.forEach(image => {
      const maxLeft = window.innerWidth * 0.3 / 16;
      const left = -Math.random() * maxLeft + 'rem';
      const maxRight = window.innerWidth * 0.3 / 16;
      const right = -Math.random() * maxRight + 'rem';

      image.style.setProperty('--left', left);
      image.style.setProperty('--right', right);
      
      // Optimisation : arrêter l'animation quand l'image n'est pas visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            entry.target.style.animationPlayState = 'paused';
          } else {
            entry.target.style.animationPlayState = 'running';
          }
        });
      });
      observer.observe(image);
    });
  });
});

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('subject').value;
  
  if (name && email && message) {
    // Créer l'URL mailto avec les informations du formulaire
    const subject = encodeURIComponent(`Message de ${name} - Portfolio Contact`);
    const body = encodeURIComponent(`Bonjour Jathe,

${message}

---
De: ${name}
Email: ${email}`);
    
    const mailtoLink = `mailto:souralehkouame53@gmail.com?subject=${subject}&body=${body}`;
    
    // Ouvrir l'application email
    window.location.href = mailtoLink;
    
    // Optionnel: réinitialiser le formulaire après un court délai
    setTimeout(() => {
      form.reset();
    }, 1000);
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});
