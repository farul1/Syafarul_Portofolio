  // Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Fade in animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form submission
  document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Not provided';
    const subject = formData.get('subject');
    const message = formData.get('message');
    const contactMethod = formData.get('contact_method');

    if (contactMethod === 'email') {
      const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      const mailtoLink = `mailto:syafarul.priwantoro@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
      window.location.href = mailtoLink;
      alert('📧 Your default email client will open. Please send the prepared email.');
    } 
    else if (contactMethod === 'whatsapp') {
      const whatsappMessage = `Hello! I'm ${name}%0A%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0A%0AMessage: ${message}`;
      const whatsappURL = `https://wa.me/6282257663431?text=${whatsappMessage}`;
      window.open(whatsappURL, '_blank');
      alert('💬 WhatsApp will open with your message prepared. Please send it.');
    } 
    else if (contactMethod === 'formspree') {
      try {
        const response = await fetch("https://formspree.io/f/mjkewygk", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ name, email, phone, subject, message })
        });

        if (response.ok) {
          alert('✅ Pesan berhasil terkirim via Formspree! Silakan cek email Anda.');
          this.reset();
        } else {
          alert('❌ Gagal mengirim via Formspree. Coba lagi nanti.');
        }
      } catch (err) {
        alert('⚠️ Terjadi kesalahan koneksi.');
      }
    }
  });

  // Button loading animation
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.type !== 'submit') return;
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      this.disabled = true;
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    });
  });
