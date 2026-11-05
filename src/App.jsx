import { useMemo, useRef, useState } from 'react';

const products = [
  { id: 'jordan', brand: 'Nike', name: 'Nike Air Jordan', price: 849.69, label: 'BEST SELLER', image: '/assets/nike-air-jordan.png', color: 'Blue / White', description: 'Air Jordan is an American brand of basketball shoes athletic, casual, and style clothing produced by Nike.' },
  { id: 'airmax', brand: 'Nike', name: 'Nike Air Max', price: 897.99, label: 'BEST SELLER', image: '/assets/nike-air-max-blue.png', color: 'Blue / White', description: 'Lightweight cushioning and a clean everyday silhouette, made for all-day comfort.' },
  { id: 'jordan-red', brand: 'Nike', name: 'Nike Jordan', price: 493.00, label: 'BEST SELLER', image: '/assets/nike-jordan-red.png', color: 'White / Red', description: 'A fresh court-inspired classic with a bold red finish and a soft, cushioned feel.' },
  { id: 'club', brand: 'Nike', name: 'Nike Club Max', price: 558.70, label: 'BEST SELLER', image: '/assets/nike-club-max.png', color: 'White / Red', description: 'A versatile low profile sneaker with a supportive sole and comfortable fit.' },
  { id: 'club-blue', brand: 'Nike', name: 'Nike Club Max', price: 849.69, label: 'BEST CHOICE', image: '/assets/nike-club-white-blue.png', color: 'White / Blue', description: 'A clean everyday trainer with a light upper and a bright blue heel.' },
  { id: 'orange', brand: 'Nike', name: 'Nike Air Max', price: 129.70, label: 'BEST SELLER', image: '/assets/nike-air-max-orange.png', color: 'White / Orange', description: 'A lively colorway with a comfortable sole and a breathable upper.' },
  { id: 'puma', brand: 'Puma', name: 'Puma Air', price: 458.70, label: 'BEST SELLER', image: '/assets/puma-air.png', color: 'Black / Gold', description: 'A sharp black trainer with responsive cushioning and subtle gold details.' },
  { id: 'airmax-white', brand: 'Nike', name: 'Nike Air Max', price: 889.90, label: 'BEST SELLER', image: '/assets/nike-air-max-white.png', color: 'Blue / White', description: 'A streamlined running silhouette with soft cushioning and a secure fit.' },
];

const slides = [
  { title: <>Start Journey<br />With ShoeZone</>, subtitle: 'Smart, Gorgeous & Fashionable Collection', image: '/assets/nike-air-jordan.png', tag: 'NIKE' },
  { title: <>Follow Latest<br />Style Shoes</>, subtitle: 'There Are Many Beautiful And Attractive Styles', image: '/assets/nike-jordan-red.png', tag: 'STYLE' },
  { title: <>Summer Shoes<br />Nike 2026</>, subtitle: 'A New Season. A New Pair To Love.', image: '/assets/nike-club-white-blue.png', tag: 'SUMMER' },
];

function money(amount) {
  return `RM${Number(amount).toFixed(2)}`;
}

