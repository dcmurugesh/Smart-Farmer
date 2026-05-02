// API Base URL - Change this to your backend URL
const API_BASE_URL = 'http://localhost:5000';

// Crop Information Database
const cropsData = {
    rice: {
        name: '🍚 Rice',
        climate: 'Tropical to subtropical, requires high temperature and humidity',
        waterNeeds: '1000-1500 mm annually, thrives in waterlogged conditions',
        season: 'Monsoon season (June-October), Kharif crop',
        details: [
            'Optimal temperature: 20-30°C',
            'Requires 60-80% relative humidity',
            'Soil: Clayey loam, well-drained with good water retention',
            'Duration: 120-150 days from sowing to harvest',
        ]
    },
    wheat: {
        name: '🌾 Wheat',
        climate: 'Temperate climate, prefers cooler temperatures',
        waterNeeds: '400-650 mm, moderate water requirement with good drainage',
        season: 'Winter season (October-March), Rabi crop',
        details: [
            'Optimal temperature: 15-25°C',
            'Prefers well-drained loamy to clayey soil',
            'Low humidity requirement (40-50%)',
            'Duration: 150-180 days from sowing to harvest',
        ]
    },
    cotton: {
        name: '☁️ Cotton',
        climate: 'Warm and dry climate, requires good sunlight',
        waterNeeds: '600-1200 mm with proper spacing of irrigation',
        season: 'Monsoon to winter (June-January), Kharif crop',
        details: [
            'Optimal temperature: 20-30°C',
            'Thrives in warm, sunny conditions',
            'Soil: Black soil or well-drained loamy soil',
            'Duration: 150-190 days from flowering to boll opening',
        ]
    },
    maize: {
        name: '🌽 Maize',
        climate: 'Warm season crop, requires good solar radiation',
        waterNeeds: '400-600 mm, needs well-distributed rainfall',
        season: 'Summer to monsoon (March-September), can grow year-round',
        details: [
            'Optimal temperature: 20-30°C',
            'Requires well-drained, fertile loamy soil',
            'High sunlight requirement',
            'Duration: 80-140 days from planting to maturity',
        ]
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupContactForm();
});

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
}

// Navigate to Section
function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Add active class to corresponding nav link
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Show Crop Details Modal
function showCropDetails(cropType) {
    const crop = cropsData[cropType];
    if (!crop) return;

    const container = document.getElementById('cropDetailsContainer');
    let detailsHTML = `
        <h2>${crop.name}</h2>
        <div class="crop-detail">
            <h3>Climate Requirements</h3>
            <p>${crop.climate}</p>
        </div>
        <div class="crop-detail">
            <h3>Water Needs</h3>
            <p>${crop.waterNeeds}</p>
        </div>
        <div class="crop-detail">
            <h3>Growing Season</h3>
            <p>${crop.season}</p>
        </div>
        <div class="crop-detail">
            <h3>Additional Details</h3>
            <ul style="list-style-position: inside; color: #7f8c8d;">
    `;

    crop.details.forEach(detail => {
        detailsHTML += `<li style="margin-bottom: 0.5rem;">• ${detail}</li>`;
    });

    detailsHTML += `
            </ul>
        </div>
    `;

    container.innerHTML = detailsHTML;

    // Show modal
    const modal = document.getElementById('cropModal');
    modal.classList.add('show');
}

// Close Crop Modal
function closeCropModal() {
    const modal = document.getElementById('cropModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('cropModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Setup Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Handle Contact Form Submission
async function handleContactSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    // Clear previous message
    formMessage.className = '';
    formMessage.textContent = '';

    // Validation
    if (!name || !message) {
        formMessage.className = 'error';
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }

    if (name.length < 2) {
        formMessage.className = 'error';
        formMessage.textContent = 'Name must be at least 2 characters long.';
        return;
    }

    if (message.length < 10) {
        formMessage.className = 'error';
        formMessage.textContent = 'Message must be at least 10 characters long.';
        return;
    }

    // Show loading message
    formMessage.className = 'success';
    formMessage.textContent = 'Sending your message...';

    try {
        // Send data to backend API
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                message: message
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Success response
            formMessage.className = 'success';
            formMessage.textContent = data.message || 'Thank you! Your message has been sent successfully.';

            // Clear form
            nameInput.value = '';
            messageInput.value = '';

            // Remove message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        } else {
            // Error response
            formMessage.className = 'error';
            formMessage.textContent = data.message || 'Failed to send message. Please try again.';
        }
    } catch (error) {
        console.error('Error sending contact form:', error);
        formMessage.className = 'error';
        formMessage.textContent = 'Error sending message. Please check if the server is running and try again.';
    }
}

// Health check to verify backend is running
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
            console.log('Backend server is running');
            return true;
        }
    } catch (error) {
        console.warn('Backend server is not running. Make sure to start the Node.js server.');
        return false;
    }
}

// Check backend health on page load
checkBackendHealth();
