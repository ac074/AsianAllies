document.addEventListener('DOMContentLoaded', () => {
  // Function to insert Navbar
  function insertNavbar() {
    const navbarHTML = `
      <nav>
        <div class="nav-left">
          <ul>
            <li>
              <img src="assets/images/logo.png" alt="Logo" class="logo">
              <a href="index.html">AsianAllies</a>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="data.html">Data</a></li>
            <li><a href="support.html">Support</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
      </nav>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
  }

  // Function to insert Footer
  function insertFooter() {
    const footerHTML = `
      <footer class="footer">
        <div class="footer-section">
          <h3>Sitemap</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="data.html">Data</a></li>
            <li><a href="support.html">Support</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="about.html#faq-section">FAQs</a></li>
            <li><a href="about.html#contact-section">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="https://www.aaldef.org">AALDEF</a></li>
            <li><a href="https://stopaapihate.org">Stop AAPI Hate</a></li>
            <li><a href="https://aapiequityalliance.org">A3PCON</a></li>
            <li><a href="https://www.advancingjustice-aajc.org">AAJC</a></li>
          </ul>
        </div>
      </footer>
    `;
    document.getElementById('footer').innerHTML = footerHTML;
  }

  // Initialize the Navbar and Footer
  insertNavbar();
  insertFooter();

  // Carousel
  let currentSlideIndex = 0;
  function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    if (items.length > 0 && dots.length > 0) {
      items.forEach(item => item.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      items[index].classList.add('active');
      dots[index].classList.add('active');
    }
  }
  function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentSlideIndex = (currentSlideIndex + 1) % items.length;
    showSlide(currentSlideIndex);
  }
  function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
  }
  window.currentSlide = currentSlide;
  // Automatically move to the next slide every 10 seconds
  setInterval(nextSlide, 10000);
  // Show the first slide initially
  showSlide(currentSlideIndex);

  // FAQ Toggle
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
      const faqItem = event.target.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const isVisible = answer.style.display === 'block';
      answer.style.display = isVisible ? 'none' : 'block';
      event.target.textContent = isVisible ? '+' : '−';
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formResponse = document.getElementById('form-response');
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();
        console.log(response);
        console.log(result);
        if (response.ok) {
          formResponse.style.display = 'block';
          contactForm.reset();
          setTimeout(() => {
            formResponse.style.display = 'none';
          }, 5000);
        } else {
          alert('Oops! There was a problem with your submission.');
        }
      } catch (error) {
        console.error('Submission error', error);
        alert('Oops! There was a problem with your submission.');
      }
    });
  }
});
