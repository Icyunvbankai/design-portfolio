// Mobile nav
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Lightbox for portfolio pieces
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// ---------- Kinetic split-text ----------
function splitLetters(el, autoplay){
  var out = [], i = 0;
  function pushWord(text, cls){
    var w = document.createElement('span');
    w.className = 'word'; // unbreakable: lines may only break BETWEEN words
    Array.prototype.forEach.call(text, function(ch){
      var s = document.createElement('span');
      s.className = 'ch' + (cls ? ' ' + cls : '');
      s.textContent = ch;
      s.style.setProperty('--i', i++);
      w.appendChild(s);
    });
    out.push(w);
  }
  function pushWords(text, cls){
    text.split(/(\s+)/).forEach(function(part){
      if(!part) return;
      if(/^\s+$/.test(part)) out.push(document.createTextNode(' '));
      else pushWord(part, cls);
    });
  }
  Array.prototype.forEach.call(el.childNodes, function(node){
    if(node.nodeType === 3){
      pushWords(node.textContent, '');
    }else if(node.nodeName === 'BR'){
      out.push(document.createElement('br'));
    }else if(node.classList && node.classList.contains('accent')){
      pushWords(node.textContent, 'accent');
    }else{
      out.push(node.cloneNode(true)); // e.g. the hero media chip: keep as-is
    }
  });
  el.textContent = '';
  out.forEach(function(n){ el.appendChild(n); });
  el.classList.add('kinetic');
  if(autoplay) el.classList.add('go');
  return el;
}

// hero headline: animate on load
var heroTitle = document.getElementById('heroTitle');
if(heroTitle) splitLetters(heroTitle, true);

// nav logo: staggered load-in, glitch on hover (CSS)
var logo = document.querySelector('.logo');
if(logo) splitLetters(logo, true);

// footer giant wordmark: per-letter wave (CSS animation)
var footWord = document.getElementById('footWord');
if(footWord){
  var txt = footWord.textContent, i = 0;
  footWord.textContent = '';
  Array.prototype.forEach.call(txt, function(ch){
    var s = document.createElement('span');
    s.className = 'ch';
    s.textContent = (ch === ' ') ? '\u00A0' : ch;
    s.style.setProperty('--i', i++);
    footWord.appendChild(s);
  });
}

// section headlines: split now, animate when scrolled into view
var headIO = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add('go'); headIO.unobserve(e.target); }
  });
}, {threshold:.35});
document.querySelectorAll('.kinetic-h').forEach(function(h){
  splitLetters(h, false);
  headIO.observe(h);
});

// ---------- Hero media chip: cycle artwork ----------
var chipImgs = ['assets/twisted-figure.jpg','assets/venom-tour.jpg','assets/midnight-reaper.jpg','assets/ronin-manga.jpg','assets/old-captain.jpg'];
var chipImg = document.getElementById('hchipImg'), chipIx = 0;
if(chipImg){
  setInterval(function(){
    chipImg.style.opacity = '0';
    setTimeout(function(){
      chipIx = (chipIx + 1) % chipImgs.length;
      chipImg.src = chipImgs[chipIx];
      chipImg.style.opacity = '1';
    }, 190);
  }, 2800);
}

// ---------- Scroll reveals with stagger ----------
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:.12});
['.work-grid','.services-grid','.process-grid','.pricing-grid','.faq-list'].forEach(function(sel){
  var grid = document.querySelector(sel);
  if(grid) Array.prototype.forEach.call(grid.children, function(child, ix){
    child.classList.add('rv');
    child.style.setProperty('--d', (ix * 80) + 'ms');
  });
});
document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
