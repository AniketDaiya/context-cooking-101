// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initSeatProgress();
    initTheme();
    initSyllabusSearch();
    initStickyNav();
});

// Sticky Navigation
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
            backToTop.style.display = 'flex';
        } else {
            navbar.classList.remove('sticky');
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Syllabus Interaction
function toggleDay(header) {
    const card = header.parentElement;
    const isActive = card.classList.contains('active');
    
    // Close all cards in the same container
    const allCards = card.parentElement.querySelectorAll('.day-card');
    allCards.forEach(c => c.classList.remove('active'));

    // Toggle selected card
    if (!isActive) {
        card.classList.add('active');
        // Update icon if needed (handled by CSS transition usually)
    }
}

// Syllabus Search
function initSyllabusSearch() {
    const searchInput = document.getElementById('search-syllabus');
    const cards = document.querySelectorAll('.day-card');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        cards.forEach(card => {
            const topics = card.getAttribute('data-topics').toLowerCase();
            const title = card.querySelector('h3').innerText.toLowerCase();
            
            if (topics.includes(query) || title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Countdown Timer
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    // Set target date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdownElement.innerText = "Started!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Seat Progress Simulation
function initSeatProgress() {
    const progressBar = document.getElementById('progress-bar');
    const seatsText = document.getElementById('seats-left');
    
    // Simulate initial value
    let seats = 12;
    const total = 30;

    function updateSeats() {
        const percentage = ( (total - seats) / total ) * 100;
        progressBar.style.width = percentage + '%';
        seatsText.innerText = `${seats} / ${total} left`;
        
        // Randomly decrease seats every few minutes for realism
        if (seats > 3 && Math.random() > 0.8) {
            seats--;
        }
    }

    updateSeats();
    setInterval(updateSeats, 30000); // Check every 30s
}

// Theme Toggle
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = true;

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
        lucide.createIcons();
    });
}

// Modal Logic
const modal = document.getElementById('pdfModal');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on click outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Print Iframe Content
function printIframe() {
    const iframe = document.getElementById('pdf-viewer');
    if (iframe) {
        try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        } catch (e) {
            // Fallback for cross-origin if print fails
            window.open(iframe.src.replace('/preview', '/view'), '_blank');
        }
    }
}

// Contact Form Simulation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Applying...";
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerText = "Successfully Joined!";
        btn.style.background = "#28a745";
        e.target.reset();
    }, 2000);
});
