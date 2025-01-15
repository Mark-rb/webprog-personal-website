document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enter-button');
    const introSection = document.getElementById('intro-section');
    const mainContent = document.getElementById('main-content');

    enterButton.addEventListener('click', () => {
        introSection.classList.add('hide');
        mainContent.classList.remove('hidden');
        
        // Remove intro section after animation
        setTimeout(() => {
            introSection.style.display = 'none';
        }, 800);
    });

    const navItems = document.querySelectorAll('nav li');
    const sections = document.querySelectorAll('.content-section');

    // Show about section by default
    document.getElementById('about').classList.add('active');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Remove active class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Add active class to selected section
            document.getElementById(sectionId).classList.add('active');

            // Update active nav item
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item, .timeline-item, .stat').forEach(el => {
        observer.observe(el);
    });

    // Add typing effect for intro text
    function typeEffect(element, speed) {
        const text = element.innerHTML;
        element.innerHTML = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Initialize typing effect
    document.querySelector('.intro') && 
        typeEffect(document.querySelector('.intro'), 100);

    // Add survey form submission handler
    const surveyForm = document.querySelector('#survey-form');
    if (surveyForm) {
        surveyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('Survey Submitted', {
                            body: 'Thank you for your feedback!',
                            icon: '/path/to/icon.png' // Optional: Add your website icon
                        });
                    } else {
                        alert('Thank you for your feedback!');
                    }
                });
            } else {
                alert('Thank you for your feedback!');
            }
            
            surveyForm.reset();
        });
    }

    // Add logo click handler
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        introSection.style.display = 'flex';
        introSection.classList.remove('hide');
        introSection.classList.add('return-transition');
        mainContent.classList.add('hidden');
        
        // Remove the animation class after it completes
        setTimeout(() => {
            introSection.classList.remove('return-transition');
        }, 800);
        
        // Reset active states
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        document.getElementById('about').classList.add('active');
    });
});
