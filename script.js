document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 767 && 
            !event.target.closest('nav') && 
            !event.target.closest('.hamburger') && 
            nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Initialize EmailJS
    if (document.getElementById('form')) {
        emailjs.init('MXwgaiQuBzZ7vnYow');
        
        const btn = document.getElementById('button');
        document.getElementById('form').addEventListener('submit', function(event) {
            event.preventDefault();
            btn.value = 'Sending...';
            
            const serviceID = 'default_service';
            const templateID = 'template_zx0drgl';
            
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Send Email';
                    alert('Message sent successfully!');
                    this.reset();
                }, (err) => {
                    btn.value = 'Send Email';
                    alert('Failed to send message. Please try again later.');
                    console.error(err);
                });
        });
    }
});