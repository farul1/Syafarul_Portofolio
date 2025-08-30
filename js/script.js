 // JavaScript untuk navigasi dan efek interaktif
        document.addEventListener('DOMContentLoaded', function() {
            let menuBtn = document.querySelector('#menu-btn');
            let header = document.querySelector('.header');
            
            menuBtn.onclick = () => {
                menuBtn.classList.toggle('fa-times');
                header.classList.toggle('active');
            };
            
            window.onscroll = () => {
                menuBtn.classList.remove('fa-times');
                header.classList.remove('active');
            };
            
            // Animasi saat scrolling
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
        });