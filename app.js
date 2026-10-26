/**
 * AX QR Studio — app.js
 * Full implementation: i18n, QR generation, download, share, scanner, gallery, history, settings
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Init Lucide icons ──────────────────────────────────────────────────────
  if (window.lucide) lucide.createIcons();

  // ── Brand logo SVGs for QR center overlays ────────────────────────────────
  const BRAND_LOGOS = {
    telegram: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%2324A1DE"/><path fill="%23FFF" d="M12 23.5l24-9.5-6.5 24-5.5-6.5-4 4v-5z"/></svg>',
    youtube:  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="%23FF0000"/><path fill="%23FFF" d="M19 14.5v19l14-9.5z"/></svg>',
    x:        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%23000"/><path fill="%23FFF" d="M14 13h5.2l6.2 8.3 6.6-8.3H34l-8.7 10.9L35 35h-5.2l-7-9.4-7.4 9.4H13l9.4-11.8L14 13z"/></svg>',
    discord:  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%235865F2"/><path fill="%23FFF" d="M33.5 16.5a19 19 0 0 0-4.8-1.5l-.6 1.2c-1.8-.3-3.6-.3-5.4 0l-.6-1.2a19 19 0 0 0-4.8 1.5C14.5 21 13.7 25.3 14.1 29.6c2 1.5 4 2.4 5.9 3 .5-.6.9-1.3 1.3-2-1.4-.5-2.1-1.3-2.1-1.3s.1.1.4.3c3.7 1.7 7.7 1.7 11.4 0 .3-.2.4-.3.4-.3s-.7.8-2.2 1.3c.4.7.8 1.4 1.3 2 1.9-.6 3.9-1.5 5.9-3 .5-5-.5-9.3-3.3-13.1zm-13 10.3c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm8.9 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z"/></svg>'
  };

  // ── i18n Translations ─────────────────────────────────────────────────────
  const T = {
    en: {
      create_qr_code:'Create QR Code', paste:'Paste', single_link:'Single Link', multi_link:'Multi Link',
      live_preview:'Live QR Preview', ready_to_scan:'READY TO SCAN', scan_to_open:'Scan to open link',
      download_png_hd:'Download PNG (HD)', download_svg:'Download SVG', share_qr:'Share QR',
      tile_scan_title:'Scan QR', tile_scan_sub:'Scan & Open', tile_multi_title:'Multi Link QR',
      tile_multi_sub:'Multiple Links', tile_custom_title:'Customize Style', tile_custom_sub:'Colors, Frame',
      create_new_qr:'Create New QR Code', generate_and_preview:'Generate & Preview',
      multilink_title:'Multi-Link QR Hub', scanner_title:'Real-time QR Scanner',
      scan_gallery:'Scan from Gallery', restart_camera:'Restart Camera', open:'Open', copy:'Copy', share:'Share',
      saved_qr_codes:'Saved QR Codes', clear_all:'Clear All', settings_title:'Settings',
      settings_subtitle:'Customize your experience', appearance_title:'Appearance',
      appearance_subtitle:'Make the app look the way you like', theme_light:'Light Mode',
      theme_dark:'Dark Mode', theme_system:'System Default', qr_pref_title:'QR Preferences',
      qr_pref_subtitle:'Default settings for QR generation', default_quality:'Default Download Quality',
      default_style:'Default QR Style', default_colors:'Default Colors', add_logo_default:'Add Logo by Default',
      save_to_gallery:'Save to Gallery', qr_tools_title:'QR Tools', qr_tools_subtitle:'Additional useful options',
      auto_history:'Auto Save to History', clear_history:'Clear History', scan_beep:'Scan Beep Sound',
      vibration:'Vibration', link_confirm:'Open Links with Confirmation', privacy_title:'Privacy & Security',
      privacy_subtitle:'Manage your data and permissions', notifications_title:'Notifications',
      notifications_subtitle:'Scan alerts & app notifications', language_title:'Language',
      language_subtitle:'Choose your preferred language', social_links_title:'Social Links',
      social_links_subtitle:'Join our communities', help_support_title:'Help & Support',
      help_support_subtitle:'Get help or contact us', about_title:'About AX QR Studio',
      about_subtitle:'App info, version and credits', nav_home:'Home', nav_create:'Create',
      nav_scan:'Scan', nav_history:'History', nav_settings:'Settings', select_language:'Select Language'
    },
    bn: {
      create_qr_code:'QR কোড তৈরি করুন', paste:'পেস্ট', single_link:'একক লিংক', multi_link:'মাল্টি লিংক',
      live_preview:'লাইভ QR প্রিভিউ', ready_to_scan:'স্ক্যানের জন্য প্রস্তুত', scan_to_open:'লিংক খুলতে স্ক্যান করুন',
      download_png_hd:'PNG ডাউনলোড (HD)', download_svg:'SVG ডাউনলোড', share_qr:'QR শেয়ার করুন',
      tile_scan_title:'QR স্ক্যান', tile_scan_sub:'স্ক্যান ও ওপেন', tile_multi_title:'মাল্টি-লিংক QR',
      tile_multi_sub:'একাধিক লিংক', tile_custom_title:'কাস্টমাইজ স্টাইল', tile_custom_sub:'কালার, ফ্রেম',
      create_new_qr:'নতুন QR কোড তৈরি', generate_and_preview:'জেনারেট ও প্রিভিউ',
      multilink_title:'মাল্টি-লিংক হাব', scanner_title:'লাইভ QR স্ক্যানার',
      scan_gallery:'গ্যালারি থেকে স্ক্যান', restart_camera:'ক্যামেরা চালু করুন',
      open:'খুলুন', copy:'কপি', share:'শেয়ার', saved_qr_codes:'সংরক্ষিত QR কোডসমূহ',
      clear_all:'সব মুছুন', settings_title:'সেটিংস', settings_subtitle:'অ্যাপ কাস্টমাইজ করুন',
      appearance_title:'অ্যাপিয়ারেন্স', appearance_subtitle:'পছন্দমতো থিম নির্বাচন করুন',
      theme_light:'লাইট মোড', theme_dark:'ডার্ক মোড', theme_system:'সিস্টেম ডিফল্ট',
      qr_pref_title:'QR পছন্দসমূহ', qr_pref_subtitle:'QR তৈরির ডিফল্ট সেটিংস',
      default_quality:'ডিফল্ট ডাউনলোড কোয়ালিটি', default_style:'ডিফল্ট QR স্টাইল',
      default_colors:'ডিফল্ট কালার', add_logo_default:'ডিফল্টভাবে লোগো যোগ',
      save_to_gallery:'গ্যালারিতে সংরক্ষণ', qr_tools_title:'QR টুলস',
      qr_tools_subtitle:'অতিরিক্ত অপশন', auto_history:'স্বয়ংক্রিয় হিস্টোরি সংরক্ষণ',
      clear_history:'হিস্টোরি মুছুন', scan_beep:'স্ক্যান বিপ সাউন্ড', vibration:'ভাইব্রেশন',
      link_confirm:'কনফার্মেশন সহ লিংক খুলুন', privacy_title:'প্রাইভেসি ও সিকিউরিটি',
      privacy_subtitle:'ডাটা ও পারমিশন নিয়ন্ত্রণ', notifications_title:'নোটিফিকেশন',
      notifications_subtitle:'স্ক্যান এলার্ট ও নোটিফিকেশন', language_title:'ভাষা',
      language_subtitle:'পছন্দের ভাষা নির্বাচন করুন', social_links_title:'সোশ্যাল লিংকস',
      social_links_subtitle:'কমিউনিটিতে যুক্ত হোন', help_support_title:'হেল্প ও সাপোর্ট',
      help_support_subtitle:'সাহায্য নিন বা যোগাযোগ করুন', about_title:'AX QR Studio সম্পর্কে',
      about_subtitle:'অ্যাপ তথ্য, সংস্করণ ও ক্রেডিট', nav_home:'হোম', nav_create:'তৈরি',
      nav_scan:'স্ক্যান', nav_history:'হিস্টোরি', nav_settings:'সেটিংস', select_language:'ভাষা নির্বাচন'
    }
  };

  // ── App State ─────────────────────────────────────────────────────────────
  const state = {
    url: 'https://t.me/ArafSparrow',
    title: 'AX QR Studio',
    dotsType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    qrColor: '#6366f1',
    bgColor: '#ffffff',
    logoUrl: null,
    resolution: 1000,
    errorCorrection: 'Q',
    settings: {
      theme: 'light', defaultQuality: 1000, defaultStyle: 'Modern',
      addLogoDefault: false, saveToGallery: true, autoSaveHistory: true,
      scanBeep: true, scanVibrate: true, linkConfirm: true, language: 'en'
    },
    history: [],
    multiLinks: [
      { id: 1, title: 'Telegram Channel', url: 'https://t.me/ArafSparrow', platform: 'telegram' },
      { id: 2, title: 'Airdrop Community', url: 'https://t.me/incometricks007', platform: 'telegram' },
      { id: 3, title: 'YouTube Channel', url: 'https://youtube.com/@arafsparrow', platform: 'youtube' },
      { id: 4, title: 'X (Twitter)', url: 'https://x.com/Araf_sparrow', platform: 'x' }
    ]
  };

  // Load persisted settings & history
  try {
    const s = localStorage.getItem('ax_qr_settings_v2');
    if (s) Object.assign(state.settings, JSON.parse(s));
    const h = localStorage.getItem('ax_qr_history_v2');
    if (h) state.history = JSON.parse(h);
    state.resolution = state.settings.defaultQuality || 1000;
  } catch (e) {}

  // ── Scanner state ─────────────────────────────────────────────────────────
  let html5QrScanner = null;
  let isTorchOn = false;
  let activeCameraTrack = null;
  let qrCodeInstance = null;
  let pendingOpenUrl = null;
  let lastScannedText = null;  // prevent duplicate beep/vibrate
  let audioCtx = null;         // shared AudioContext (unlocked on user gesture)

  // ── Helpers ───────────────────────────────────────────────────────────────
  function saveSettings() {
    try { localStorage.setItem('ax_qr_settings_v2', JSON.stringify(state.settings)); } catch (e) {}
  }

  function isBn() { return state.settings.language === 'bn'; }

  // Toast
  const toastEl = document.getElementById('toast');
  const toastTxt = document.getElementById('toast-text');
  let toastTimer = null;
  function showToast(msg, duration = 2500) {
    if (!toastEl || !toastTxt) return;
    toastTxt.textContent = msg;
    toastEl.classList.remove('translate-y-16', 'opacity-0');
    toastEl.classList.add('translate-y-0', 'opacity-100');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.add('translate-y-16', 'opacity-0');
      toastEl.classList.remove('translate-y-0', 'opacity-100');
    }, duration);
  }

  // ── Audio — Beep on scan ──────────────────────────────────────────────────
  // Unlock AudioContext on first user touch (required by browsers)
  function unlockAudio() {
    if (audioCtx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    } catch (e) {}
  }
  document.addEventListener('touchstart', unlockAudio, { once: true });
  document.addEventListener('click', unlockAudio, { once: true });

  function playScanBeep() {
    if (!state.settings.scanBeep) return;
    try {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        audioCtx = new AC();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {}
  }

  function triggerVibrate() {
    if (!state.settings.scanVibrate) return;
    try { if (navigator.vibrate) navigator.vibrate([70, 30, 70]); } catch (e) {}
  }

  // ── Clipboard helpers ─────────────────────────────────────────────────────
  async function copyToClipboard(text, msg) {
    if (!text) { showToast(isBn() ? '❌ কপি করার কিছু নেই' : '❌ Nothing to copy'); return; }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(msg || (isBn() ? '✅ কপি হয়েছে!' : '✅ Copied!'));
      } else {
        // Fallback for older Android WebView
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(ok ? (msg || (isBn() ? '✅ কপি হয়েছে!' : '✅ Copied!')) : (isBn() ? '❌ কপি ব্যর্থ' : '❌ Copy failed'));
      }
    } catch (e) {
      showToast(isBn() ? '❌ ক্লিপবোর্ড অ্যাক্সেস নেই' : '❌ Clipboard access denied');
    }
  }

  // ── i18n ──────────────────────────────────────────────────────────────────
  function applyLanguage(lang) {
    state.settings.language = lang;
    saveSettings();
    const dict = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (dict[k]) el.textContent = dict[k];
    });
    const ll = document.getElementById('current-lang-label');
    if (ll) ll.textContent = lang === 'bn' ? 'বাংলা' : 'English';
    document.querySelector('.lang-check-en')?.classList.toggle('hidden', lang !== 'en');
    document.querySelector('.lang-check-bn')?.classList.toggle('hidden', lang !== 'bn');
  }

  // ── Theme ─────────────────────────────────────────────────────────────────
  function applyTheme(theme) {
    state.settings.theme = theme;
    saveSettings();
    let dark = theme === 'dark' ||
               (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    const icon = document.getElementById('theme-icon');
    if (icon) { icon.setAttribute('data-lucide', dark ? 'sun' : 'moon'); if (window.lucide) lucide.createIcons(); }
    ['light','dark','system'].forEach(t => {
      document.getElementById(`theme-card-${t}`)?.classList.toggle('active', t === theme);
    });
  }

  // Init on load
  applyLanguage(state.settings.language || 'en');
  applyTheme(state.settings.theme || 'light');

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const inputUrl = document.getElementById('input-url');
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');

  // ── QR Generation ─────────────────────────────────────────────────────────
  function getCleanUrl(url) {
    let raw = (url !== undefined ? url : state.url || '').trim();
    if (!raw) return 'https://t.me/ArafSparrow';
    if (!/^(https?:\/\/|mailto:|tel:|WIFI:|BEGIN:VCARD|data:)/i.test(raw)) return 'https://' + raw;
    return raw;
  }

  function renderQR() {
    const data = getCleanUrl();
    const cfg = {
      width: 270, height: 270, type: 'canvas',
      data, margin: 8,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 5, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: { type: state.cornerSquareType, color: state.qrColor },
      cornersDotOptions: { type: state.cornerDotType, color: state.qrColor },
      backgroundOptions: { color: state.bgColor }
    };
    if (!qrCodeInstance) {
      if (qrCanvasWrapper) {
        qrCanvasWrapper.innerHTML = '';
        qrCodeInstance = new QRCodeStyling(cfg);
        qrCodeInstance.append(qrCanvasWrapper);
      }
    } else {
      qrCodeInstance.update(cfg);
    }
  }
  renderQR();

  // ── Screen Navigation ─────────────────────────────────────────────────────
  function switchScreen(id) {
    navTabs.forEach(tab => {
      const active = tab.getAttribute('data-screen') === id;
      tab.classList.toggle('active-tab', active);
      tab.classList.toggle('text-indigo-600', active);
      tab.classList.toggle('text-slate-500', !active);
      const ind = tab.querySelector('.nav-indicator');
      if (ind) {
        ind.classList.toggle('bg-indigo-50', active);
        ind.classList.toggle('dark:bg-indigo-950/50', active);
      }
    });
    screenViews.forEach(s => s.classList.toggle('hidden', s.id !== id));

    if (id !== 'screen-scan' && html5QrScanner) {
      stopCameraScanner();
    } else if (id === 'screen-scan') {
      startCameraScanner();
    }
    if (id === 'screen-history') renderHistoryItems();
    if (id === 'screen-multilink') renderMultiLinkEditor();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => tab.addEventListener('click', () => switchScreen(tab.getAttribute('data-screen'))));

  // Quick tiles
  document.getElementById('tile-scan')?.addEventListener('click', () => switchScreen('screen-scan'));
  document.getElementById('tile-multilink')?.addEventListener('click', () => switchScreen('screen-multilink'));
  document.getElementById('tile-customize')?.addEventListener('click', () => openModal('modal-customize'));

  // Single/Multi tabs
  document.getElementById('btn-tab-single')?.addEventListener('click', () => {
    document.getElementById('btn-tab-single')?.classList.add('active');
    document.getElementById('btn-tab-multi')?.classList.remove('active');
  });
  document.getElementById('btn-tab-multi')?.addEventListener('click', () => switchScreen('screen-multilink'));

  // ── URL Input ─────────────────────────────────────────────────────────────
  inputUrl?.addEventListener('input', e => { state.url = e.target.value; renderQR(); });
  document.getElementById('btn-clear-input')?.addEventListener('click', () => {
    if (inputUrl) inputUrl.value = '';
    state.url = '';
    renderQR();
  });

  // Paste button
  document.getElementById('btn-paste')?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (inputUrl) inputUrl.value = text;
          state.url = text;
          renderQR();
          showToast(isBn() ? '✅ পেস্ট হয়েছে!' : '✅ Pasted!');
        } else {
          showToast(isBn() ? 'ক্লিপবোর্ড খালি' : 'Clipboard is empty');
        }
      } else {
        showToast(isBn() ? 'ইনপুটে লং-প্রেস করে পেস্ট করুন' : 'Long-press the input field to paste');
      }
    } catch {
      showToast(isBn() ? 'ইনপুটে লং-প্রেস করে পেস্ট করুন' : 'Tap & hold input to paste');
    }
  });

  // Platform chips
  document.querySelectorAll('.platform-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const url = chip.getAttribute('data-url');
      if (inputUrl) inputUrl.value = url;
      state.url = url;
      renderQR();
      showToast(`Selected ${chip.getAttribute('data-name')}`);
    });
  });

  // Theme toggle (header button)
  document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
    const next = state.settings.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode');
  });

  // ── Download helpers ──────────────────────────────────────────────────────
  function getCanvas() {
    return qrCanvasWrapper?.querySelector('canvas') || null;
  }

  function buildExportCfg(type) {
    return {
      width: state.resolution, height: state.resolution, type,
      data: getCleanUrl(), margin: 14,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: { type: state.cornerSquareType, color: state.qrColor },
      cornersDotOptions: { type: state.cornerDotType, color: state.qrColor },
      backgroundOptions: { color: state.bgColor }
    };
  }

  function triggerDownload(blob, filename) {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 3000);
      return true;
    } catch { return false; }
  }

  function dateStr() {
    return new Date().toISOString().slice(0,10).replace(/-/g,'');
  }

  // ── Download PNG ──────────────────────────────────────────────────────────
  document.getElementById('btn-download-png')?.addEventListener('click', async () => {
    unlockAudio();
    showToast(isBn() ? '⏳ PNG তৈরি হচ্ছে...' : '⏳ Generating PNG...');
    const fname = `AX_QR_${dateStr()}.png`;
    try {
      const inst = new QRCodeStyling(buildExportCfg('canvas'));
      // Try getRawData first (newer lib version)
      if (typeof inst.getRawData === 'function') {
        const blob = await inst.getRawData('png');
        if (!blob || !blob.size) throw new Error('Empty PNG blob');
        if (triggerDownload(blob, fname)) {
          saveToHistory('PNG');
          showToast(isBn() ? '✅ PNG ডাউনলোড হয়েছে!' : `✅ PNG Downloaded: ${fname}`);
        } else throw new Error('Download trigger failed');
      } else {
        // Fallback: render on offscreen canvas via toBlob
        const canvas = getCanvas();
        if (!canvas) throw new Error('No canvas found');
        canvas.toBlob(blob => {
          if (!blob) { showToast('❌ PNG export failed'); return; }
          if (triggerDownload(blob, fname)) {
            saveToHistory('PNG');
            showToast(isBn() ? '✅ PNG ডাউনলোড হয়েছে!' : `✅ PNG Downloaded: ${fname}`);
          } else {
            // Open in new tab as last resort
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            showToast(isBn() ? '✅ নতুন ট্যাবে PNG খুলেছে' : '✅ PNG opened in new tab — save from there');
          }
        }, 'image/png');
      }
    } catch (err) {
      showToast('❌ ' + (err.message || 'PNG download failed'));
    }
  });

  // ── Download SVG ──────────────────────────────────────────────────────────
  document.getElementById('btn-download-svg')?.addEventListener('click', async () => {
    unlockAudio();
    showToast(isBn() ? '⏳ SVG তৈরি হচ্ছে...' : '⏳ Generating SVG...');
    const fname = `AX_QR_${dateStr()}.svg`;
    try {
      const inst = new QRCodeStyling(buildExportCfg('svg'));
      if (typeof inst.getRawData === 'function') {
        const blob = await inst.getRawData('svg');
        if (!blob || !blob.size) throw new Error('Empty SVG blob');
        if (triggerDownload(blob, fname)) {
          saveToHistory('SVG');
          showToast(isBn() ? '✅ SVG ডাউনলোড হয়েছে!' : `✅ SVG Downloaded: ${fname}`);
        } else throw new Error('Download trigger failed');
      } else {
        // Use library's built-in download as fallback
        await inst.download({ name: `AX_QR_${dateStr()}`, extension: 'svg' });
        saveToHistory('SVG');
        showToast(isBn() ? '✅ SVG ডাউনলোড হয়েছে!' : '✅ SVG Downloaded!');
      }
    } catch (err) {
      showToast('❌ ' + (err.message || 'SVG download failed'));
    }
  });

  // ── Share QR ──────────────────────────────────────────────────────────────
  document.getElementById('btn-share-qr')?.addEventListener('click', async () => {
    unlockAudio();
    const qrData = getCleanUrl();
    const canvas = getCanvas();
    if (canvas) {
      canvas.toBlob(async blob => {
        if (!blob) { fallbackShare(qrData); return; }
        const file = new File([blob], 'ax-qr-code.png', { type: 'image/png' });
        try {
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ title: 'AX QR Studio', text: qrData, files: [file] });
            showToast(isBn() ? '✅ শেয়ার হয়েছে!' : '✅ Shared!');
          } else {
            fallbackShare(qrData);
          }
        } catch (e) {
          if (e.name !== 'AbortError') fallbackShare(qrData);
        }
      }, 'image/png');
    } else {
      fallbackShare(qrData);
    }
  });

  function fallbackShare(url) {
    if (navigator.share) {
      navigator.share({ title: 'AX QR Studio', text: url, url })
        .then(() => showToast(isBn() ? '✅ শেয়ার হয়েছে!' : '✅ Shared!'))
        .catch(e => { if (e.name !== 'AbortError') copyToClipboard(url); });
    } else {
      copyToClipboard(url, isBn() ? '✅ লিংক কপি হয়েছে!' : '✅ Link copied to clipboard!');
    }
  }

  // ── History ───────────────────────────────────────────────────────────────
  function saveToHistory(format) {
    if (!state.settings.autoSaveHistory) return;
    const item = {
      id: Date.now(),
      title: state.title || 'AX QR Code',
      data: getCleanUrl(),
      format,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    state.history.unshift(item);
    if (state.history.length > 30) state.history.pop();
    try { localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history)); } catch (e) {}
  }

  function renderHistoryItems(filter = '') {
    const container = document.getElementById('history-items');
    if (!container) return;
    container.innerHTML = '';
    const fl = filter.toLowerCase();
    const items = state.history.filter(h =>
      h.data.toLowerCase().includes(fl) || h.title.toLowerCase().includes(fl)
    );
    if (!items.length) {
      container.innerHTML = `<div class="text-center py-10 text-slate-400"><i data-lucide="archive-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i><p class="text-xs font-semibold">No saved QR codes found</p></div>`;
      if (window.lucide) lucide.createIcons();
      return;
    }
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-sm space-x-2';
      card.innerHTML = `
        <div class="flex items-center space-x-3 overflow-hidden flex-1">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-extrabold text-xs flex items-center justify-center shrink-0">${item.format}</div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.title}</h4>
            <p class="text-[11px] font-mono text-indigo-600 truncate">${item.data}</p>
            <span class="text-[10px] text-slate-400 font-medium">${item.date} • ${item.time}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 shrink-0">
          <button class="btn-history-load p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl" data-id="${item.id}" title="Reload">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </button>
          <button class="btn-history-del p-2 text-slate-400 hover:text-rose-500 rounded-xl" data-id="${item.id}" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>`;
      container.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    container.querySelectorAll('.btn-history-load').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = state.history.find(h => h.id === parseInt(btn.dataset.id));
        if (item) {
          state.url = item.data; state.title = item.title;
          if (inputUrl) inputUrl.value = item.data;
          renderQR(); switchScreen('screen-home');
          showToast(isBn() ? '✅ লোড হয়েছে!' : '✅ Loaded from history!');
        }
      });
    });
    container.querySelectorAll('.btn-history-del').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this saved QR code?')) {
          state.history = state.history.filter(h => h.id !== parseInt(btn.dataset.id));
          try { localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history)); } catch (e) {}
          renderHistoryItems(document.getElementById('history-search')?.value || '');
          showToast(isBn() ? '🗑️ মুছে গেছে' : '🗑️ Deleted');
        }
      });
    });
  }

  document.getElementById('history-search')?.addEventListener('input', e => renderHistoryItems(e.target.value));

  // Clear history modals
  document.getElementById('row-clear-history')?.addEventListener('click', () => openModal('modal-confirm-clear'));
  document.getElementById('btn-clear-history-top')?.addEventListener('click', () => openModal('modal-confirm-clear'));
  document.getElementById('btn-cancel-clear-hist')?.addEventListener('click', () => closeModal('modal-confirm-clear'));
  document.getElementById('btn-confirm-clear-hist')?.addEventListener('click', () => {
    state.history = [];
    try { localStorage.removeItem('ax_qr_history_v2'); } catch (e) {}
    renderHistoryItems();
    closeModal('modal-confirm-clear');
    showToast(isBn() ? '🗑️ সব হিস্টোরি মুছে গেছে' : '🗑️ All history cleared!');
  });

  // ── Multi-Link Hub ────────────────────────────────────────────────────────
  function renderMultiLinkEditor() {
    const c = document.getElementById('multilink-items');
    if (!c) return;
    c.innerHTML = '';
    state.multiLinks.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between space-x-2';
      card.innerHTML = `
        <div class="flex-1 space-y-1">
          <input type="text" value="${item.title}" placeholder="Label" class="item-title-input w-full p-1.5 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg" data-index="${i}">
          <input type="url" value="${item.url}" placeholder="https://" class="item-url-input w-full p-1.5 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-indigo-600" data-index="${i}">
        </div>
        <button class="btn-remove-link p-1.5 text-slate-400 hover:text-rose-500" data-index="${i}"><i data-lucide="trash-2" class="w-4 h-4"></i></button>`;
      c.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    c.querySelectorAll('.item-title-input').forEach(inp => inp.addEventListener('change', e => {
      state.multiLinks[parseInt(e.target.dataset.index)].title = e.target.value;
    }));
    c.querySelectorAll('.item-url-input').forEach(inp => inp.addEventListener('change', e => {
      state.multiLinks[parseInt(e.target.dataset.index)].url = e.target.value;
    }));
    c.querySelectorAll('.btn-remove-link').forEach(btn => btn.addEventListener('click', () => {
      state.multiLinks.splice(parseInt(btn.dataset.index), 1);
      renderMultiLinkEditor();
    }));
  }

  document.getElementById('btn-add-multilink')?.addEventListener('click', () => {
    state.multiLinks.push({ id: Date.now(), title: 'New Link', url: 'https://', platform: 'link' });
    renderMultiLinkEditor();
  });

  document.getElementById('btn-generate-multilink')?.addEventListener('click', () => {
    const title = document.getElementById('multilink-title')?.value.trim() || 'Social Hub';
    const bio = document.getElementById('multilink-bio')?.value.trim() || '';
    const links = state.multiLinks.map(l => `<a class="btn" href="${l.url}" target="_blank">${l.title} →</a>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{margin:0;font-family:system-ui,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;box-sizing:border-box}.hub{max-width:380px;width:100%;text-align:center}h1{margin:0 0 8px;font-size:1.3rem}p{color:#94a3b8;font-size:.85rem;margin:0 0 22px}.btn{display:block;background:#1e293b;color:#f8fafc;padding:14px;border-radius:14px;text-decoration:none;margin-bottom:10px;font-weight:700;font-size:.9rem;border:1px solid #334155;transition:background .2s}.btn:hover{background:#334155}.badge{font-size:.75rem;color:#818cf8;margin-top:18px;display:block}</style></head><body><div class="hub"><h1>${title}</h1><p>${bio}</p>${links}<span class="badge">Powered by AX QR Studio</span></div></body></html>`;
    state.url = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    state.title = title;
    if (inputUrl) inputUrl.value = 'Multi-Link: ' + title;
    renderQR();
    switchScreen('screen-home');
    showToast(isBn() ? '✅ মাল্টি-লিংক QR তৈরি হয়েছে!' : '✅ Multi-Link QR Generated!');
  });

  // ── Camera Scanner ────────────────────────────────────────────────────────
  const scanResultCard = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanTypeBadge = document.getElementById('scan-type-badge');
  const cameraStatus = document.getElementById('camera-status');

  function setCameraStatus(msg) {
    if (cameraStatus) cameraStatus.textContent = msg;
  }

  function stopCameraScanner() {
    if (html5QrScanner) {
      try { html5QrScanner.stop().catch(() => {}); } catch (e) {}
      html5QrScanner = null;
    }
    activeCameraTrack = null;
    isTorchOn = false;
  }

  function startCameraScanner() {
    // Reset result card
    if (scanResultCard) scanResultCard.classList.add('hidden');
    lastScannedText = null;

    // Stop existing instance first
    stopCameraScanner();

    setCameraStatus(isBn() ? 'ক্যামেরা শুরু হচ্ছে...' : 'Starting camera...');

    try {
      html5QrScanner = new Html5Qrcode('reader');
    } catch (e) {
      setCameraStatus(isBn() ? '❌ ক্যামেরা পাওয়া যায়নি' : '❌ Camera not available');
      return;
    }

    const onSuccess = (decodedText) => {
      if (decodedText === lastScannedText) return; // avoid duplicate
      lastScannedText = decodedText;
      playScanBeep();
      triggerVibrate();
      handleScannedData(decodedText);
      // Pause scanner after success
      try { html5QrScanner.stop().catch(() => {}); } catch (e) {}
      setCameraStatus(isBn() ? '✅ QR কোড স্ক্যান হয়েছে — Restart করুন' : '✅ Scanned! Press Restart to scan again');
    };

    const onError = () => {}; // silent — fires every frame when no QR found

    const config = {
      fps: 12,
      qrbox: (w, h) => ({ width: Math.min(w, h) * 0.7 | 0, height: Math.min(w, h) * 0.7 | 0 }),
      aspectRatio: 1.0
    };

    html5QrScanner.start({ facingMode: 'environment' }, config, onSuccess, onError)
      .then(() => {
        setCameraStatus(isBn() ? '📷 ক্যামেরা সক্রিয় — QR কোডের দিকে ধরুন' : '📷 Camera active — point at a QR code');
        // Grab track for torch
        setTimeout(() => {
          const vid = document.querySelector('#reader video');
          if (vid?.srcObject) {
            activeCameraTrack = vid.srcObject.getVideoTracks?.()?.[0] || null;
          }
        }, 800);
      })
      .catch(err => {
        const msg = err?.message || String(err);
        if (msg.includes('permission') || msg.includes('NotAllowed')) {
          setCameraStatus(isBn() ? '❌ ক্যামেরার অনুমতি নেই — ব্রাউজারে অনুমতি দিন' : '❌ Camera permission denied — allow in browser settings');
        } else {
          setCameraStatus('❌ ' + msg.slice(0, 80));
        }
        showToast('Camera error: ' + msg.slice(0, 60));
      });
  }

  document.getElementById('btn-start-camera')?.addEventListener('click', () => {
    lastScannedText = null;
    startCameraScanner();
  });

  // Torch toggle
  document.getElementById('btn-toggle-torch')?.addEventListener('click', async () => {
    if (!activeCameraTrack) { showToast(isBn() ? 'ফ্ল্যাশলাইট পাওয়া যায়নি' : 'Flashlight not available'); return; }
    try {
      isTorchOn = !isTorchOn;
      await activeCameraTrack.applyConstraints({ advanced: [{ torch: isTorchOn }] });
      showToast(isTorchOn ? '🔦 Flashlight ON' : '🔦 Flashlight OFF');
    } catch {
      showToast(isBn() ? 'ফ্ল্যাশলাইট সাপোর্ট করে না' : 'Flashlight not supported on this device');
    }
  });

  // Gallery scan
  const scanGalleryInput = document.getElementById('scan-gallery-input');
  document.getElementById('btn-scan-gallery')?.addEventListener('click', () => scanGalleryInput?.click());
  scanGalleryInput?.addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    showToast(isBn() ? '⏳ স্ক্যান হচ্ছে...' : '⏳ Scanning image...');
    try {
      // Use a fresh temporary scanner for file scanning (doesn't need #reader)
      const tmpScanner = new Html5Qrcode('reader');
      const decoded = await tmpScanner.scanFile(file, true);
      playScanBeep();
      triggerVibrate();
      handleScannedData(decoded);
    } catch (err) {
      showToast(isBn() ? '❌ ছবিতে কোনো QR কোড পাওয়া যায়নি' : '❌ No QR code found in image');
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  });

  function handleScannedData(text) {
    if (scanResultCard) scanResultCard.classList.remove('hidden');
    if (scanResultText) scanResultText.textContent = text;
    pendingOpenUrl = text;
    if (scanTypeBadge) {
      scanTypeBadge.textContent = /^https?:\/\//i.test(text) ? 'URL'
        : text.startsWith('WIFI:') ? 'Wi-Fi'
        : text.startsWith('BEGIN:VCARD') ? 'Contact'
        : 'Text';
    }
    showToast(isBn() ? '✅ QR কোড শনাক্ত হয়েছে!' : '✅ QR Code Detected!');
  }

  // Scan result actions
  const modalSafety = document.getElementById('modal-safety');
  document.getElementById('btn-scan-open')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (state.settings.linkConfirm && /^https?:\/\//i.test(pendingOpenUrl)) {
      const el = document.getElementById('safety-modal-url');
      if (el) el.textContent = pendingOpenUrl;
      openModal('modal-safety');
    } else {
      window.open(pendingOpenUrl, '_blank', 'noopener');
    }
  });
  document.getElementById('btn-safety-proceed')?.addEventListener('click', () => {
    closeModal('modal-safety');
    if (pendingOpenUrl) window.open(pendingOpenUrl, '_blank', 'noopener');
  });
  document.getElementById('btn-safety-cancel')?.addEventListener('click', () => closeModal('modal-safety'));

  document.getElementById('btn-scan-copy')?.addEventListener('click', () => {
    copyToClipboard(pendingOpenUrl, isBn() ? '✅ ফলাফল কপি হয়েছে!' : '✅ Result copied!');
  });

  document.getElementById('btn-scan-share')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (navigator.share) {
      navigator.share({ title: 'Scanned by AX QR Studio', text: pendingOpenUrl, url: /^https?:\/\//i.test(pendingOpenUrl) ? pendingOpenUrl : undefined })
        .then(() => showToast(isBn() ? '✅ শেয়ার হয়েছে!' : '✅ Shared!'))
        .catch(e => { if (e.name !== 'AbortError') copyToClipboard(pendingOpenUrl); });
    } else {
      copyToClipboard(pendingOpenUrl);
    }
  });

  // ── Settings: Theme Cards ─────────────────────────────────────────────────
  ['light','dark','system'].forEach(t => {
    document.getElementById(`theme-card-${t}`)?.addEventListener('click', () => applyTheme(t));
  });

  // QR Resolution pills
  document.querySelectorAll('.pref-res-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pref-res-pill').forEach(p => {
        p.classList.remove('border-2','border-indigo-600','bg-indigo-50','dark:bg-indigo-950/50','text-indigo-700','dark:text-indigo-300','active');
        p.classList.add('border','border-slate-200','dark:border-slate-700');
      });
      pill.classList.remove('border','border-slate-200','dark:border-slate-700');
      pill.classList.add('border-2','border-indigo-600','bg-indigo-50','text-indigo-700','active');
      state.settings.defaultQuality = parseInt(pill.dataset.res);
      state.resolution = state.settings.defaultQuality;
      saveSettings();
      showToast(`Quality set to ${state.resolution}px`);
    });
  });

  // Toggle switches
  function wireToggle(id, key) {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = !!state.settings[key];
    el.addEventListener('change', e => { state.settings[key] = e.target.checked; saveSettings(); });
  }
  wireToggle('toggle-pref-logo',    'addLogoDefault');
  wireToggle('toggle-pref-gallery', 'saveToGallery');
  wireToggle('toggle-auto-history', 'autoSaveHistory');
  wireToggle('toggle-scan-beep',    'scanBeep');
  wireToggle('toggle-scan-vibrate', 'scanVibrate');
  wireToggle('toggle-link-confirm', 'linkConfirm');

  // Notifications row
  document.getElementById('row-notifications')?.addEventListener('click', () => {
    showToast(isBn() ? 'নোটিফিকেশন সক্রিয়' : 'Notifications are active for scan alerts');
  });

  // Discord Copy
  document.getElementById('btn-social-discord')?.addEventListener('click', () => {
    copyToClipboard('arafsparrow', isBn() ? '✅ Discord ID কপি হয়েছে!' : '✅ Discord username "arafsparrow" copied!');
    setTimeout(() => window.open('https://discord.com/users/arafsparrow', '_blank'), 500);
  });

  // ── Modal helpers ─────────────────────────────────────────────────────────
  function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
  function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

  // Language modal
  document.getElementById('row-language')?.addEventListener('click', () => openModal('modal-language'));
  document.getElementById('btn-close-lang')?.addEventListener('click', () => closeModal('modal-language'));
  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
      closeModal('modal-language');
      showToast(btn.dataset.lang === 'bn' ? '✅ বাংলা ভাষা সক্রিয়' : '✅ Language set to English');
    });
  });

  // Help & Support
  document.getElementById('row-help-support')?.addEventListener('click', () => openModal('modal-help-support'));
  document.getElementById('btn-close-help')?.addEventListener('click', () => closeModal('modal-help-support'));

  // About
  document.getElementById('row-about')?.addEventListener('click', () => openModal('modal-about'));
  document.getElementById('btn-close-about')?.addEventListener('click', () => closeModal('modal-about'));

  // Privacy
  document.getElementById('row-privacy-security')?.addEventListener('click', () => openModal('modal-privacy'));
  document.getElementById('btn-close-privacy-modal')?.addEventListener('click', () => closeModal('modal-privacy'));
  document.getElementById('btn-ok-privacy')?.addEventListener('click', () => closeModal('modal-privacy'));

  // Customize Style
  document.getElementById('row-pref-style')?.addEventListener('click', () => openModal('modal-customize'));
  document.getElementById('row-pref-colors')?.addEventListener('click', () => openModal('modal-customize'));
  document.getElementById('btn-close-customize')?.addEventListener('click', () => closeModal('modal-customize'));
  document.getElementById('tile-customize')?.addEventListener('click', () => openModal('modal-customize'));

  document.querySelectorAll('.custom-dot-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.custom-dot-pill').forEach(p =>
        p.classList.remove('border-2','border-indigo-600','bg-indigo-50','text-indigo-700','active'));
      pill.classList.add('border-2','border-indigo-600','bg-indigo-50','text-indigo-700','active');
      state.dotsType = pill.dataset.dots;
      const lbl = document.getElementById('pref-style-label');
      if (lbl) lbl.textContent = pill.textContent.trim();
    });
  });

  document.getElementById('custom-picker-color')?.addEventListener('input', e => {
    state.qrColor = e.target.value;
    const dot = document.getElementById('color-dot-primary');
    if (dot) dot.style.backgroundColor = state.qrColor;
    const lbl = document.getElementById('custom-label-color');
    if (lbl) lbl.textContent = state.qrColor;
  });

  document.getElementById('custom-picker-bg')?.addEventListener('input', e => {
    state.bgColor = e.target.value;
    const dot = document.getElementById('color-dot-bg');
    if (dot) dot.style.backgroundColor = state.bgColor;
    const lbl = document.getElementById('custom-label-bg');
    if (lbl) lbl.textContent = state.bgColor;
  });

  document.querySelectorAll('.custom-logo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.logoUrl = BRAND_LOGOS[btn.dataset.logo] || null;
      document.querySelectorAll('.custom-logo-btn').forEach(b =>
        b.classList.remove('border-indigo-600','bg-indigo-50'));
      btn.classList.add('border-indigo-600','bg-indigo-50');
      showToast(`Selected ${btn.dataset.logo} logo`);
    });
  });

  document.getElementById('btn-custom-remove-logo')?.addEventListener('click', () => {
    state.logoUrl = null;
    document.querySelectorAll('.custom-logo-btn').forEach(b =>
      b.classList.remove('border-indigo-600','bg-indigo-50'));
    showToast(isBn() ? 'লোগো সরানো হয়েছে' : 'Logo removed');
  });

  document.getElementById('btn-save-customize')?.addEventListener('click', () => {
    renderQR();
    closeModal('modal-customize');
    showToast(isBn() ? '✅ স্টাইল প্রয়োগ হয়েছে!' : '✅ Style applied!');
  });

  // ── Create Screen Type Switcher ───────────────────────────────────────────
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(p => {
        p.classList.remove('active','bg-white','dark:bg-slate-800','text-indigo-600','shadow-sm');
        p.classList.add('text-slate-600','dark:text-slate-400');
      });
      pill.classList.add('active','bg-white','dark:bg-slate-800','text-indigo-600','shadow-sm');
      pill.classList.remove('text-slate-600','dark:text-slate-400');
      const t = pill.dataset.type;
      ['url','text','wifi','vcard'].forEach(type =>
        document.getElementById(`field-${type}`)?.classList.toggle('hidden', type !== t));
    });
  });

  document.getElementById('btn-generate-custom')?.addEventListener('click', () => {
    const t = document.querySelector('.type-pill.active')?.dataset.type || 'url';
    let data = '';
    if (t === 'url') {
      data = document.getElementById('create-input-url')?.value.trim() || '';
      if (!data) { showToast(isBn() ? '❌ URL দিন' : '❌ Please enter a URL'); return; }
    } else if (t === 'text') {
      data = document.getElementById('create-input-text')?.value.trim() || '';
      if (!data) { showToast(isBn() ? '❌ টেক্সট দিন' : '❌ Please enter text'); return; }
    } else if (t === 'wifi') {
      const ssid = document.getElementById('wifi-ssid')?.value.trim() || 'WiFi';
      const pass = document.getElementById('wifi-pass')?.value.trim() || '';
      const enc  = document.getElementById('wifi-type')?.value || 'WPA';
      data = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
    } else if (t === 'vcard') {
      const name  = document.getElementById('vcard-name')?.value.trim() || '';
      const phone = document.getElementById('vcard-phone')?.value.trim() || '';
      const email = document.getElementById('vcard-email')?.value.trim() || '';
      data = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
    }
    state.url = data;
    if (inputUrl) inputUrl.value = data;
    renderQR();
    switchScreen('screen-home');
    showToast(isBn() ? '✅ QR তৈরি হয়েছে!' : '✅ Custom QR Generated!');
  });

}); // end DOMContentLoaded
