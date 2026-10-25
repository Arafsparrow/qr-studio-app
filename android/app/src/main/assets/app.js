/**
 * QR Studio — Android Mobile Edition Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons init
  if (window.lucide) {
    lucide.createIcons();
  }

  // Pre-built SVGs for logos
  const LOGOS = {
    youtube: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="%23FF0000"/><path fill="%23FFF" d="M19 14.5v19l14-9.5z"/></svg>',
    whatsapp: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%2325D366"/><path fill="%23FFF" d="M34.6 13.4A15 15 0 0 0 24 9a15 15 0 0 0-13 22.5L9 39l7.7-2A15 15 0 0 0 24 39a15 15 0 0 0 15-15c0-4-1.6-7.8-4.4-10.6zm-10.6 23a12.4 12.4 0 0 1-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5a12.5 12.5 0 1 1 10.5 5.8zm6.9-9.4c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.2 1.5-.5.3-.9.1a11.3 11.3 0 0 1-3.3-2 12.5 12.5 0 0 1-2.3-2.9c-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.4 0-.6s-.9-2.2-1.2-3c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5s-1.5 1.5-1.5 3.6 1.5 4.2 1.7 4.5c.3.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.5.9.8.3 1.7.2 2.3.1.8-.1 2.3-1 2.6-1.9.4-1 .4-1.8.3-2-.1-.2-.4-.3-.8-.5z"/></svg>',
    github: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%23181717"/><path fill="%23FFF" d="M24 10C16.27 10 10 16.27 10 24c0 6.19 4.01 11.43 9.58 13.28 0.7.13 0.96-0.3 0.96-0.67 0-0.33-0.01-1.21-0.02-2.38-3.9 0.85-4.72-1.88-4.72-1.88-0.64-1.62-1.56-2.05-1.56-2.05-1.27-0.87 0.1-0.85 0.1-0.85 1.41 0.1 2.15 1.45 2.15 1.45 1.25 2.14 3.28 1.52 4.08 1.16 0.13-0.9 0.49-1.52 0.89-1.87-3.11-0.35-6.38-1.56-6.38-6.93 0-1.53 0.55-2.78 1.44-3.76-0.14-0.35-0.63-1.78 0.14-3.71 0 0 1.18-0.38 3.86 1.44 1.12-0.31 2.32-0.47 3.52-0.47 1.2 0 2.4 0.16 3.52 0.47 2.68-1.82 3.86-1.44 3.86-1.44 0.77 1.93 0.28 3.36 0.14 3.71 0.9 0.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.57-6.4 6.92 0.5 0.43 0.95 1.29 0.95 2.6 0 1.88-0.02 3.39-0.02 3.85 0 0.38 0.25 0.81 0.97 0.67C33.99 35.43 38 30.19 38 24c0-7.73-6.27-14-14-14z"/></svg>',
    instagram: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><radialGradient id="ig" cx="30%25" cy="105%25" r="105%25"><stop offset="0%25" stop-color="%23fdf497"/><stop offset="10%25" stop-color="%23fdf497"/><stop offset="50%25" stop-color="%23fd5949"/><stop offset="70%25" stop-color="%23d6249f"/><stop offset="100%25" stop-color="%23285AEB"/></radialGradient></defs><rect width="48" height="48" rx="14" fill="url(%23ig)"/><rect x="13" y="13" width="22" height="22" rx="6" fill="none" stroke="%23FFF" stroke-width="2.5"/><circle cx="24" cy="24" r="5" fill="none" stroke="%23FFF" stroke-width="2.5"/><circle cx="30.5" cy="17.5" r="1.5" fill="%23FFF"/></svg>',
    globe: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%232563EB"/><circle cx="24" cy="24" r="14" fill="none" stroke="%23FFF" stroke-width="2.5"/><ellipse cx="24" cy="24" rx="6" ry="14" fill="none" stroke="%23FFF" stroke-width="2.5"/><line x1="10" y1="24" x2="38" y2="24" stroke="%23FFF" stroke-width="2.5"/></svg>'
  };

  // State
  const state = {
    url: 'https://google.com',
    dotsType: 'rounded',
    qrColor: '#0f172a',
    bgColor: '#ffffff',
    logoUrl: null,
    resolution: 1000,
    errorCorrection: 'Q',
    isDarkMode: false,
    history: []
  };

  // Load history from localStorage
  try {
    const saved = localStorage.getItem('qr_android_history');
    if (saved) state.history = JSON.parse(saved);
  } catch (e) {}

  // DOM Elements
  const inputUrl = document.getElementById('input-url');
  const btnPaste = document.getElementById('btn-paste');
  const btnTestUrl = document.getElementById('btn-test-url');
  const previewUrlText = document.getElementById('preview-url-text');
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');
  
  // Theme Toggle & Reset
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const btnReset = document.getElementById('btn-reset');

  // Bottom Navigation
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');

  // Controls
  const presetPills = document.querySelectorAll('.preset-pill');
  const shapePills = document.querySelectorAll('.shape-pill');
  const pickerQrColor = document.getElementById('picker-qr-color');
  const labelQrColor = document.getElementById('label-qr-color');
  const pickerBgColor = document.getElementById('picker-bg-color');
  const labelBgColor = document.getElementById('label-bg-color');

  // Logo
  const logoButtons = document.querySelectorAll('.logo-btn');
  const btnUploadLogo = document.getElementById('btn-upload-logo');
  const inputLogoFile = document.getElementById('input-logo-file');
  const btnRemoveLogo = document.getElementById('btn-remove-logo');

  // History & Settings
  const historyList = document.getElementById('history-list');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const resButtons = document.querySelectorAll('.res-btn');
  const ecPills = document.querySelectorAll('.ec-pill');

  // Downloads
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadSvg = document.getElementById('btn-download-svg');
  const btnCopyImage = document.getElementById('btn-copy-image');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  let qrCodeInstance = null;

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.add('translate-y-16', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2200);
  }

  function getCleanUrl() {
    let raw = state.url.trim();
    if (!raw) return 'https://google.com';
    if (!/^https?:\/\//i.test(raw) && !raw.startsWith('mailto:') && !raw.startsWith('tel:') && !raw.startsWith('WIFI:')) {
      return 'https://' + raw;
    }
    return raw;
  }

  function renderQR() {
    const finalUrl = getCleanUrl();
    previewUrlText.textContent = finalUrl;

    const config = {
      width: 260,
      height: 260,
      type: 'canvas',
      data: finalUrl,
      margin: 8,
      qrOptions: {
        errorCorrectionLevel: state.errorCorrection
      },
      image: state.logoUrl || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.32,
        margin: 4,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        type: state.dotsType,
        color: state.qrColor
      },
      cornersSquareOptions: {
        type: state.dotsType === 'dots' ? 'dot' : (state.dotsType === 'rounded' || state.dotsType === 'extra-rounded' ? 'extra-rounded' : 'square'),
        color: state.qrColor
      },
      cornersDotOptions: {
        type: state.dotsType === 'dots' ? 'dot' : 'square',
        color: state.qrColor
      },
      backgroundOptions: {
        color: state.bgColor
      }
    };

    if (!qrCodeInstance) {
      qrCanvasWrapper.innerHTML = '';
      qrCodeInstance = new QRCodeStyling(config);
      qrCodeInstance.append(qrCanvasWrapper);
    } else {
      qrCodeInstance.update(config);
    }
  }

  // Initial Render
  renderQR();

  // ANDROID BOTTOM NAVIGATION TAB SWITCHING
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetScreenId = tab.getAttribute('data-screen');

      // Update Nav Tabs State
      navTabs.forEach(t => {
        t.classList.remove('active-tab', 'text-indigo-600', 'dark:text-indigo-400');
        t.classList.add('text-slate-500', 'dark:text-slate-400');
        t.querySelector('.nav-indicator').classList.remove('bg-indigo-50', 'dark:bg-indigo-950/50');
      });

      tab.classList.add('active-tab', 'text-indigo-600', 'dark:text-indigo-400');
      tab.classList.remove('text-slate-500', 'dark:text-slate-400');
      tab.querySelector('.nav-indicator').classList.add('bg-indigo-50', 'dark:bg-indigo-950/50');

      // Switch Screen Views
      screenViews.forEach(screen => {
        if (screen.id === targetScreenId) {
          screen.classList.remove('hidden');
        } else {
          screen.classList.add('hidden');
        }
      });

      if (targetScreenId === 'screen-history') {
        renderHistoryScreen();
      }
    });
  });

  // THEME TOGGLE
  btnThemeToggle.addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
      themeIcon.setAttribute('data-lucide', 'sun');
      if (state.qrColor === '#0f172a' && state.bgColor === '#ffffff') {
        state.qrColor = '#ffffff';
        state.bgColor = '#131b2e';
        pickerQrColor.value = '#ffffff';
        pickerBgColor.value = '#131b2e';
        labelQrColor.textContent = '#ffffff';
        labelBgColor.textContent = '#131b2e';
        renderQR();
      }
    } else {
      document.documentElement.classList.remove('dark');
      themeIcon.setAttribute('data-lucide', 'moon');
      if (state.qrColor === '#ffffff' && state.bgColor === '#131b2e') {
        state.qrColor = '#0f172a';
        state.bgColor = '#ffffff';
        pickerQrColor.value = '#0f172a';
        pickerBgColor.value = '#ffffff';
        labelQrColor.textContent = '#0f172a';
        labelBgColor.textContent = '#ffffff';
        renderQR();
      }
    }
    if (window.lucide) lucide.createIcons();
  });

  // URL INPUT & PASTE
  inputUrl.addEventListener('input', (e) => {
    state.url = e.target.value;
    renderQR();
  });

  btnPaste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        inputUrl.value = text;
        state.url = text;
        renderQR();
        showToast('পেস্ট করা হয়েছে');
      }
    } catch {
      showToast('ক্লিপবোর্ড পারমিশন দিন');
    }
  });

  // QUICK CHIPS
  document.querySelectorAll('.quick-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.getAttribute('data-url');
      inputUrl.value = u;
      state.url = u;
      renderQR();
      showToast('লিংক পরিবর্তন হয়েছে');
    });
  });

  btnTestUrl.addEventListener('click', () => {
    window.open(getCleanUrl(), '_blank', 'noopener,noreferrer');
  });

  // PRESETS
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      presetPills.forEach(p => p.classList.remove('border-indigo-600', 'bg-indigo-50/30'));
      pill.classList.add('border-indigo-600', 'bg-indigo-50/30');

      state.qrColor = pill.getAttribute('data-color');
      state.bgColor = pill.getAttribute('data-bg');
      state.dotsType = pill.getAttribute('data-dots');

      pickerQrColor.value = state.qrColor;
      pickerBgColor.value = state.bgColor;
      labelQrColor.textContent = state.qrColor;
      labelBgColor.textContent = state.bgColor;

      shapePills.forEach(s => {
        const isMatch = s.getAttribute('data-dots') === state.dotsType;
        s.classList.toggle('border-2', isMatch);
        s.classList.toggle('border-indigo-600', isMatch);
        s.classList.toggle('bg-indigo-50/50', isMatch);
        s.classList.toggle('text-indigo-700', isMatch);
      });

      renderQR();
      showToast('থিম অ্যাপ্লাই করা হয়েছে');
    });
  });

  // SHAPE PILLS
  shapePills.forEach(pill => {
    pill.addEventListener('click', () => {
      shapePills.forEach(p => {
        p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');
        p.classList.add('border', 'border-slate-200', 'dark:border-slate-700', 'text-slate-700', 'dark:text-slate-300');
      });
      pill.classList.remove('border', 'border-slate-200', 'dark:border-slate-700');
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');

      state.dotsType = pill.getAttribute('data-dots');
      renderQR();
    });
  });

  // COLOR PICKERS
  pickerQrColor.addEventListener('input', (e) => {
    state.qrColor = e.target.value;
    labelQrColor.textContent = state.qrColor;
    renderQR();
  });

  pickerBgColor.addEventListener('input', (e) => {
    state.bgColor = e.target.value;
    labelBgColor.textContent = state.bgColor;
    renderQR();
  });

  // LOGO BUTTONS
  logoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-logo');
      const uri = LOGOS[key];
      if (uri) {
        state.logoUrl = uri;
        logoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50/20'));
        btn.classList.add('border-indigo-600', 'bg-indigo-50/20');
        btnRemoveLogo.classList.remove('hidden');
        renderQR();
        showToast('লোগো যুক্ত করা হয়েছে');
      }
    });
  });

  btnUploadLogo.addEventListener('click', () => inputLogoFile.click());
  inputLogoFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        state.logoUrl = ev.target.result;
        logoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50/20'));
        btnRemoveLogo.classList.remove('hidden');
        renderQR();
        showToast('কাস্টম ছবি যুক্ত হয়েছে');
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveLogo.addEventListener('click', () => {
    state.logoUrl = null;
    logoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50/20'));
    btnRemoveLogo.classList.add('hidden');
    inputLogoFile.value = '';
    renderQR();
    showToast('লোগো মুছে ফেলা হয়েছে');
  });

  // RESOLUTION & ERROR CORRECTION
  resButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      resButtons.forEach(b => {
        b.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');
        b.classList.add('border', 'border-slate-200', 'dark:border-slate-700');
      });
      btn.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');
      state.resolution = parseInt(btn.getAttribute('data-res'), 10);
      showToast(`রেজ্যুলিউশন: ${state.resolution}px`);
    });
  });

  ecPills.forEach(pill => {
    pill.addEventListener('click', () => {
      ecPills.forEach(p => {
        p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');
        p.classList.add('border', 'border-slate-200', 'dark:border-slate-700');
      });
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50/50', 'text-indigo-700', 'dark:bg-indigo-950/30', 'dark:text-indigo-300');
      state.errorCorrection = pill.getAttribute('data-ec');
      renderQR();
      showToast(`এরর কারেকশন: ${state.errorCorrection}`);
    });
  });

  // RESET
  btnReset.addEventListener('click', () => {
    state.url = 'https://google.com';
    inputUrl.value = 'https://google.com';
    state.dotsType = 'rounded';
    state.qrColor = state.isDarkMode ? '#ffffff' : '#0f172a';
    state.bgColor = state.isDarkMode ? '#131b2e' : '#ffffff';
    state.logoUrl = null;
    state.resolution = 1000;
    state.errorCorrection = 'Q';

    pickerQrColor.value = state.qrColor;
    pickerBgColor.value = state.bgColor;
    labelQrColor.textContent = state.qrColor;
    labelBgColor.textContent = state.bgColor;
    btnRemoveLogo.classList.add('hidden');
    logoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50/20'));

    renderQR();
    showToast('সব সেটিং রিসেট হয়েছে');
  });

  // SAVE TO HISTORY
  function saveToHistory(url, format) {
    const item = {
      id: Date.now(),
      url: url,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      format: format.toUpperCase(),
      stateSnapshot: JSON.parse(JSON.stringify(state))
    };
    state.history.unshift(item);
    if (state.history.length > 25) state.history.pop();
    try {
      localStorage.setItem('qr_android_history', JSON.stringify(state.history));
    } catch (e) {}
  }

  function renderHistoryScreen() {
    historyList.innerHTML = '';
    if (state.history.length === 0) {
      historyList.innerHTML = `
        <div class="text-center py-10 bg-white dark:bg-[#131b2e] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 text-slate-400">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto text-slate-400 mb-2"></i>
          <p class="text-xs font-medium">এখনও কোনো QR তৈরি করা হয়নি।</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    state.history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white dark:bg-[#131b2e] p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-2xs';
      card.innerHTML = `
        <div class="flex items-center space-x-2.5 overflow-hidden">
          <span class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
            ${item.format}
          </span>
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[190px] font-mono">${item.url}</p>
            <span class="text-[10px] text-slate-400">${item.time}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 shrink-0">
          <button class="btn-restore p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800" data-id="${item.id}" title="লোড করুন">
            <i data-lucide="rotate-cw" class="w-4 h-4"></i>
          </button>
          <button class="btn-delete p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800" data-id="${item.id}" title="মুছুন">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      historyList.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    // Event listeners
    historyList.querySelectorAll('.btn-restore').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = state.history.find(h => h.id === id);
        if (item && item.stateSnapshot) {
          Object.assign(state, item.stateSnapshot);
          inputUrl.value = state.url;
          pickerQrColor.value = state.qrColor;
          pickerBgColor.value = state.bgColor;
          labelQrColor.textContent = state.qrColor;
          labelBgColor.textContent = state.bgColor;
          renderQR();
          // switch back to home
          navTabs[0].click();
          showToast('হিস্টোরি লোড হয়েছে');
        }
      });
    });

    historyList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        state.history = state.history.filter(h => h.id !== id);
        try {
          localStorage.setItem('qr_android_history', JSON.stringify(state.history));
          renderHistoryScreen();
        } catch (e) {}
      });
    });
  }

  btnClearHistory.addEventListener('click', () => {
    state.history = [];
    try {
      localStorage.removeItem('qr_android_history');
      renderHistoryScreen();
      showToast('সব হিস্টোরি মুছে ফেলা হয়েছে');
    } catch (e) {}
  });

  // DOWNLOAD PNG
  btnDownloadPng.addEventListener('click', async () => {
    showToast('PNG ডাউনলোড হচ্ছে...');
    const exp = {
      width: state.resolution,
      height: state.resolution,
      type: 'canvas',
      data: getCleanUrl(),
      margin: 12,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 6, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: {
        type: state.dotsType === 'dots' ? 'dot' : (state.dotsType === 'rounded' || state.dotsType === 'extra-rounded' ? 'extra-rounded' : 'square'),
        color: state.qrColor
      },
      cornersDotOptions: {
        type: state.dotsType === 'dots' ? 'dot' : 'square',
        color: state.qrColor
      },
      backgroundOptions: { color: state.bgColor }
    };
    const inst = new QRCodeStyling(exp);
    const fname = `qr-android-${Date.now()}`;
    await inst.download({ name: fname, extension: 'png' });
    saveToHistory(getCleanUrl(), 'png');
  });

  // DOWNLOAD SVG
  btnDownloadSvg.addEventListener('click', async () => {
    showToast('SVG ডাউনলোড হচ্ছে...');
    const exp = {
      width: state.resolution,
      height: state.resolution,
      type: 'svg',
      data: getCleanUrl(),
      margin: 12,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 6, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: {
        type: state.dotsType === 'dots' ? 'dot' : (state.dotsType === 'rounded' || state.dotsType === 'extra-rounded' ? 'extra-rounded' : 'square'),
        color: state.qrColor
      },
      cornersDotOptions: {
        type: state.dotsType === 'dots' ? 'dot' : 'square',
        color: state.qrColor
      },
      backgroundOptions: { color: state.bgColor }
    };
    const inst = new QRCodeStyling(exp);
    const fname = `qr-android-${Date.now()}`;
    await inst.download({ name: fname, extension: 'svg' });
    saveToHistory(getCleanUrl(), 'svg');
  });

  // COPY IMAGE
  btnCopyImage.addEventListener('click', async () => {
    try {
      const canvas = qrCanvasWrapper.querySelector('canvas');
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          showToast('ছবি ক্লিপবোর্ডে কপি হয়েছে');
        } catch {
          btnDownloadPng.click();
        }
      });
    } catch {
      showToast('কপি ব্যর্থ হয়েছে');
    }
  });

});
