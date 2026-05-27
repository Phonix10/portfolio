/* =========================================
   UDIT RANJAN PORTFOLIO — JAVASCRIPT
   ========================================= */

'use strict';

// ============================================
// BACKGROUND PARTICLE CANVAS
// ============================================
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    const colors = ['rgba(124,58,237,', 'rgba(59,130,246,', 'rgba(6,182,212,', 'rgba(139,92,246,'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  };

  function init() {
    resize();
    particles = [];
    const count = Math.min(120, Math.floor((W * H) / 12000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / 100) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { init(); });
  init();
  animate();
})();

// ============================================
// FOOTER CANVAS
// ============================================
(function initFooterCanvas() {
  const canvas = document.getElementById('footer-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, frame = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame += 0.005;
    for (let i = 0; i < 5; i++) {
      const x = W * (0.1 + i * 0.2) + Math.sin(frame + i) * 40;
      const y = H * 0.5 + Math.cos(frame * 0.7 + i * 1.5) * 30;
      const r = 80 + i * 30;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(124,58,237,0.15)`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// ============================================
// CUSTOM CURSOR
// ============================================
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.querySelectorAll('a, button, .glass-card, .dock-icon, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'rgba(124,58,237,0.6)';
      trail.style.width = '48px';
      trail.style.height = '48px';
      trail.style.borderColor = 'rgba(124,58,237,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = 'var(--accent-purple)';
      trail.style.width = '30px';
      trail.style.height = '30px';
      trail.style.borderColor = 'rgba(124,58,237,0.5)';
    });
  });
})();

// ============================================
// NAVBAR
// ============================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform = 'translateY(7px) rotate(45deg)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'translateY(-7px) rotate(-45deg)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });

  // Close on link click
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  // Active section detection
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ============================================
// TYPEWRITER EFFECT
// ============================================
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts = [
    'Backend Developer',
    'Spring Boot Engineer',
    'Microservices Architect',
    'Redis Performance Expert',
    'AI Systems Builder',
    'Distributed Systems Engineer',
    'JWT/RBAC Security Developer'
  ];

  let textIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = texts[textIdx];
    el.textContent = current.substring(0, charIdx);

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      textIdx = (textIdx + 1) % texts.length;
      delay = 400;
    }

    charIdx += isDeleting ? -1 : 1;
    setTimeout(type, delay);
  }

  type();
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, entry.target.dataset.revealDelay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el, i) => {
    el.dataset.revealDelay = i * 60;
    observer.observe(el);
  });
})();

// ============================================
// SKILL BARS
// ============================================
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ============================================
// STAT COUNTER ANIMATION
// ============================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          el.textContent = Math.min(Math.ceil(start), target);
          if (start >= target) clearInterval(timer);
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ============================================
// PROJECT FILTERS
// ============================================
(function initProjectFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, idx) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)';
            card.style.opacity = '';
            card.style.transform = '';
          }, idx * 40 + 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(-10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

// ============================================
// COPY TO CLIPBOARD
// ============================================
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('copied');
      showToast('Copied to clipboard!');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Copied!');
    }
  });
});

// ============================================
// CONTACT FORM
// ============================================
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('btn-submit-contact');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        status.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        status.className = 'form-status success';
        form.reset();
        showToast('Message sent!');
      } else {
        throw new Error('Network error');
      }
    } catch {
      status.textContent = 'Something went wrong. Please email me directly at uditranjan11@gmail.com';
      status.className = 'form-status error';
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 6000);
  });
})();

// ============================================
// GITHUB API
// ============================================
(function initGitHub() {
  const username = 'Phonix10';

  async function fetchUserStats() {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) return;
      const data = await res.json();

      const el = id => document.getElementById(id);
      if (el('gh-repos'))     el('gh-repos').textContent     = data.public_repos || '—';
      if (el('gh-followers')) el('gh-followers').textContent = data.followers || '—';
      if (el('gh-following')) el('gh-following').textContent = data.following || '—';
    } catch (e) {
      console.warn('GitHub API rate limited or unavailable');
    }
  }

  // Featured repos to highlight
  const featuredRepoNames = [
    'stock_price_preductioon', 'AutoReach', 'redis_learning',
    'Library-Management-System', 'RentVideo_video_rent_system',
    'Movie_Ticket_Booking_System', 'student-management-system', 'waf-ai-platform'
  ];

  async function fetchRepos() {
    const grid = document.getElementById('github-repos-grid');
    if (!grid) return;

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=public`);
      if (!res.ok) throw new Error('API Error');
      const allRepos = await res.json();

      // Sort: featured first, then by stars
      const featured = allRepos.filter(r => featuredRepoNames.includes(r.name));
      const others = allRepos.filter(r => !featuredRepoNames.includes(r.name)).sort((a,b) => b.stargazers_count - a.stargazers_count);
      const repos = [...featured, ...others].slice(0, 8);

      let totalStars = 0;
      repos.forEach(r => { totalStars += r.stargazers_count || 0; });

      const starsEl = document.getElementById('gh-stars');
      if (starsEl) starsEl.textContent = totalStars;

      const langColors = {
        Java: '#b07219', JavaScript: '#f1e05a', Python: '#3572A5',
        TypeScript: '#2b7489', 'C++': '#f34b7d', HTML: '#e34c26',
        CSS: '#563d7c', Go: '#00ADD8', Rust: '#dea584',
        Shell: '#89e051', Kotlin: '#F18E33', default: '#8b949e'
      };

      if (repos.length === 0) {
        grid.innerHTML = '<div class="repos-loading"><span>No public repositories found.</span></div>';
        return;
      }

      // Language stats from ALL repos
      const langCount = {};
      allRepos.forEach(r => {
        if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
      });
      renderLanguages(langCount, langColors, allRepos.length);

      grid.innerHTML = repos.map(repo => {
        const isFeatured = featuredRepoNames.includes(repo.name);
        return `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card glass-card${isFeatured ? ' repo-featured' : ''}" style="text-decoration:none">
          ${isFeatured ? '<div class="repo-featured-tag">⭐ Featured</div>' : ''}
          <div class="repo-card-header">
            <div class="repo-name">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              ${escapeHtml(repo.name)}
            </div>
            <div class="repo-stars">⭐ ${repo.stargazers_count}</div>
          </div>
          <p class="repo-desc">${escapeHtml(repo.description || 'No description provided.')}</p>
          <div class="repo-footer">
            ${repo.language ? `
              <div class="repo-lang">
                <div class="lang-dot" style="background:${langColors[repo.language] || langColors.default}"></div>
                ${escapeHtml(repo.language)}
              </div>` : ''}
            <div class="repo-forks">🍴 ${repo.forks_count}</div>
            <div class="repo-forks" style="margin-left:auto;font-size:0.72rem;color:var(--text-muted);">
              ${new Date(repo.updated_at).toLocaleDateString('en-IN', {month:'short', year:'numeric'})}
            </div>
          </div>
        </a>
      `}).join('');

    } catch (e) {
      const grid = document.getElementById('github-repos-grid');
      if (grid) grid.innerHTML = `
        <div class="repos-loading" style="grid-column:1/-1">
          <span>Could not load repositories. <a href="https://github.com/${username}" target="_blank" style="color:var(--accent-violet)">View on GitHub ↗</a></span>
        </div>`;
      console.warn('GitHub repos fetch failed:', e);
    }
  }

  function renderLanguages(langCount, colors, total) {
    const bar = document.getElementById('lang-bar');
    const legend = document.getElementById('lang-legend');
    if (!bar || !legend) return;

    const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    const defaultColor = '#8b949e';

    bar.innerHTML = sorted.map(([lang, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const color = colors[lang] || defaultColor;
      return `<div class="lang-segment" style="width:${pct}%;background:${color}" title="${lang}: ${pct}%"></div>`;
    }).join('');

    legend.innerHTML = sorted.map(([lang, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const color = colors[lang] || defaultColor;
      return `
        <div class="lang-legend-item">
          <div class="lang-legend-dot" style="background:${color}"></div>
          ${escapeHtml(lang)}
          <span class="lang-legend-pct">${pct}%</span>
        </div>`;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  fetchUserStats();
  fetchRepos();
})();

// ============================================
// BACK TO TOP
// ============================================
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      const y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ============================================
// GLASSMORPHISM CARD TILT (Subtle)
// ============================================
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-4px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================================
// HERO IMAGE PARALLAX
// ============================================
(function initParallax() {
  const frame = document.querySelector('.hero-image-frame');
  if (!frame) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    frame.style.transform = `translateY(${scrolled * 0.06}px)`;
  }, { passive: true });
})();

// ============================================
// PERFORMANCE: Pause animations off-screen
// ============================================
document.addEventListener('visibilitychange', () => {
  const marquee = document.querySelector('.marquee-content');
  if (marquee) {
    marquee.style.animationPlayState = document.hidden ? 'paused' : 'running';
  }
});
