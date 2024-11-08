document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect to child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Observe all sections and elements with scroll-reveal class
    document.querySelectorAll('section, .scroll-reveal').forEach((element) => {
        observer.observe(element);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Project scroll functionality
    const projectsScroll = document.querySelector('.projects-scroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    // Scroll amount for each click (width of one project card + gap)
    const scrollAmount = 420; // 400px card width + 20px gap

    function updateScrollButtons() {
        // Hide left button if at start
        scrollLeftBtn.style.opacity = projectsScroll.scrollLeft <= 0 ? "0.5" : "1";
        scrollLeftBtn.disabled = projectsScroll.scrollLeft <= 0;

        // Hide right button if at end
        const maxScroll = projectsScroll.scrollWidth - projectsScroll.clientWidth;
        scrollRightBtn.style.opacity = projectsScroll.scrollLeft >= maxScroll ? "0.5" : "1";
        scrollRightBtn.disabled = projectsScroll.scrollLeft >= maxScroll;
    }

    // Initial button state
    updateScrollButtons();

    // Scroll buttons click handlers
    scrollLeftBtn.addEventListener('click', () => {
        projectsScroll.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        projectsScroll.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button visibility on scroll
    projectsScroll.addEventListener('scroll', () => {
        updateScrollButtons();
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        updateScrollButtons();
    });

    // Mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsScroll.style.cursor = 'grabbing';
        startX = e.pageX - projectsScroll.offsetLeft;
        scrollLeft = projectsScroll.scrollLeft;
    });

    projectsScroll.addEventListener('mouseleave', () => {
        isDown = false;
        projectsScroll.style.cursor = 'grab';
    });

    projectsScroll.addEventListener('mouseup', () => {
        isDown = false;
        projectsScroll.style.cursor = 'grab';
    });

    projectsScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsScroll.offsetLeft;
        const walk = (x - startX) * 2;
        projectsScroll.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    projectsScroll.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - projectsScroll.offsetLeft;
        scrollLeft = projectsScroll.scrollLeft;
    });

    projectsScroll.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - projectsScroll.offsetLeft;
        const walk = (x - startX) * 2;
        projectsScroll.scrollLeft = scrollLeft - walk;
    });

    // Add this to your existing main.js
    function scrollProjects(direction) {
        const container = document.querySelector('.projects-scroll');
        const scrollAmount = 400; // Width of one project card
        
        if (direction === 'left') {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // Add this to your DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', function() {
        // Existing code...

        // Show/hide scroll buttons based on scroll position
        const projectsScroll = document.querySelector('.projects-scroll');
        const leftButton = document.querySelector('.scroll-left');
        const rightButton = document.querySelector('.scroll-right');

        function updateScrollButtons() {
            if (projectsScroll.scrollLeft <= 0) {
                leftButton.style.display = 'none';
            } else {
                leftButton.style.display = 'flex';
            }

            if (projectsScroll.scrollLeft >= (projectsScroll.scrollWidth - projectsScroll.clientWidth)) {
                rightButton.style.display = 'none';
            } else {
                rightButton.style.display = 'flex';
            }
        }

        // Initial check
        updateScrollButtons();

        // Update on scroll
        projectsScroll.addEventListener('scroll', updateScrollButtons);
        
        // Update on window resize
        window.addEventListener('resize', updateScrollButtons);
    });
}); 