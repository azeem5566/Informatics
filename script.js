document.addEventListener('DOMContentLoaded', function() {
    // Function to open specific tab
    window.openTab = function(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("active");
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");

        // Trigger animations when Home or Program tab is opened
        if (tabName === 'Home') {
            animateNumbers();
        }
        if (tabName === 'Program') {
            animateProgramItems();
        }
    };

    // Set the default open tab (Home)
    document.querySelector('.tablinks').click();

    // Function for animating numbers in Home section
    function animateNumbers() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // milliseconds
                    let start = 0;
                    let startTime = null;

                    function animate(currentTime) {
                        if (!startTime) startTime = currentTime;
                        const progress = (currentTime - startTime) / duration;
                        const value = Math.min(progress, 1) * target;
                        entry.target.textContent = '+' + Math.floor(value).toLocaleString(); // Add + and commas
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            entry.target.textContent = '+' + target.toLocaleString();
                        }
                    }
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animated-number').forEach(number => {
            observer.observe(number);
        });
    }

    // Function for animating program items (text slide-in)
    function animateProgramItems() {
        const programItems = document.querySelectorAll('.program-item span');
        programItems.forEach(item => {
            item.setAttribute('data-text', item.textContent); // Store original text
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.program-item').forEach(item => {
            // Apply initial hidden state for animation
            item.style.opacity = 0;
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(item);
        });
    }

    // Initialize animations for the default active tab if it's Home or Program
    if (document.getElementById('Home').classList.contains('active')) {
        animateNumbers();
    }
    if (document.getElementById('Program').classList.contains('active')) {
        animateProgramItems();
    }
});