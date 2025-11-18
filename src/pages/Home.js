import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Home.css';
import {
  FaRocket, FaLock, FaStar, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp, FaArrowRight
} from 'react-icons/fa';
import { useLikedProducts } from '../context/LikedProductsContext';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { toggleLike, isLiked } = useLikedProducts();
  const { addToCart, cartItems, updateQuantity, isInCart } = useCart();
  const [justArrivedProducts, setJustArrivedProducts] = useState([]);
  const [justArrivedIndex, setJustArrivedIndex] = useState(0);
  const [justBakedProducts, setJustBakedProducts] = useState([]);
  const [justBakedIndex, setJustBakedIndex] = useState(0);

  // Hero slideshow images
  const heroImages = [
    '/assets/background/baked-image1.jpg',
    '/assets/background/bakerimgnew.png',
    '/assets/background/bakerimg.png'
  ];

  // Individual catalogues for sections
  const justArrivedCatalogue = useMemo(() => ([
    {
      id: 201,
      name: 'Midnight Belgian Chocolate Cake',
      category: 'Cake',
      originalPrice: 2099,
      price: 1799,
      discount: 14,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1559627548-5c32b66f2117?w=400&h=400&fit=crop',
      shortDescription: 'Velvety dark chocolate sponge layered with espresso-infused ganache and cocoa nib crunch.',
      fullDescription: 'Our pastry chefs finish this showstopper with a glossy Belgian chocolate mirror glaze, gold-dusted cocoa nibs, and a hazelnut praline base for an irresistible texture contrast.',
      features: ['Single-origin Belgian cocoa', 'Eggless option available', 'Complimentary chocolate plaque', 'Delivered in insulated packaging', 'Perfect for celebrations'],
      specifications: { 'Size': '1.8 kg', 'Serves': '14 people', 'Allergens': 'Gluten, Dairy, Nuts', 'Best Before': '48 hours refrigerated' },
      arrivalDate: '2025-11-12',
      isFresh: true,
      freshnessTag: 'Baked Today'
    },
    {
      id: 202,
      name: 'Pistachio Raspberry Entremet',
      category: 'Dessert',
      originalPrice: 1899,
      price: 1599,
      discount: 16,
      rating: 4.8,
      reviews: 121,
      image: 'https://images.unsplash.com/photo-1603027547465-405b7be2ee31?w=400&h=400&fit=crop',
      shortDescription: 'Layers of pistachio sponge, raspberry confit, and vanilla bean bavarois finished with a velvet spray.',
      fullDescription: 'Inspired by French patisserie, this entremet combines nutty pistachio mousse, tart raspberry gel, and crunchy pistachio feuilletine for a refined dessert experience.',
      features: ['Gluten-light sponge', 'Vibrant raspberry heart', 'Natural colouring only', 'Gift-ready magnetic box', 'Ideal for fine dining menus'],
      specifications: { 'Size': '1.2 kg', 'Serves': '10 people', 'Allergens': 'Nuts, Dairy, Eggs', 'Best Before': '36 hours refrigerated' },
      arrivalDate: '2025-11-10',
      isFresh: true,
      freshnessTag: 'Chef’s pick'
    },
    {
      id: 203,
      name: 'Salted Caramel Éclair Box',
      category: 'Pastry',
      originalPrice: 899,
      price: 749,
      discount: 17,
      rating: 4.7,
      reviews: 96,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
      shortDescription: 'Six choux éclairs filled with Madagascar vanilla cream and topped with salted caramel glaze.',
      fullDescription: 'Each éclair is piped to order, dipped in amber caramel, and garnished with house-made almond brittle for a delightful crunch in every bite.',
      features: ['Madagascar vanilla beans', 'Small batch caramel', 'Crunchy almond brittle topping', 'Delivered chilled', 'Perfect for gifting'],
      specifications: { 'Pieces': '6 éclairs', 'Allergens': 'Gluten, Dairy, Eggs, Nuts', 'Best Before': '24 hours refrigerated', 'Serving Suggestion': 'Best enjoyed chilled' },
      arrivalDate: '2025-11-09',
      isFresh: true,
      freshnessTag: 'Hand-piped'
    },
    {
      id: 204,
      name: 'Pumpkin Spice Basque Cheesecake',
      category: 'Dessert',
      originalPrice: 1699,
      price: 1399,
      discount: 18,
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1505253216364-51258e6c0f30?w=400&h=400&fit=crop',
      shortDescription: 'Silky Basque cheesecake with roasted pumpkin purée, warming spices, and torched sugar crust.',
      fullDescription: 'We slow-bake our seasonal cheesecake for a rustic caramelised finish, pairing autumn spices with locally sourced pumpkin for a melt-in-the-mouth texture.',
      features: ['Roasted heirloom pumpkin', 'Cinnamon-ginger spice blend', 'Naturally gluten-free base', 'Caramelised sugar top', 'Autumn limited release'],
      specifications: { 'Size': '1.3 kg', 'Serves': '12 people', 'Allergens': 'Dairy, Eggs', 'Best Before': '48 hours refrigerated' },
      arrivalDate: '2025-11-07',
      isFresh: true,
      freshnessTag: 'Seasonal drop'
    }
  ]), []);

  const justBakedCatalogue = useMemo(() => ([
    {
      id: 301,
      name: 'Heirloom Tomato Focaccia',
      category: 'Bread',
      originalPrice: 599,
      price: 499,
      discount: 17,
      rating: 4.9,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1604908177035-9a2c9d5b516f?w=400&h=400&fit=crop',
      shortDescription: 'Olive oil infused focaccia topped with heirloom tomatoes, sea salt flakes, and garden rosemary.',
      fullDescription: 'Fermented for 30 hours for maximum flavour, this focaccia boasts a crisp crust and pillowy crumb, finished with extra virgin olive oil right out of the oven.',
      features: ['Cold-pressed olive oil', 'Naturally leavened dough', 'Seasonal tomato medley', 'Vegan friendly', 'Baked on stone deck'],
      specifications: { 'Size': '12 x 12 inches', 'Allergens': 'Gluten', 'Best Before': '24 hours', 'Serving Suggestion': 'Serve warm with dips' },
      arrivalDate: '2025-11-12',
      isFresh: true,
      freshnessTag: 'Oven Hot'
    },
    {
      id: 302,
      name: 'Butter Croissant Box',
      category: 'Pastry',
      originalPrice: 699,
      price: 579,
      discount: 17,
      rating: 4.9,
      reviews: 176,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop',
      shortDescription: 'Six flaky, hand-laminated croissants made with French butter and slow-fermented dough.',
      fullDescription: 'Our signature croissants are rolled over three days to achieve 81 layers of buttery perfection. Each batch is baked every morning for the crispiest exterior and custard-soft interior.',
      features: ['Imported French butter', 'Three-day lamination', 'Light, honeycomb crumb', 'Delivered warm every morning', 'Free mini jam jars', 'Eggless option on request'],
      specifications: { 'Pieces': '6 croissants', 'Allergens': 'Gluten, Dairy', 'Serving Suggestion': 'Best warm', 'Best Before': '12 hours' },
      arrivalDate: '2025-11-11',
      isFresh: true,
      freshnessTag: 'Baked at dawn'
    },
    {
      id: 303,
      name: 'Garlic Herb Knotted Rolls',
      category: 'Bread',
      originalPrice: 349,
      price: 289,
      discount: 17,
      rating: 4.7,
      reviews: 102,
      image: 'https://images.unsplash.com/photo-1589308078053-f34a5093f5cf?w=400&h=400&fit=crop',
      shortDescription: 'Twelve pillowy dinner rolls brushed with garlic herb butter and sprinkled with smoked sea salt.',
      fullDescription: 'Each knot is hand-rolled, proofed to perfection, and basted with clarified butter infused with roasted garlic, thyme, and parsley.',
      features: ['Hand-shaped knots', 'Roasted garlic butter', 'Smoked sea salt finish', 'Reheat-friendly packaging', 'Ideal for family dinners'],
      specifications: { 'Pieces': '12 rolls', 'Allergens': 'Gluten, Dairy', 'Best Before': '24 hours', 'Serving Suggestion': 'Warm before serving' },
      arrivalDate: '2025-11-10',
      isFresh: true,
      freshnessTag: 'Batch of the day'
    },
    {
      id: 304,
      name: 'Classic Brioche Loaf',
      category: 'Bread',
      originalPrice: 449,
      price: 379,
      discount: 16,
      rating: 4.8,
      reviews: 118,
      image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=400&h=400&fit=crop',
      shortDescription: 'Rich, buttery brioche loaf with a tender crumb and glossy crust, perfect for French toast.',
      fullDescription: 'Made with cultured butter and free-range eggs, our brioche loaf is slow-fermented overnight for delicate sweetness and aroma.',
      features: ['Cultured butter', 'Overnight fermentation', 'Perfect for French toast', 'Keeps moist for 48 hours', 'Available sliced on request'],
      specifications: { 'Weight': '600 g', 'Allergens': 'Gluten, Dairy, Eggs', 'Best Before': '48 hours', 'Serving Suggestion': 'Toast lightly and serve with jam' },
      arrivalDate: '2025-11-09',
      isFresh: true,
      freshnessTag: 'Chef’s bake'
    }
  ]), []);

  useEffect(() => {
    const now = new Date();
    const sortedCatalogue = [...justArrivedCatalogue].sort(
      (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
    );

    const recentArrivals = sortedCatalogue.filter((item) => {
      const arrivalDate = new Date(item.arrivalDate);
      if (Number.isNaN(arrivalDate.getTime())) {
        return false;
      }
      const diffInDays = (now - arrivalDate) / (1000 * 60 * 60 * 24);
      return diffInDays <= 10;
    });

    const arrivalsToShow = recentArrivals.length > 0 ? recentArrivals : sortedCatalogue;
    setJustArrivedProducts(arrivalsToShow.slice(0, 6));
  }, [justArrivedCatalogue]);

  useEffect(() => {
    if (justArrivedProducts.length === 0) {
      if (justArrivedIndex !== 0) {
        setJustArrivedIndex(0);
      }
      return;
    }

    if (justArrivedProducts.length <= 3 && justArrivedIndex !== 0) {
      setJustArrivedIndex(0);
    } else if (justArrivedIndex >= justArrivedProducts.length) {
      setJustArrivedIndex(0);
    }
  }, [justArrivedProducts, justArrivedIndex]);

  useEffect(() => {
    const sortedCatalogue = [...justBakedCatalogue].sort(
      (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
    );

    const freshItems = sortedCatalogue.filter((item) => item.isFresh);
    const fallbackFreshItems = freshItems.length > 0 ? freshItems : sortedCatalogue;
    setJustBakedProducts(fallbackFreshItems.slice(0, 8));
  }, [justBakedCatalogue]);

  useEffect(() => {
    if (justBakedProducts.length === 0) {
      if (justBakedIndex !== 0) {
        setJustBakedIndex(0);
      }
      return;
    }

    if (justBakedProducts.length <= 3 && justBakedIndex !== 0) {
      setJustBakedIndex(0);
    } else if (justBakedIndex >= justBakedProducts.length) {
      setJustBakedIndex(0);
    }
  }, [justBakedProducts, justBakedIndex]);

  const visibleJustArrivedProducts = useMemo(() => {
    if (justArrivedProducts.length <= 3) {
      return justArrivedProducts;
    }

    const endIndex = justArrivedIndex + 3;

    if (endIndex <= justArrivedProducts.length) {
      return justArrivedProducts.slice(justArrivedIndex, endIndex);
    }

    const firstBatch = justArrivedProducts.slice(justArrivedIndex);
    const remainingCount = 3 - firstBatch.length;
    return [...firstBatch, ...justArrivedProducts.slice(0, remainingCount)];
  }, [justArrivedProducts, justArrivedIndex]);

  const visibleJustBakedProducts = useMemo(() => {
    if (justBakedProducts.length <= 3) {
      return justBakedProducts;
    }

    const endIndex = justBakedIndex + 3;

    if (endIndex <= justBakedProducts.length) {
      return justBakedProducts.slice(justBakedIndex, endIndex);
    }

    const firstBatch = justBakedProducts.slice(justBakedIndex);
    const remainingCount = 3 - firstBatch.length;
    return [...firstBatch, ...justBakedProducts.slice(0, remainingCount)];
  }, [justBakedProducts, justBakedIndex]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#ffc107" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="url(#half)" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      }
    }
    return stars;
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleToggleLike = (product, event) => {
    event.stopPropagation();
    toggleLike(product);
  };

  const handleNextJustArrived = () => {
    if (justArrivedProducts.length <= 3) {
      return;
    }

    setJustArrivedIndex((prevIndex) => (prevIndex + 3) % justArrivedProducts.length);
  };

  const handleNextJustBaked = () => {
    if (justBakedProducts.length <= 3) {
      return;
    }

    setJustBakedIndex((prevIndex) => (prevIndex + 3) % justBakedProducts.length);
  };

  const handleAddToCart = (product, event) => {
    if (event) event.stopPropagation();
    addToCart(product);
  };

  // Get quantity of a product in cart
  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quantity change
  const handleQuantityChange = (product, newQuantity, event) => {
    if (event) event.stopPropagation();
    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          } else {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect for hero content
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form handling
  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbw5AMZlHOjaa_GfCm1m7MnJ66bH0uY_r5GDCbE6iPgrOhk-3T-hEW8J4v0S_w_U4CY/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log("Success: Your message has been sent successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error:", error);
      console.log("Error: There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
          ))}
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-left-content">
            <div className="hero-text-container">
              <h1 className="hero-title">Artisanal Bakery <br />Collection</h1>
              <p className="hero-subtitle">
                Discover handcrafted cakes, pastries, and breads baked fresh daily for every celebration.
              </p>
            </div>

            <div className="hero-features">
              <div className="feature-box">
                <div className="feature-number">100+</div>
                <div className="feature-label">Handcrafted Treats</div>
              </div>
              <div className="feature-box">
                <div className="feature-number">Fresh</div>
                <div className="feature-label">Daily Bakes</div>
              </div>

            </div>
          </div>

          <div className="hero-right-content">
            <div className="camera-product">
            </div>
          </div>
        </div>
      </section>

      {/* Hero Spacer */}
      <div className="hero-spacer"></div>

      {/* Just Arrived */}
      <section
        id="just-arrived-section"
        ref={(el) => sectionRefs.current['just-arrived-section'] = el}
        className={`just-arrived-section ${visibleSections.has('just-arrived-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <h2 className="gradient-text-primary">Just Arrived</h2>
          <p className="subtitle">Check out our latest additions to the collection</p>
          {justArrivedProducts.length > 3 && (
            <div className="just-arrived-controls">
              <button
                type="button"
                className="just-arrived-next-btn"
                onClick={handleNextJustArrived}
              >
                Next <FaArrowRight />
              </button>
            </div>
          )}
          <div className="just-arrived-grid">
            {visibleJustArrivedProducts.map(product => (
              <div key={product.id} className="just-arrived-card">
                <div className="just-arrived-image">
                  <img src={product.image} alt={product.name} className="just-arrived-img" />
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                  <div className="product-actions-btns">
                    <button
                      className={`like-icon-btns ${isLiked(product.id) ? 'liked' : ''}`}
                      onClick={(e) => handleToggleLike(product, e)}
                      title={isLiked(product.id) ? "Unlike" : "Like"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                    <button
                      className="view-icon-btns"
                      onClick={() => handleViewDetails(product)}
                      title="View Details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  <span className="new-badge">NEW</span>
                </div>
                <div className="just-arrived-content">
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.reviews} reviews)</span>
                  </div>
                  <p>{product.shortDescription}</p>
                  <div className="product-footer">
                    <div className="price-section">
                      {product.discount > 0 && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                      <span className="product-price">₹{product.price}</span>
                    </div>
                    {isInCart(product.id) && getProductQuantity(product.id) > 0 ? (
                      <div className="quantity-selector-home">
                        <button
                          className="quantity-btn-home minus-btn"
                          onClick={(e) => handleQuantityChange(product, getProductQuantity(product.id) - 1, e)}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="quantity-value-home">{getProductQuantity(product.id)}</span>
                        <button
                          className="quantity-btn-home plus-btn"
                          onClick={(e) => handleQuantityChange(product, getProductQuantity(product.id) + 1, e)}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart-btn-home"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresherly Baked Section */}
      <section
        id="freshly-baked-section"
        ref={(el) => sectionRefs.current['freshly-baked-section'] = el}
        className={`tools-section ${visibleSections.has('freshly-baked-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <h2 className="gradient-text-primary">Fresherly Baked</h2>
          <p className="subtitle">Straight from our ovens — limited batches every morning</p>
          {justBakedProducts.length > 3 && (
            <div className="just-arrived-controls">
              <button
                type="button"
                className="just-arrived-next-btn"
                onClick={handleNextJustBaked}
              >
                Next <FaArrowRight />
              </button>
            </div>
          )}
          <div className="just-arrived-grid">
            {visibleJustBakedProducts.map((product) => (
              <div key={product.id} className="just-arrived-card">
                <div className="just-arrived-image">
                  <img src={product.image} alt={product.name} className="just-arrived-img" />
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                  <div className="product-actions-btns">
                    <button
                      className={`like-icon-btns ${isLiked(product.id) ? 'liked' : ''}`}
                      onClick={(e) => handleToggleLike(product, e)}
                      title={isLiked(product.id) ? "Unlike" : "Like"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                    <button
                      className="view-icon-btns"
                      onClick={() => handleViewDetails(product)}
                      title="View Details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  {product.freshnessTag && (
                    <span className="new-badge">{product.freshnessTag}</span>
                  )}
                </div>
                <div className="just-arrived-content">
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.reviews} reviews)</span>
                  </div>
                  <p>{product.shortDescription}</p>
                  <div className="product-footer">
                    <div className="price-section">
                      {product.discount > 0 && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                      <span className="product-price">₹{product.price}</span>
                    </div>
                    {isInCart(product.id) && getProductQuantity(product.id) > 0 ? (
                      <div className="quantity-selector-home">
                        <button
                          className="quantity-btn-home minus-btn"
                          onClick={(e) => handleQuantityChange(product, getProductQuantity(product.id) - 1, e)}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="quantity-value-home">{getProductQuantity(product.id)}</span>
                        <button
                          className="quantity-btn-home plus-btn"
                          onClick={(e) => handleQuantityChange(product, getProductQuantity(product.id) + 1, e)}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart-btn-home"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section
        id="services-section"
        ref={(el) => sectionRefs.current['services-section'] = el}
        className={`services-section ${visibleSections.has('services-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <h2 className="gradient-text-primary">Services We Offer</h2>
          <p className="subtitle">Made-to-order treats and catering for every occasion</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=400&fit=crop')" }}></div>
              <div className="service-content">
                <h3>Custom Cakes & Events</h3>
                <p>Celebrate every occasion with stunning centrepiece cakes crafted by our pastry chefs.</p>
                <ul className="service-features">
                  <li>Weddings, birthdays, and corporate celebrations</li>
                  <li>Personalised flavours, fillings, and finishes</li>
                  <li>Design consultations and on-time delivery</li>
                </ul>
                <div className="service-buttons">
                  <a href="/menu" className="btn btn-outline">
                    <FaRocket />View Signature Cakes
                  </a>
                  <a href="/contact" className="btn btn-primary">
                    <FaStar />Plan Your Event
                  </a>
                </div>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop')" }}></div>
              <div className="service-content">
                <h3>Bakery Catering Packages</h3>
                <p>Curated sweet and savoury platters perfect for meetings, launches, and family gatherings.</p>
                <ul className="service-features">
                  <li>Breakfast, high-tea, and dessert spreads</li>
                  <li>Freshly baked, locally sourced ingredients</li>
                  <li>Doorstep delivery across the city</li>
                  <li>Customisable menus for dietary needs</li>
                </ul>
                <div className="service-buttons">
                  <a href="/catering" className="btn btn-primary">
                    <FaStar />Explore Catering Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Bakery */}
      <section
        id="why-choose-section"
        ref={(el) => sectionRefs.current['why-choose-section'] = el}
        className={`why-choose-section ${visibleSections.has('why-choose-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <h2 className="gradient-text-primary">Why Choose Our Bakery?</h2>
          <p className="subtitle">We bring gourmet patisserie experiences to your table</p>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon blue">
                <FaLock />
              </div>
              <h3>Freshness Guaranteed</h3>
              <p>Every batch is crafted daily with locally sourced ingredients and artisanal techniques.</p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon green">
                <FaStar />
              </div>
              <h3>Tailored Creations</h3>
              <p>From flavours to finishes, we customise every bake to match your celebration and taste.</p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon orange">
                <FaRocket />
              </div>
              <h3>Doorstep Delivery</h3>
              <p>Enjoy temperature-controlled delivery across Bangalore with real-time order updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials-section"
        ref={(el) => sectionRefs.current['testimonials-section'] = el}
        className={`testimonials-section ${visibleSections.has('testimonials-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <div className="testimonials-header">
            <h2 className="gradient-text-primary">What Food Lovers Say</h2>
            <p className="subtitle">Sweet words from our happy patrons</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="testimonial-text">"The custom cake was a showstopper—looked stunning and tasted even better. Delivery was perfectly on time."</p>
                <div className="testimonial-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="star filled" />)}
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Ananya</h4>
                    <span>Event Planner</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="testimonial-text">"Their weekend brunch box is my go-to treat. Fresh, indulgent, and different every single time."</p>
                <div className="testimonial-rating">
                  <div className="stars">
                    {[...Array(4)].map((_, i) => <FaStar key={i} className="star filled" />)}
                    <FaStar className="star" />
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Rahul</h4>
                    <span>Food Blogger</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="testimonial-text">"Our office loved the dessert platter. The team handled special dietary requests with ease."</p>
                <div className="testimonial-rating">
                  <div className="stars">
                    {[...Array(4)].map((_, i) => <FaStar key={i} className="star filled" />)}
                    <FaStar className="star" />
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Meera</h4>
                    <span>Corporate Chef</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Custom Quote */}
      <section
        id="cta-section"
        ref={(el) => sectionRefs.current['cta-section'] = el}
        className={`cta-section ${visibleSections.has('cta-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="gradient-text-primary">Need a Custom Celebration Cake?</h2>
              <p>Share your theme and guest list — we will design a dessert spread that delights everyone.</p>
            </div>
            <div className="cta-button">
              <a href="/contact" className="cta-btn">
                <span>Start Planning</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-section"
        ref={(el) => sectionRefs.current['contact-section'] = el}
        className={`contact-section ${visibleSections.has('contact-section') ? 'animate-in' : 'animate-out'}`}
      >
        <div className="container">
          <div className="contact-header">
            <h2 className="gradient-text-primary">Get In Touch</h2>
            <p className="subtitle">Planning a celebration? Let us craft the perfect menu of cakes and confections for you.</p>
          </div>

          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <div className="form-icon">
                  <FaEnvelope />
                </div>
                <div className="form-title">
                  <h3>Send us a message</h3>
                  <p>We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <FaEnvelope />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-info-item">
                <div className="info-icon visit">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h4>Visit Us</h4>
                  <p>30, 4th Main Rd, 4th T Block West,<br />Kumar Swamy Layout, Hassan,<br />Karnataka 563217</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon call">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  <p>+91 {process.env.REACT_APP_PHONE_NUMBER}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon email">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  <p>bookmycamera@gmail.com</p>
                </div>
              </div>

              <div className="social-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://www.instagram.com/bookmycamera_?igsh=MWQzaGNwNThxeGF0dQ=="
                    className="social-link instagram"
                    target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/company/bookmycamera"
                    className="social-link linkedin"
                    target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={`https://wa.me/${process.env.REACT_APP_PHONE_NUMBER}?text=Hello%20I%20would%20like%20to%20know%20about%20the%20pricing.`}
                    className="social-link whatsapp">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Product Details */}
      {showModal && selectedProduct && (
        <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-product-img" />
              </div>
              <div className="modal-title-section">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="modal-rating">
                  <div className="stars">{renderStars(selectedProduct.rating)}</div>
                  <span className="rating-value">{selectedProduct.rating}</span>
                  <span className="review-count">({selectedProduct.reviews} reviews)</span>
                </div>
                <div className="modal-price-section">
                  {selectedProduct.discount > 0 && (
                    <span className="modal-original-price">₹{selectedProduct.originalPrice}</span>
                  )}
                  <span className="modal-price">₹{selectedProduct.price}<span className="price-period"></span></span>
                  {selectedProduct.discount > 0 && (
                    <span className="modal-discount-badge">Save {selectedProduct.discount}%</span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedProduct.fullDescription}</p>
              </div>

              <div className="modal-section">
                <h3>Key Features</h3>
                <ul className="features-list">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Specifications</h3>
                <div className="specifications-grid">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                {isInCart(selectedProduct.id) && getProductQuantity(selectedProduct.id) > 0 ? (
                  <div className="modal-quantity-selector-home">
                    <button
                      className="modal-quantity-btn-home minus-btn"
                      onClick={() => handleQuantityChange(selectedProduct, getProductQuantity(selectedProduct.id) - 1)}
                      aria-label="Decrease quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <span className="modal-quantity-value-home">{getProductQuantity(selectedProduct.id)}</span>
                    <button
                      className="modal-quantity-btn-home plus-btn"
                      onClick={() => handleQuantityChange(selectedProduct, getProductQuantity(selectedProduct.id) + 1)}
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    className="modal-cart-btn"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
