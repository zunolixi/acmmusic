// Trạng thái trình phát nhạc
let isPlaying = false;
const playIcon = document.getElementById('playIcon');
const playerBar = document.getElementById('playerBar');
const progressFill = document.getElementById('progressFill');

function togglePlay() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playIcon.className = "fa-solid fa-pause";
    playerBar.classList.add('playing');
    simulateProgress();
  } else {
    playIcon.className = "fa-solid fa-play";
    playerBar.classList.remove('playing');
  }
}

let timer;

function simulateProgress() {
  let w = 30;
  clearInterval(timer);
  timer = setInterval(() => {
    if (!isPlaying) {
      clearInterval(timer);
      return;
    }
    w += 0.5;
    if (w > 100) w = 0;
    progressFill.style.width = w + '%';
  }, 1000);
}

function seekTrack(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  progressFill.style.width = (pos * 100) + '%';
}

// Modal Điều khiển
const songModal = document.getElementById('songModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');

function openModal(title, date, img) {
  modalTitle.innerText = title;
  modalDate.innerText = date;
  modalImg.src = img;
  songModal.classList.add('active');
}

function closeModal() {
  songModal.classList.remove('active');
}

function closeModalOutside(e) {
  if (e.target === songModal) {
    songModal.classList.remove('active');
  }
}

function playFromModal() {
  isPlaying = true;
  playIcon.className = "fa-solid fa-pause";
  playerBar.classList.add('playing');
  closeModal();
  simulateProgress();
}

// Interactive DSP Cards Dynamic Border & Spotlight Glow Effects
document.addEventListener('DOMContentLoaded', () => {
  const dspCards = document.querySelectorAll('.dsp-card');
  
  dspCards.forEach(card => {
    const glowColor = card.getAttribute('data-glow');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.borderColor = glowColor;
      card.style.transform = `translateY(-8px) scale(1.02)`;
      
      // Subtle 3D tilt calculation
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / 15;
      const dy = (y - yc) / 15;
      card.style.transform = `perspective(1000px) rotateX(${-dy}deg) rotateY(${dx}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border-glass)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
  
  // Bộ lọc Album (Filter)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const albumCards = document.querySelectorAll('.album-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      albumCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  console.log('Win Tribe Media x The Orchard DSP Interactive Effects Initialized.');
});