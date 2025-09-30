document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.order-btn1');
    const salad = document.querySelector('.order-btn2');
    const foodCard = document.querySelectorAll('.food-card');
    const orderPage = document.getElementById('Order');
    const menuCards = document.querySelector('.menu-cards');
    const howMuch = document.getElementById('how-much');
    const yourOrder = document.getElementById('your-order');
    burger.addEventListener('click',()=>{
        document.getElementById('Order').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        howMuch.value = 1;
        yourOrder.value = "Burger";
    })
    salad.addEventListener('click',()=>{
        orderPage.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        howMuch.value = 1;
        yourOrder.value = "Salad";
    })
    
    menuCards.addEventListener('click', (e) => {
        const card = e.target.closest('.food-card');
        const index = Number(card.dataset.index);
        if(e.target.tagName == "BUTTON"){
            orderPage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
        const foodName = card.querySelector('.card-text h1').textContent.trim();
        howMuch.value = 1;
        yourOrder.value = foodName;
    
    });
   


    
  const section = document.querySelector('#Order');
  const inputs = section.querySelectorAll('input.order');
  const btn = section.querySelector('.order-btn-order-section');

  // Create status message
  const status = document.createElement('div');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  Object.assign(status.style, {
    display: 'none', marginTop: '12px', padding: '10px 12px',
    borderRadius: '8px', background: '#e6ffed', color: '#03543f', fontWeight: '600'
  });
  const ok = document.createElement('button');
  ok.type = 'button';
  ok.textContent = 'OK';
  Object.assign(ok.style, { marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' });
  status.appendChild(ok);
  section.appendChild(status);

  let timer;

  // Select all direct children except the status message
  const resContent = Array.from(section.children).filter(child => child !== status);

  function show(msg, ms = 3000, center = false) {
    // Remove any previous image
    const oldImg = status.querySelector('img');
    if (oldImg) oldImg.remove();

    // Remove all text nodes except OK button
    Array.from(status.childNodes).forEach(node => {
      if (node !== ok && node.nodeName !== 'IMG') status.removeChild(node);
    });

    if (center) {
      resContent.forEach(el => el.style.display = 'none');
      Object.assign(status.style, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        width: '99%',
        minHeight: '80vh',
        fontSize: '2rem',
        background: '#e6ffed',
        position: 'relative'
      });
      status.classList.add('order-placed-animate');

      // Add image for order placed
      const img = document.createElement('img');
      img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Cd88qRLutTK9fbXIEND38Dk5gr5KmUDgcQ&s';
      img.alt = 'Order Placed!';
      img.style.width = '120px';
      img.style.marginBottom = '24px';
      status.insertBefore(img, ok);
    } else {
      resContent.forEach(el => el.style.display = '');
      Object.assign(status.style, {
        display: 'block',
        width: '80%',
        minHeight: '5%',
        fontSize: '2rem',
        background: '#e6ffed',
        position: 'absolute',
      });
      status.classList.remove('order-placed-animate');
    }

    // Add the message text before OK button
    status.insertBefore(document.createTextNode(msg), ok);

    clearTimeout(timer);
    timer = setTimeout(hideMsg, ms);
  }

  function hideMsg() {
    status.style.display = 'none';
    resContent.forEach(el => el.style.display = '');
    status.classList.remove('order-placed-animate'); // Remove animation class
  }

  ok.addEventListener('click', () => { clearTimeout(timer); hideMsg(); });

  function isEmpty(el) { return !el.value || el.value.trim() === ''; }
  function mark(el, bad) {
    el.style.border = bad ? '2px solid #ef4444' : '1px solid #d1d5db';
    el.style.background = bad ? '#fee2e2' : '#fff';
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    let firstBad = null;
    let valid = true;

    inputs.forEach(inp => {
      const bad = isEmpty(inp);
      mark(inp, bad);
      if (bad && !firstBad) firstBad = inp;
      valid = valid && !bad;
    });

    if (!valid) {
      show('Please fill all fields.', 4000, false); // Don't hide content, show inline
      firstBad?.focus();
      return;
    }

    show('✅ Order is placed!', 3000, true); // Hide content, show centered message
    // Optionally clear values:
    // inputs.forEach(i => i.value = '');
  });
  
});