function Icon({ name, size = 20, className = '' }) {
  const paths = {
    back: <><path d="m14.5 18-6-6 6-6" /><path d="M9 12h10" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.3 4.3" /></>,
    heart: <path d="M20.6 8.4c0 4.1-8.6 10-8.6 10s-8.6-5.9-8.6-10a4.6 4.6 0 0 1 8.6-2.2 4.6 4.6 0 0 1 8.6 2.2Z" />,
    bag: <><path d="M5.4 8.2h13.2l1 11.2H4.4l1-11.2Z" /><path d="M8.7 8.2V6.7a3.3 3.3 0 0 1 6.6 0v1.5" /></>,
    home: <><path d="m3.5 10 8.5-7 8.5 7" /><path d="M5.5 9v11h13V9M9.5 20v-6.5h5V20" /></>,
    bell: <><path d="M18 9.5a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></>,
    user: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c.6-3.4 3.1-5.2 7-5.2s6.4 1.8 7 5.2" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    edit: <><path d="m4 16.8-.7 3.9 3.9-.7L19 8.2 15.8 5 4 16.8Z" /><path d="m13.7 7.1 3.2 3.2" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7" /><path d="M10 11v5m4-5v5" /></>,
    check: <path d="m5 12 4.3 4.3L19.5 6" />,
    eye: <><path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" /></>,
    pin: <><path d="M19 10.2c0 5-7 10.1-7 10.1s-7-5.1-7-10.1a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.1" /></>,
    card: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M3.5 9.5h17M7 14.5h4" /></>,
    menu: <><path d="M4 6.5h16M4 12h16M4 17.5h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="8.7" /><path d="M12 7v5l3.4 2" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.dots}</svg>;
}

function StatusBar() {
  return <div className="status-bar"><span>9:41</span><span className="status-icons"><svg width="43" height="14" viewBox="0 0 43 14" aria-hidden="true"><path d="M1 5.1C4.4 2 9.6 2 13 5.1M3.8 8c1.9-1.7 4.5-1.7 6.4 0m-4.3 2.8a1.1 1.1 0 1 0 2.2 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M19 4h2.5v7H19zM24 2h2.5v9H24zM29 1h2.5v10H29z" fill="currentColor"/><rect x="35" y="3" width="6" height="8" rx="1.5" stroke="currentColor" fill="none"/><path d="M41 5h1v4h-1" fill="currentColor"/></svg></span></div>;
}

function Logo({ light = false }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`} aria-label="ShoeZone"><svg viewBox="0 0 28 22" width="22" height="18" aria-hidden="true"><path d="M2.8 14.8c2.7-.4 4.1-2.4 5.1-6.6.3-1.2 1.7-1.6 2.5-.6l2.4 3.2c2.2 2.8 5.1 4.3 9.1 4.7 1.9.2 3.2 1.1 3.2 2.4 0 1.2-1.2 2.1-3.1 2.1H6.4c-2.4 0-4.4-1.1-4.4-2.9 0-.9.3-1.6.8-2.3Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M11.2 10.2 15 11m-2.2 1.5 4.2.8m-2.5 1.5 4 .6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg><span>SHOEZONE</span></div>;
}

function Avatar({ small = false }) {
  return <div className={`avatar ${small ? 'avatar-small' : ''}`} aria-label="Allison Becker">AB</div>;
}

function Header({ title, onBack, right, centered = true }) {
  return <div className={`app-header ${centered ? 'centered' : ''}`}>
    <button className="icon-button back-button" onClick={onBack} aria-label="Go back"><Icon name="back" size={20} /></button>
    <h1>{title}</h1>
    <div className="header-action">{right}</div>
  </div>;
}

function ProductCard({ product, onOpen, onToggleFavorite, onAdd, favorite }) {
  return <article className="product-card">
    <button className="product-image-button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
      <img src={product.image} alt={product.name} />
    </button>
    <button className={`card-heart ${favorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(product.id)} aria-label={favorite ? 'Remove from favourites' : 'Add to favourites'}><Icon name="heart" size={15} /></button>
    <div className="product-label">{product.label}</div>
    <button className="product-name" onClick={() => onOpen(product)}>{product.name}</button>
    <div className="product-card-footer"><strong>{money(product.price)}</strong><button className="quick-add" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}><Icon name="plus" size={17} /></button></div>
  </article>;
}

function BottomNav({ active = 'home', onNavigate, cartCount }) {
  const items = [
    ['home', 'Home', 'home'], ['favorites', 'Favourite', 'heart'], ['cart', 'Cart', 'bag'], ['notifications', 'Notifications', 'bell'], ['profile', 'Profile', 'user'],
  ];
  return <nav className="bottom-nav" aria-label="Main navigation">
    {items.map(([id, label, icon]) => <button key={id} className={`${active === id ? 'active' : ''} ${id === 'cart' ? 'nav-cart' : ''}`} onClick={() => onNavigate(id)} aria-label={label}>
      <span className="nav-icon"><Icon name={icon} size={20} />{id === 'cart' && cartCount > 0 && <i>{cartCount}</i>}</span>{id !== 'cart' && <span className="nav-label">{label}</span>}
    </button>)}
  </nav>;
}

