// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resume download functionality
    const downloadBtn = document.getElementById('download-resume');
    downloadBtn.addEventListener('click', function() {
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(generateResumeText());
        link.download = 'Manasi_Jadhav_DevOps_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show confirmation
        showNotification('Resume downloaded successfully!');
    });

    // Generate resume text content
    function generateResumeText() {
        return `MANASI JADHAV
DevOps Engineer

Contact Information:
Phone: +91 8485835335
Email: manasipjadhav4@gmail.com
LinkedIn: linkedin.com/in/manaasijadhav
GitHub: github.com/Yomanasi

SUMMARY:
Detail-oriented and motivated DevOps Engineer with over 2 years of experience working in Linux environments, cloud infrastructure (AWS), automation, and CI/CD pipelines. Proven expertise in deploying scalable applications, monitoring system performance, and managing production-ready cloud services. Strong background in configuring EC2, managing IAM policies, and creating CI/CD pipelines with Jenkins.

TECHNICAL SKILLS:
• Operating Systems: Linux (Ubuntu, CentOS), Windows
• Cloud Platforms: AWS (EC2, S3, RDS, IAM, CloudWatch, Lambda, VPC, EBS, Route53)
• Configuration & Monitoring: CloudWatch, Prometheus, Grafana
• Containerization & Orchestration: Docker, Docker Compose
• Version Controls: Git, GitHub
• CI/CD: Jenkins, GitHub Actions
• Database: MySQL, SQL Server, MongoDB
• Other Tools: JIRA, Confluence, Terraform (basic), Postman

PROFESSIONAL EXPERIENCE:

DevOps Engineer – Intern
Elliot Systems, Pune, India (May 2023 – Feb 2025)
• Collaborated with development and QA teams to streamline deployment pipelines
• Automated build and deployment processes using Jenkins and GitHub Actions
• Containerized microservices using Docker and Docker Compose
• Managed deployment configurations across environments
• Assisted in AWS services setup (EC2, IAM, S3)
• Maintained system health dashboards using Prometheus/Grafana and CloudWatch

DevOps & AWS Systems Engineer
ITProfound, Inver Grove, MN (Nov 2021 – March 2023)
• Administered Linux-based production environments
• Managed AWS resources (EC2, S3, RDS, IAM)
• Built Jenkins pipelines reducing deployment times by 50%
• Developed shell scripts for automation
• Implemented security best practices and access control policies

DevOps Intern / Junior Engineer
State University of New York, Plattsburgh, NY (Dec 2020 – January 2021)
• Supported CI/CD development using GitHub Actions and Jenkins
• Configured AWS EC2 instances and security groups
• Participated in Agile/Scrum development methodology
• Managed Git repositories and coordinated code releases

EDUCATION:
State University of New York, Plattsburgh
Bachelor of Science, Computer Science - GPA: 3.40/4.0
Minor: Web Designing and Programming - GPA: 3.67/4.0

Generated on: ${new Date().toLocaleDateString()}`;
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.summary-item, .skill-category, .timeline-item, .education-card, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Tech icons animation
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact links tracking
    const contactLinks = document.querySelectorAll('.contact-details a, .social-links a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.textContent || this.title || 'unknown';
            console.log(`Contact link clicked: ${linkType}`);
        });
    });
});

// Experience section expand/collapse functionality
function toggleExperience(index) {
    const details = document.getElementById(`experience-${index}`);
    const button = details.parentElement.querySelector('.expand-btn');
    const icon = button.querySelector('i');
    const span = button.querySelector('span');
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        button.classList.remove('expanded');
        span.textContent = 'View Details';
        icon.style.transform = 'rotate(0deg)';
    } else {
        details.classList.add('expanded');
        button.classList.add('expanded');
        span.textContent = 'Hide Details';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize any lazy-loaded content
    setTimeout(() => {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        lazyElements.forEach(element => {
            element.classList.add('loaded');
        });
    }, 100);
});

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
}, true);

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for PWA functionality
        console.log('Service Worker support detected');
    });
}
