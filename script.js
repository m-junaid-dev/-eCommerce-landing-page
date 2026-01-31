 
    // Product data
    const products = [
      { id: 1, name: "Elegant Flower Box", price: "₹999", category: "wedding", image: "./images/hero-section.jpg" },
      { id: 2, name: "Soft Teddy Bear", price: "₹799", category: "birthday", image: "./images/hero-section.jpg" },
      { id: 3, name: "Customized Mug", price: "₹599", category: "customized", image: "./images/hero-section.jpg" },
      { id: 4, name: "Chocolate Basket", price: "₹1,299", category: "birthday", image: "./images/hero-section.jpg" },
      { id: 5, name: "Jewelry Box", price: "₹1,899", category: "jewellery", image: "./images/hero-section.jpg" },
      { id: 6, name: "Personalized Frame", price: "₹1,099", category: "customized", image: "./images/hero-section.jpg" },
      { id: 7, name: "Luxury Perfume", price: "₹2,499", category: "wedding", image: "./images/hero-section.jpg" },
      { id: 8, name: "Rose Bouquet", price: "₹499", category: "wedding", image: "./images/hero-section.jpg" },
      { id: 9, name: "Photo Lamp", price: "₹1,499", category: "customized", image: "./images/hero-section.jpg" },
      { id: 10, name: "Customized Pillow", price: "₹899", category: "customized", image: "./images/hero-section.jpg" },
      { id: 11, name: "Artistic Candle", price: "₹299", category: "birthday", image: "./images/hero-section.jpg" },
      { id: 12, name: "Couple Keychain", price: "₹349", category: "wedding", image: "./images/hero-section.jpg" },
      { id: 13, name: "Mini Flower Pot", price: "₹249", category: "birthday", image: "./images/hero-section.jpg" },
      { id: 14, name: "Golden Bracelet", price: "₹1,599", category: "jewellery", image: "./images/hero-section.jpg" },
      { id: 15, name: "Love Explosion Box", price: "₹1,299", category: "wedding", image: "./images/hero-section.jpg" },
      { id: 16, name: "Designer Watch", price: "₹3,499", category: "jewellery", image: "./images/hero-section.jpg" }
    ];

    // Initialize products
    function initProducts() {
      const productsGrid = document.getElementById('productsGrid');
      productsGrid.innerHTML = '';
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.setAttribute('onclick', `openModal('${product.id}')`);
        
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <button class="view-btn">View Details</button>
        `;
        
        productsGrid.appendChild(productCard);
      });
    }

    // Filter products by category
    function filterProducts(category) {
      const tabs = document.querySelectorAll('.category-tab');
      tabs.forEach(tab => tab.classList.remove('active'));
      
      event.target.classList.add('active');
      
      const products = document.querySelectorAll('.product-card');
      
      products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }

    function toggleMenu() {
      const menu = document.getElementById("menu");
      const navbar = document.getElementById("navbar");
      menu.classList.toggle("active");
      navbar.classList.toggle("active");
    }

    function toggleDropdown(element) {
      if (window.innerWidth <= 768) {
        element.classList.toggle("show");
      }
    }

    function focusSearch() {
      document.getElementById("searchInput").focus();
    }

    // Dropdown hover (desktop)
    const categoriesItem = document.getElementById("categories-item");
    let hoverTimer;
    categoriesItem.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        hoverTimer = setTimeout(() => {
          categoriesItem.querySelector(".dropdown").classList.add("show");
        }, 400);
      }
    });
    categoriesItem.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      if (window.innerWidth > 768) {
        categoriesItem.querySelector(".dropdown").classList.remove("show");
      }
    });

    // Close menu on outside click
    document.addEventListener("click", function(e) {
      const menu = document.getElementById("menu");
      const toggle = document.querySelector(".menu-toggle");
      const navbar = document.getElementById("navbar");
      if (window.innerWidth <= 768 && menu.classList.contains("active")) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          menu.classList.remove("active");
          navbar.classList.remove("active");
        }
      }
    });

    // 🟢 Cart counter
    let cartCount = 0;
    function addToCart() {
      cartCount++;
      document.getElementById("cartCount").textContent = cartCount;
    }

    // 🟢 Carousel Fix – Smooth Infinite Loop (no backward transition)
    const track = document.getElementById("carouselTrack");
    const slides = track.children;
    let currentSlide = 0;
    let autoSlideInterval;
    const totalSlides = slides.length;

    // Clone first and last slide for smooth infinite looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    let slideIndex = 1; // Start from first real slide
    const allSlides = track.children;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;

    function moveSlide(direction) {
      slideIndex += direction;
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(-${slideIndex * 100}%)`;

      track.addEventListener("transitionend", () => {
        if (allSlides[slideIndex].getAttribute("alt") === allSlides[0].getAttribute("alt")) {
          track.style.transition = "none";
          slideIndex = totalSlides;
          track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        if (allSlides[slideIndex].getAttribute("alt") === allSlides[allSlides.length - 1].getAttribute("alt")) {
          track.style.transition = "none";
          slideIndex = 1;
          track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
      }, { once: true });

      resetAutoSlide();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => moveSlide(1), 3000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    // 🟢 Product Modal Script (Fully Fixed)
    function openModal(productId) {
      const modal = document.getElementById("productModal");
      const product = products.find(p => p.id == productId);
      
      if (!product) return;

      document.getElementById("modalImage").src = product.image;
      document.getElementById("modalTitle").textContent = product.name;
      document.getElementById("modalDesc").textContent =
        `${product.name} - Price: ${product.price}. This is a perfect gift for your loved ones!`;

      modal.style.display = "flex";
    }

    function closeModal() {
      document.getElementById("productModal").style.display = "none";
    }

    window.onclick = function(e) {
      const modal = document.getElementById("productModal");
      if (e.target === modal) {
        closeModal();
      }
    };

    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
      initProducts();
    });
 