function AuthField({ label, placeholder, type = 'text', icon }) {
  return <label className="field"><span>{label}</span><div className="input-wrap"><input type={type} placeholder={placeholder} required />{icon && <Icon name={icon} size={18} />}</div></label>;
}

function PriceRow({ label, value, total = false }) {
  return <div className={`price-row ${total ? 'price-total' : ''}`}><span>{label}</span><strong>{value}</strong></div>;
}

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [slide, setSlide] = useState(0);
  const [brand, setBrand] = useState('Nike');
  const [query, setQuery] = useState('');
  const [product, setProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState('40');
  const [favorites, setFavorites] = useState(['jordan-red', 'airmax', 'club-blue', 'orange']);
  const [cart, setCart] = useState([
    { productId: 'club', size: 'L', quantity: 1 },
    { productId: 'jordan-red', size: 'M', quantity: 1 },
    { productId: 'airmax', size: 'XL', quantity: 1 },
  ]);
  const [payment, setPayment] = useState('PayPal Card');
  const [profileName, setProfileName] = useState('Allison Becker');
  const [profileEmail, setProfileEmail] = useState('allisonbecker@gmail.com');
  const scrollRef = useRef(null);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + products.find((entry) => entry.id === item.productId).price * item.quantity, 0);
  const shipping = cart.length ? 40.90 : 0;
  const total = subtotal + shipping;
  const filteredProducts = useMemo(() => products.filter((item) => {
    const matchesBrand = brand === 'All' || item.brand.toLowerCase() === brand.toLowerCase();
    const matchesQuery = !query.trim() || item.name.toLowerCase().includes(query.trim().toLowerCase()) || item.brand.toLowerCase().includes(query.trim().toLowerCase());
    return matchesBrand && matchesQuery;
  }), [brand, query]);

  function navigate(next) {
    setScreen(next);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  function openProduct(nextProduct) {
    setProduct(nextProduct);
    setSelectedSize('40');
    navigate('details');
  }

  function toggleFavorite(productId) {
    setFavorites((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }

  function addToCart(nextProduct, size = selectedSize) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === nextProduct.id && item.size === size);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { productId: nextProduct.id, size, quantity: 1 }];
    });
  }

  function updateQuantity(productId, size, delta) {
    setCart((current) => current.map((item) => item.productId === productId && item.size === size ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  }

  function removeFromCart(productId, size) {
    setCart((current) => current.filter((item) => item.productId !== productId || item.size !== size));
  }

  function startShopping() {
    navigate('login');
  }

  function submitAndGo(next) {
    return (event) => { event.preventDefault(); navigate(next); };
  }

  const nav = (target) => navigate(target);
  const showNav = ['home', 'favorites', 'notifications', 'profile'].includes(screen);

  return <main className="scene">
    <div className={`device ${screen === 'menu' ? 'menu-device' : ''}`}>
      <div className="screen-scroll" ref={scrollRef}>
        <StatusBar />

        {screen === 'onboarding' && <section className="onboarding">
          <button className="skip-button" onClick={startShopping}>Skip</button>
          <div className="hero-shoe">
            <span className="hero-word">{slides[slide].tag}</span><span className="hero-dot dot-one" /><span className="hero-dot dot-two" />
            <img src={slides[slide].image} alt="Featured ShoeZone sneaker" />
          </div>
          <div className="onboarding-copy"><h1>{slides[slide].title}</h1><p>{slides[slide].subtitle}</p></div>
          <div className="onboarding-footer"><div className="slide-indicators">{slides.map((_, index) => <span key={index} className={index === slide ? 'current' : ''} />)}</div>
            <button className="primary-button pill-button" onClick={() => slide < slides.length - 1 ? setSlide(slide + 1) : startShopping()}>{slide < slides.length - 1 ? 'Next' : 'Get Started'}</button>
          </div>
        </section>}

        {screen === 'login' && <section className="auth-screen">
          <div className="auth-logo"><Logo /></div><h1>Hello Again!</h1><p className="muted">Welcome Back You've Been Missed</p>
          <form className="auth-form" onSubmit={submitAndGo('home')}><AuthField label="Email address" placeholder="Type here..." type="email" /><AuthField label="Password" placeholder="Type here..." type="password" icon="eye" />
            <button className="text-link recovery-link" type="button" onClick={() => navigate('recovery')}>Recovery Password</button><button className="primary-button full-button" type="submit">Sign In</button>
          </form><p className="auth-switch">Don't Have an Account? <button className="text-link" onClick={() => navigate('signup')}>Sign Up For Free</button></p>
        </section>}

        {screen === 'signup' && <section className="auth-screen signup-screen">
          <Header title="Create Account" onBack={() => navigate('login')} />
          <p className="muted intro-text">Let's Create Account Together</p>
          <form className="auth-form" onSubmit={submitAndGo('home')}><AuthField label="Your Full Name" placeholder="Type here..." /><AuthField label="Email address" placeholder="Type here..." type="email" /><AuthField label="Password" placeholder="Type here..." type="password" icon="eye" />
            <label className="check-row"><input type="checkbox" required /><span>By clicking the Sign Up button, you agree to our <button className="text-link" type="button" onClick={() => navigate('terms')}>Terms and Conditions</button> and <button className="text-link" type="button" onClick={() => navigate('privacy')}>Privacy Policy</button></span></label>
            <button className="primary-button full-button" type="submit">Sign Up</button>
          </form><p className="auth-switch">Already Have an Account? <button className="text-link" onClick={() => navigate('login')}>Sign In</button></p>
        </section>}

        {screen === 'recovery' && <section className="auth-screen recovery-screen"><Header title="Recovery Password" onBack={() => navigate('login')} /><p className="muted intro-text">Please Enter Your Email Address To Receive A Verification Code</p><form className="auth-form" onSubmit={submitAndGo('recovery-success')}><AuthField label="Email address" placeholder="Type here..." type="email" /><button className="primary-button full-button" type="submit">Continue</button></form></section>}
        {screen === 'recovery-success' && <section className="auth-screen success-email"><Header title="Recovery Password" onBack={() => navigate('login')} /><div className="email-success-icon"><Icon name="check" size={38} /></div><h2>Email sent<br />Successfully</h2><button className="primary-button" onClick={() => navigate('login')}>Back To Login Page</button></section>}

        {(screen === 'terms' || screen === 'privacy') && <section className="legal-screen"><Header title={screen === 'terms' ? 'ShoeZone Terms and Conditions' : 'ShoeZone Privacy Policy'} onBack={() => navigate('signup')} /><div className="legal-copy"><p className="legal-date">Effective Date: February 15, 2026</p>
          <p>Welcome to ShoeZone. By using our website or services, you agree to the terms described on this page. Please read them carefully before continuing.</p><h3>{screen === 'terms' ? '1. Acceptance of Terms' : '1. Information We Collect'}</h3><p>{screen === 'terms' ? 'By accessing or using ShoeZone, you agree to follow these terms and all applicable laws. If you do not agree, please discontinue use of the service.' : 'We may collect information that you provide, including your name, email address, and delivery details, when you create an account or place an order.'}</p><h3>{screen === 'terms' ? '2. Products and Orders' : '2. How We Use Information'}</h3><p>Product details, availability, and prices may change. We will confirm order information before checkout. You are responsible for providing accurate account and delivery details.</p><h3>{screen === 'terms' ? '3. Returns and Support' : '3. Keeping Information Safe'}</h3><p>Contact our support team if you have questions about an order, an account, or these policies. We take reasonable steps to protect your information and keep our service reliable.</p><p>By continuing to use ShoeZone, you acknowledge that you have read this page.</p></div></section>}

        {screen === 'home' && <section className="home-screen">
          <div className="home-top"><button className="icon-button menu-trigger" onClick={() => navigate('menu')} aria-label="Open menu"><Icon name="grid" size={20} /></button><Logo /><button className="icon-button bag-top" onClick={() => navigate('cart')} aria-label="Open cart"><Icon name="bag" size={20} />{cartCount > 0 && <i>{cartCount}</i>}</button></div>
          <label className="search-box"><Icon name="search" size={17} /><input placeholder="Looking for shoes" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">{query && <Icon name="close" size={15} />}</button></label>
          <div className="brand-filter" aria-label="Filter by brand">{['Nike', 'Puma', 'Under Armour', 'Adidas', 'All'].map((item, index) => <button key={item} className={brand === item ? 'selected' : ''} onClick={() => setBrand(item)}><span className={`brand-mark brand-${index}`}>{item === 'Under Armour' ? 'UA' : item === 'All' ? '✦' : item.slice(0, 1)}</span><span>{item === 'Under Armour' ? 'UA' : item}</span></button>)}</div>
          <div className="section-heading"><h2>Popular Shoes</h2><button onClick={() => { setBrand('All'); setQuery(''); }}>See all</button></div>
          {filteredProducts.length > 0 ? <div className="product-grid">{filteredProducts.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} onOpen={openProduct} onToggleFavorite={toggleFavorite} onAdd={addToCart} favorite={favorites.includes(item.id)} />)}</div> : <div className="no-results"><p>No {brand === 'All' ? '' : `${brand} `}shoes match this search yet.</p><button className="text-link" onClick={() => { setBrand('All'); setQuery(''); }}>Browse all shoes</button></div>}
          <div className="section-heading arrivals-heading"><h2>New Arrivals</h2><button onClick={() => { setBrand('All'); setQuery(''); }}>See all</button></div>
          <button className="featured-product" onClick={() => openProduct(products[4])}><span className="product-label">BEST CHOICE</span><strong>Nike Air Jordan</strong><span className="featured-price">{money(849.69)}</span><img src="/assets/nike-club-white-blue.png" alt="Nike Air Jordan white and blue" /></button>
        </section>}

        {screen === 'details' && <section className="details-screen">
          <Header title="Men's Shoes" onBack={() => navigate('home')} right={<button className="icon-button" onClick={() => navigate('cart')} aria-label="Open cart"><Icon name="bag" size={19} /></button>} />
          <div className="detail-hero"><button className={`detail-favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label="Toggle favourite"><Icon name="heart" size={18} /></button><img src={product.image} alt={product.name} /><span className="orbit" /><button className="hero-adjust" aria-label="Adjust image"><Icon name="dots" size={18} /></button></div>
          <article className="detail-sheet"><div className="product-label">{product.label}</div><h1>{product.name}</h1><strong className="detail-price">{money(product.price)}</strong><p className="product-description">{product.description}</p><div className="gallery-heading"><h2>Gallery</h2><button onClick={() => setProduct(products[(products.indexOf(product) + 1) % products.length])}>See all</button></div><div className="gallery-row">{products.slice(0, 4).map((item) => <button key={item.id} className="gallery-thumb" onClick={() => setProduct(item)}><img src={item.image} alt={item.name} /></button>)}</div>
            <div className="size-heading"><h2>Size</h2><div><button>EU</button><button>US</button><button>UK</button></div></div><div className="sizes">{['38', '39', '40', '41', '42', '43'].map((size) => <button key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}>{size}</button>)}</div>
          </article><div className="detail-buybar"><div><span>Price</span><strong>{money(product.price)}</strong></div><button className="primary-button" onClick={() => { addToCart(product); navigate('cart'); }}>Add To Cart</button></div>
        </section>}

        {screen === 'favorites' && <section className="favorites-screen"><Header title="Favourite" onBack={() => navigate('home')} right={<button className="icon-button" aria-label="Sort favourites"><Icon name="heart" size={19} /></button>} /><div className="product-grid favorites-grid">{favorites.map((id) => products.find((item) => item.id === id)).filter(Boolean).map((item) => <ProductCard key={item.id} product={item} onOpen={openProduct} onToggleFavorite={toggleFavorite} onAdd={addToCart} favorite />)}</div>{favorites.length === 0 && <div className="empty-state"><div className="empty-icon"><Icon name="heart" size={27} /></div><h2>No favourites yet</h2><p>Save a pair you love and it will appear here.</p><button className="primary-button" onClick={() => navigate('home')}>Explore shoes</button></div>}</section>}

        {screen === 'cart' && <section className="cart-screen"><Header title="My Cart" onBack={() => navigate('home')} right={<span className="cart-count">{cartCount} items</span>} />
          {cart.length ? <><div className="cart-list">{cart.map((item) => { const entry = products.find((productItem) => productItem.id === item.productId); return <article className="cart-item" key={`${item.productId}-${item.size}`}><button className="cart-image" onClick={() => openProduct(entry)}><img src={entry.image} alt={entry.name} /></button><div className="cart-item-info"><h2>{entry.name}</h2><p>Size: {item.size}</p><strong>{money(entry.price)}</strong><div className="quantity"><button onClick={() => updateQuantity(item.productId, item.size, -1)} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.productId, item.size, 1)} aria-label="Increase quantity"><Icon name="plus" size={14} /></button></div></div><button className="remove-item" onClick={() => removeFromCart(item.productId, item.size)} aria-label="Remove item"><Icon name="trash" size={17} /></button></article>; })}</div>
            <div className="summary-card"><PriceRow label="Subtotal" value={money(subtotal)} /><PriceRow label="Shipping" value={money(shipping)} /><PriceRow label="Total Cost" value={money(total)} total /></div><button className="primary-button full-button checkout-button" onClick={() => navigate('checkout')}>Checkout <Icon name="chevron" size={17} /></button></> : <div className="empty-state"><div className="empty-icon"><Icon name="bag" size={27} /></div><h2>Your cart is empty</h2><p>Find a pair that feels like it was made for you.</p><button className="primary-button" onClick={() => navigate('home')}>Shop now</button></div>}
        </section>}

        {screen === 'checkout' && <section className="checkout-screen"><Header title="Checkout" onBack={() => navigate('cart')} /><div className="checkout-section"><h2>Contact Information</h2><div className="checkout-info"><span className="info-icon"><Icon name="mail" size={17} /></span><div><strong>{profileEmail}</strong><small>Email</small></div><button aria-label="Edit email"><Icon name="edit" size={16} /></button></div><div className="checkout-info"><span className="info-icon"><Icon name="user" size={17} /></span><div><strong>+60-982-765-256</strong><small>Phone</small></div><button aria-label="Edit phone"><Icon name="edit" size={16} /></button></div></div>
          <div className="checkout-section"><h2>Address</h2><div className="checkout-info address-info"><span className="info-icon"><Icon name="pin" size={17} /></span><div><strong>50 Haji Lane, London</strong><small>England</small></div><button aria-label="Edit address"><Icon name="edit" size={16} /></button></div><div className="map-placeholder"><div className="map-street street-one" /><div className="map-street street-two" /><div className="map-street street-three" /><span className="map-pin"><Icon name="pin" size={19} /></span></div></div>
          <div className="checkout-section payment-section"><h2>Payment Method</h2><button className="checkout-info payment-choice" onClick={() => setPayment(payment === 'PayPal Card' ? 'Visa Card' : 'PayPal Card')}><span className="payment-logo">P</span><div><strong>{payment}</strong><small>••••  ••••  ••••  4009</small></div><Icon name="chevron" size={17} /></button></div>
          <div className="summary-card checkout-summary"><PriceRow label="Subtotal" value={money(subtotal)} /><PriceRow label="Shipping" value={money(shipping)} /><PriceRow label="Total Cost" value={money(total)} total /></div><button className="primary-button full-button checkout-button" onClick={() => navigate('paid')}>Payment <Icon name="chevron" size={17} /></button>
        </section>}

        {screen === 'paid' && <section className="paid-screen"><Header title="Checkout" onBack={() => navigate('home')} /><div className="confetti">🎉</div><h1>Your Payment Is<br />Successful</h1><p>Thank you for shopping with ShoeZone. Your order is on its way.</p><div className="paid-total"><span>Total paid</span><strong>{money(total)}</strong></div><button className="primary-button full-button" onClick={() => navigate('home')}>Back To Shopping</button><button className="text-link order-link" onClick={() => navigate('orders')}>View order details</button></section>}

        {screen === 'notifications' && <section className="notifications-screen"><Header title="Notifications" onBack={() => navigate('home')} right={<button className="text-link clear-all" onClick={(event) => event.currentTarget.closest('section').querySelectorAll('.notification-unread').forEach((item) => item.classList.remove('notification-unread'))}>Clear All</button>} />
          <h2 className="day-label">Today</h2>{[[products[0], 'We Have New Products With Offers', '6 min ago'], [products[1], 'We Have New Products With Offers', '26 min ago'], [products[6], 'A fresh pair just arrived', '4 days ago']].map(([item, text, time], index) => <article className={`notification-item ${index < 2 ? 'notification-unread' : ''}`} key={index}><div className="notification-image"><img src={item.image} alt="" /></div><div><p>{text}</p><strong>{money(item.price)}</strong><small>{time}</small></div><span className="notification-dot" /></article>)}<h2 className="day-label yesterday">Yesterday</h2><article className="notification-item"><div className="notification-image"><img src="/assets/puma-air.png" alt="" /></div><div><p>Your order has been delivered</p><strong>Puma Air</strong><small>Yesterday</small></div></article>
        </section>}

        {screen === 'menu' && <section className="side-menu"><button className="icon-button menu-close" onClick={() => navigate('home')} aria-label="Close menu"><Icon name="close" size={21} /></button><div className="menu-profile"><Avatar /><div><p>Hey, 👋</p><h1>Allison Becker</h1></div></div><nav className="drawer-links">{[['Profile', 'user', 'profile'], ['Home Page', 'home', 'home'], ['My Cart', 'bag', 'cart'], ['Favourite', 'heart', 'favorites'], ['Orders', 'clock', 'orders'], ['Notifications', 'bell', 'notifications']].map(([label, icon, route]) => <button key={route} onClick={() => navigate(route)}><Icon name={icon} size={18} /><span>{label}</span>{route === 'cart' && <small>{cartCount}</small>}</button>)}</nav><button className="signout-link" onClick={() => navigate('login')}><Icon name="chevron" size={17} />Sign Out</button></section>}

        {screen === 'profile' && <section className="profile-screen"><Header title="Profile" onBack={() => navigate('home')} right={<button className="icon-button" aria-label="Edit profile"><Icon name="edit" size={18} /></button>} /><div className="profile-avatar"><Avatar /></div><h2 className="profile-name">{profileName}</h2><form className="profile-form"><label className="field"><span>Full Name</span><input value={profileName} onChange={(event) => setProfileName(event.target.value)} /></label><label className="field"><span>Email Address</span><input type="email" value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} /></label><label className="field"><span>Password</span><input type="password" value="shoepassword" readOnly /></label></form><button className="profile-orders" onClick={() => navigate('orders')}><span>My Orders</span><Icon name="chevron" size={18} /></button></section>}

        {screen === 'orders' && <section className="orders-screen"><Header title="Orders" onBack={() => navigate('profile')} right={<button className="icon-button" aria-label="Filter orders"><Icon name="dots" size={20} /></button>} /><h2 className="day-label">Today</h2>{[[products[1], 'Successful', '6 min ago'], [products[2], 'Successful', '26 min ago']].map(([item, status, time]) => <article className="order-item" key={item.id}><div className="order-image"><img src={item.image} alt={item.name} /></div><div className="order-details"><p>{item.name}</p><strong>{money(item.price)}</strong><small>{time}</small></div><span className="order-status">{status}</span></article>)}<h2 className="day-label previous-month">Previous Month</h2><article className="order-item"><div className="order-image"><img src="/assets/puma-air.png" alt="Puma Air" /></div><div className="order-details"><p>Puma Air</p><strong>{money(products[6].price)}</strong><small>14 days ago</small></div><span className="order-status cancelled">Cancelled</span></article></section>}

      </div>
      {showNav && <BottomNav active={screen} cartCount={cartCount} onNavigate={nav} />}
    </div>
    <div className="scene-caption"><span className="caption-dot" /> ShoeZone mobile storefront <span>React preview</span></div>
  </main>;
}
