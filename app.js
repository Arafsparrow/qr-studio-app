/**
 * AX QR Studio — Powered by ArafSparrow
 * Complete Architecture: Native AndroidBridge, i18n, Audio/Vibration, 
 * Camera Scanner, Gallery Decoder, Multi-Link Hub & Generator, History Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Native Android Bridge Detector
  const isAndroid = () => !!(window.AndroidBridge && typeof window.AndroidBridge.isNative === 'function' && window.AndroidBridge.isNative());

  // Pre-built Brand Logo SVGs for QR center overlays
  const BRAND_LOGOS = {
    telegram: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%2324A1DE"/><path fill="%23FFF" d="M12 23.5l24-9.5-6.5 24-5.5-6.5-4 4v-5z"/></svg>',
    youtube: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="%23FF0000"/><path fill="%23FFF" d="M19 14.5v19l14-9.5z"/></svg>',
    x: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%23000"/><path fill="%23FFF" d="M14 13h5.2l6.2 8.3 6.6-8.3H34l-8.7 10.9L35 35h-5.2l-7-9.4-7.4 9.4H13l9.4-11.8L14 13z"/></svg>',
    discord: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%235865F2"/><path fill="%23FFF" d="M33.5 16.5a19 19 0 0 0-4.8-1.5c-.2.4-.4.8-.6 1.2-1.8-.3-3.6-.3-5.4 0-.2-.4-.4-.8-.6-1.2-1.7.4-3.3 1-4.8 1.5-3 4.5-3.8 8.8-3.4 13.1 2 1.5 4 2.4 5.9 3 .5-.6.9-1.3 1.3-2-1.4-.5-2.1-1.3-2.1-1.3s.1.1.4.3c3.7 1.7 7.7 1.7 11.4 0 .3-.2.4-.3.4-.3-.1 0-.8.8-2.2 1.3.4.7.8 1.4 1.3 2 1.9-.6 3.9-1.5 5.9-3 .5-5-.5-9.3-3.3-13.1zm-13 10.3c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm8.9 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z"/></svg>',
    github: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%2324292e"/><path fill="%23FFF" d="M24 10c-7.7 0-14 6.3-14 14 0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.5c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2.1-1.5-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.1 3.3 1.5 4.1 1.2.1-.9.5-1.5.9-1.9-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.9 1.5 1.1-.3 2.3-.5 3.5-.5s2.4.2 3.5.5c2.7-1.9 3.9-1.5 3.9-1.5.8 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.5-3.3 6.6-6.4 7 .5.4 1 1.2 1 2.5v3.7c0 .4.3.8 1 .7C38 35.4 42 30.2 42 24c0-7.7-6.3-14-14-14z"/></svg>',
    applogo: 'logo.png'
  };

  // i18n Translations Dictionary (English & Bengali)
  const TRANSLATIONS = {
    en: {
      create_qr_code: "Create QR Code",
      paste: "Paste",
      single_link: "Single Link",
      multi_link: "Multi Link",
      live_preview: "Live QR Preview",
      ready_to_scan: "READY TO SCAN",
      scan_to_open: "Scan to open link",
      download_png_hd: "Download PNG",
      save_to_gallery_btn: "Save to Gallery",
      download_svg: "Download SVG",
      share_qr: "Share QR",
      tile_scan_title: "Scan QR",
      tile_scan_sub: "Scan & Open",
      tile_multi_title: "Multi Link QR",
      tile_multi_sub: "Multiple Links",
      tile_custom_title: "Customize Style",
      tile_custom_sub: "Colors, Frame",
      create_new_qr: "Create New QR Code",
      generate_and_preview: "Generate & Preview",
      multilink_title: "Multi-Link QR Hub",
      scanner_title: "Real-time QR Scanner",
      scan_gallery: "Scan from Gallery",
      restart_camera: "Restart Camera",
      open: "Open",
      copy: "Copy",
      share: "Share",
      saved_qr_codes: "Saved QR Codes",
      clear_all: "Clear All",
      settings_title: "Settings",
      settings_subtitle: "Customize your experience",
      appearance_title: "Appearance",
      appearance_subtitle: "Make the app look the way you like",
      theme_light: "Light Mode",
      theme_dark: "Dark Mode",
      theme_system: "System Default",
      qr_pref_title: "QR Preferences",
      qr_pref_subtitle: "Default settings for QR generation",
      default_quality: "Default Download Quality",
      default_style: "Default QR Style",
      default_colors: "Default Colors",
      add_logo_default: "Add Logo by Default",
      save_to_gallery: "Save to Gallery",
      qr_tools_title: "QR Tools",
      qr_tools_subtitle: "Additional useful options",
      auto_history: "Auto Save to History",
      clear_history: "Clear History",
      scan_beep: "Scan Beep Sound",
      vibration: "Vibration",
      link_confirm: "Open Links with Confirmation",
      privacy_title: "Privacy & Security",
      privacy_subtitle: "Manage your data and permissions",
      notifications_title: "Notifications",
      notifications_subtitle: "Scan alerts & app notifications",
      language_title: "Language",
      language_subtitle: "Choose your preferred language",
      social_links_title: "Social Links",
      social_links_subtitle: "Join our communities",
      help_support_title: "Help & Support",
      help_support_subtitle: "Get help or contact us",
      about_title: "About AX QR Studio",
      about_subtitle: "App info, version and credits",
      nav_home: "Home",
      nav_create: "Create",
      nav_scan: "Scan",
      nav_history: "History",
      nav_settings: "Settings",
      faq_title: "Frequently Asked Questions",
      select_language: "Select Language"
    },
    bn: {
      create_qr_code: "QR কোড তৈরি করুন",
      paste: "পেস্ট",
      single_link: "একক লিংক",
      multi_link: "মাল্টি লিংক",
      live_preview: "লাইভ QR প্রিভিউ",
      ready_to_scan: "স্ক্যানের জন্য প্রস্তুত",
      scan_to_open: "লিংক খুলতে স্ক্যান করুন",
      download_png_hd: "PNG ডাউনলোড",
      save_to_gallery_btn: "গ্যালারিতে সেভ",
      download_svg: "SVG ডাউনলোড",
      share_qr: "QR শেয়ার করুন",
      tile_scan_title: "QR স্ক্যান",
      tile_scan_sub: "স্ক্যান ও ওপেন",
      tile_multi_title: "মাল্টি-লিংক QR",
      tile_multi_sub: "একাধিক লিংক",
      tile_custom_title: "কাস্টমাইজ স্টাইল",
      tile_custom_sub: "কালার, ফ্রেম",
      create_new_qr: "নতুন QR কোড তৈরি",
      generate_and_preview: "জেনারেট ও প্রিভিউ",
      multilink_title: "মাল্টি-লিংক হাব",
      scanner_title: "লাইভ QR স্ক্যানার",
      scan_gallery: "গ্যালারি থেকে স্ক্যান",
      restart_camera: "ক্যামেরা চালু করুন",
      open: "খুলুন",
      copy: "কপি",
      share: "শেয়ার",
      saved_qr_codes: "সংরক্ষিত QR কোডসমূহ",
      clear_all: "সব মুছুন",
      settings_title: "সেটিংস",
      settings_subtitle: "অ্যাপ অভিজ্ঞতা কাস্টমাইজ করুন",
      appearance_title: "অ্যাপিয়ারেন্স",
      appearance_subtitle: "পছন্দমতো অ্যাপ থিম নির্বাচন করুন",
      theme_light: "লাইট মোড",
      theme_dark: "ডার্ক মোড",
      theme_system: "সিস্টেম ডিফল্ট",
      qr_pref_title: "QR পছন্দসমূহ",
      qr_pref_subtitle: "QR তৈরির ডিফল্ট সেটিংস",
      default_quality: "ডিফল্ট ডাউনলোড কোয়ালিটি",
      default_style: "ডিফল্ট QR স্টাইল",
      default_colors: "ডিফল্ট কালার",
      add_logo_default: "ডিফল্টভাবে লোগো যোগ করুন",
      save_to_gallery: "গ্যালারিতে সংরক্ষণ",
      qr_tools_title: "QR টুলস",
      qr_tools_subtitle: "অতিরিক্ত প্রয়োজনীয় অপশন",
      auto_history: "স্বয়ংক্রিয় হিস্টোরি সংরক্ষণ",
      clear_history: "হিস্টোরি মুছুন",
      scan_beep: "স্ক্যান বিপ সাউন্ড",
      vibration: "ভাইব্রেশন",
      link_confirm: "কনফার্মেশন সহ লিংক খুলুন",
      privacy_title: "প্রাইভেসি ও সিকিউরিটি",
      privacy_subtitle: "আপনার ডাটা ও পারমিশন নিয়ন্ত্রণ",
      notifications_title: "নোটিফিকেশন",
      notifications_subtitle: "স্ক্যান এলার্ট ও নোটিফিকেশন",
      language_title: "ভাষা (Language)",
      language_subtitle: "আপনার পছন্দের ভাষা নির্বাচন করুন",
      social_links_title: "সোশ্যাল লিংকস",
      social_links_subtitle: "আমাদের কমিউনিটিতে যুক্ত হোন",
      help_support_title: "হেল্প ও সাপোর্ট",
      help_support_subtitle: "সাহায্য নিন বা যোগাযোগ করুন",
      about_title: "AX QR Studio সম্পর্কে",
      about_subtitle: "অ্যাপ তথ্য, সংস্করণ ও ক্রেডিট",
      nav_home: "হোম",
      nav_create: "তৈরি",
      nav_scan: "স্ক্যান",
      nav_history: "হিস্টোরি",
      nav_settings: "সেটিংস",
      faq_title: "সাধারণ প্রশ্নোত্তর (FAQ)",
      select_language: "ভাষা নির্বাচন করুন"
    }
  };

  // State Management
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
      theme: 'light',
      defaultQuality: 1000,
      defaultStyle: 'Modern',
      addLogoDefault: false,
      saveToGallery: true,
      autoSaveHistory: true,
      scanBeep: true,
      scanVibrate: true,
      linkConfirm: true,
      language: 'en'
    },
    history: [],
    multiLinks: [
      { id: 1, title: 'Telegram Channel', url: 'https://t.me/ArafSparrow', platform: 'telegram' },
      { id: 2, title: 'Airdrop Community', url: 'https://t.me/incometricks007', platform: 'telegram' },
      { id: 3, title: 'YouTube Channel', url: 'https://youtube.com/@arafsparrow', platform: 'youtube' },
      { id: 4, title: 'X (Twitter)', url: 'https://x.com/Araf_sparrow', platform: 'x' },
      { id: 5, title: 'GitHub Repository', url: 'https://github.com/Arafsparrow/qr-studio-app', platform: 'github' }
    ]
  };

  // Load Saved Settings & History
  try {
    const savedSettings = localStorage.getItem('ax_qr_settings_v2');
    if (savedSettings) Object.assign(state.settings, JSON.parse(savedSettings));

    const savedHistory = localStorage.getItem('ax_qr_history_v2');
    if (savedHistory) state.history = JSON.parse(savedHistory);

    state.resolution = state.settings.defaultQuality || 1000;
    if (state.settings.addLogoDefault) {
      state.logoUrl = 'logo.png';
    }
  } catch (e) {}

  // Scanner Variables
  let html5QrScanner = null;
  let isTorchOn = false;
  let activeCameraTrack = null;
  let qrCodeInstance = null;
  let pendingOpenUrl = null;
  let lastScannedText = null;
  let lastScanTimestamp = 0;

  // Audio Context for Beep Sound
  let audioCtx = null;
  function playScanBeep() {
    if (!state.settings.scanBeep) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.14);
    } catch (e) {}
  }

  // Native & Web Vibration
  function triggerVibrate(ms = 80) {
    if (!state.settings.scanVibrate) return;
    try {
      if (isAndroid() && window.AndroidBridge.vibrate) {
        window.AndroidBridge.vibrate(ms);
      } else if (navigator.vibrate) {
        navigator.vibrate([ms, 30, ms]);
      }
    } catch (e) {}
  }

  function saveSettings() {
    try {
      localStorage.setItem('ax_qr_settings_v2', JSON.stringify(state.settings));
    } catch (e) {}
  }

  // Toast Function
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.add('translate-y-16', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2500);
  }

  // Apply Language Function
  function applyLanguage(lang) {
    state.settings.language = lang;
    saveSettings();

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langLabel = document.getElementById('current-lang-label');
    if (langLabel) langLabel.textContent = lang === 'bn' ? 'বাংলা' : 'English';

    const checkEn = document.querySelector('.lang-check-en');
    const checkBn = document.querySelector('.lang-check-bn');
    if (checkEn) checkEn.classList.toggle('hidden', lang !== 'en');
    if (checkBn) checkBn.classList.toggle('hidden', lang !== 'bn');
  }

  // Apply Theme Function
  function applyTheme(theme) {
    state.settings.theme = theme;
    saveSettings();

    let isDark = false;
    if (theme === 'dark') {
      isDark = true;
    } else if (theme === 'system') {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    document.documentElement.classList.toggle('dark', isDark);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }

    const cardLight = document.getElementById('theme-card-light');
    const cardDark = document.getElementById('theme-card-dark');
    const cardSystem = document.getElementById('theme-card-system');

    if (cardLight) cardLight.classList.toggle('active', theme === 'light');
    if (cardDark) cardDark.classList.toggle('active', theme === 'dark');
    if (cardSystem) cardSystem.classList.toggle('active', theme === 'system');
  }

  // Initialize Language & Theme
  applyLanguage(state.settings.language || 'en');
  applyTheme(state.settings.theme || 'light');

  // DOM Elements
  const inputUrl = document.getElementById('input-url');
  const btnPaste = document.getElementById('btn-paste');
  const btnClearInput = document.getElementById('btn-clear-input');
  const previewUrlText = document.getElementById('preview-url-text');
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');

  // Navigation
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');

  // Quick Home Tiles
  document.getElementById('tile-scan')?.addEventListener('click', () => switchScreen('screen-scan'));
  document.getElementById('tile-multilink')?.addEventListener('click', () => switchScreen('screen-multilink'));
  document.getElementById('tile-customize')?.addEventListener('click', () => {
    document.getElementById('modal-customize')?.classList.remove('hidden');
  });

  // Single vs Multi Tab on Home
  const btnTabSingle = document.getElementById('btn-tab-single');
  const btnTabMulti = document.getElementById('btn-tab-multi');
  if (btnTabSingle) {
    btnTabSingle.addEventListener('click', () => {
      btnTabSingle.classList.add('active');
      btnTabMulti?.classList.remove('active');
    });
  }
  if (btnTabMulti) {
    btnTabMulti.addEventListener('click', () => switchScreen('screen-multilink'));
  }

  function getCleanUrl(url) {
    let raw = (url || state.url || '').trim();
    if (!raw) return 'https://t.me/ArafSparrow';
    if (!/^https?:\/\//i.test(raw) && !raw.startsWith('mailto:') && !raw.startsWith('tel:') && !raw.startsWith('WIFI:') && !raw.startsWith('BEGIN:VCARD') && !raw.startsWith('data:')) {
      return 'https://' + raw;
    }
    return raw;
  }

  // Helper to convert Blob to base64 string
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Helper to trigger browser blob download
  function triggerBlobDownload(blob, filename) {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try { URL.revokeObjectURL(url); } catch (e) {}
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 3000);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getQrCanvas() {
    return qrCanvasWrapper?.querySelector('canvas') || null;
  }

  // Build export config for high-res rendering
  function buildExportConfig(type, res = null) {
    const size = res || state.resolution;
    return {
      width: size,
      height: size,
      type: type,
      data: getCleanUrl(),
      margin: 14,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 8, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: { type: state.cornerSquareType, color: state.qrColor },
      cornersDotOptions: { type: state.cornerDotType, color: state.qrColor },
      backgroundOptions: { color: state.bgColor }
    };
  }

  // QR Engine Rendering (Live Preview)
  function renderQR() {
    const finalData = getCleanUrl();
    if (previewUrlText) previewUrlText.textContent = finalData;

    const config = {
      width: 280,
      height: 280,
      type: 'canvas',
      data: finalData,
      margin: 8,
      qrOptions: {
        errorCorrectionLevel: state.errorCorrection
      },
      image: state.logoUrl || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.32,
        margin: 5,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        type: state.dotsType,
        color: state.qrColor
      },
      cornersSquareOptions: {
        type: state.cornerSquareType,
        color: state.qrColor
      },
      cornersDotOptions: {
        type: state.cornerDotType,
        color: state.qrColor
      },
      backgroundOptions: {
        color: state.bgColor
      }
    };

    if (!qrCodeInstance) {
      if (qrCanvasWrapper) {
        qrCanvasWrapper.innerHTML = '';
        qrCodeInstance = new QRCodeStyling(config);
        qrCodeInstance.append(qrCanvasWrapper);
      }
    } else {
      qrCodeInstance.update(config);
    }
  }

  renderQR();

  // Screen Switcher
  function switchScreen(targetScreenId) {
    navTabs.forEach(tab => {
      const isTarget = tab.getAttribute('data-screen') === targetScreenId;
      tab.classList.toggle('active-tab', isTarget);
      tab.classList.toggle('text-indigo-600', isTarget);
      tab.classList.toggle('text-slate-500', !isTarget);
      const ind = tab.querySelector('.nav-indicator');
      if (ind) {
        ind.classList.toggle('bg-indigo-50', isTarget);
        ind.classList.toggle('dark:bg-indigo-950/50', isTarget);
      }
    });

    screenViews.forEach(screen => {
      screen.classList.toggle('hidden', screen.id !== targetScreenId);
    });

    if (targetScreenId !== 'screen-scan') {
      stopCameraScanner();
    } else if (targetScreenId === 'screen-scan') {
      startCameraScanner();
    }

    if (targetScreenId === 'screen-history') {
      renderHistoryItems();
    } else if (targetScreenId === 'screen-multilink') {
      renderMultiLinkEditor();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchScreen(tab.getAttribute('data-screen')));
  });

  // URL Input Events
  if (inputUrl) {
    inputUrl.addEventListener('input', (e) => {
      state.url = e.target.value;
      renderQR();
    });
  }

  if (btnClearInput) {
    btnClearInput.addEventListener('click', () => {
      if (inputUrl) inputUrl.value = '';
      state.url = '';
      renderQR();
      showToast(state.settings.language === 'bn' ? 'ইনপুট মুছে ফেলা হয়েছে' : 'Input cleared');
    });
  }

  // Clipboard Helpers
  async function copyToClipboard(text, successMsg) {
    const isBn = state.settings.language === 'bn';
    try {
      if (isAndroid() && window.AndroidBridge.copyToClipboard) {
        window.AndroidBridge.copyToClipboard(text);
        showToast(successMsg || (isBn ? '✅ ক্লিপবোর্ডে কপি হয়েছে!' : '✅ Copied to clipboard!'));
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg || (isBn ? '✅ কপি হয়েছে!' : '✅ Copied to clipboard!'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) {
          showToast(successMsg || (isBn ? '✅ কপি হয়েছে!' : '✅ Copied to clipboard!'));
        } else {
          showToast(isBn ? '❌ কপি ব্যর্থ' : '❌ Copy failed');
        }
      }
    } catch (e) {
      showToast(isBn ? '❌ ক্লিপবোর্ড অ্যাক্সেস নেই' : '❌ Clipboard access denied');
    }
  }

  // Paste Action
  if (btnPaste) {
    btnPaste.addEventListener('click', async () => {
      const isBn = state.settings.language === 'bn';
      try {
        let text = '';
        if (isAndroid() && window.AndroidBridge.getClipboardText) {
          text = window.AndroidBridge.getClipboardText();
        } else if (navigator.clipboard && navigator.clipboard.readText) {
          text = await navigator.clipboard.readText();
        }

        if (text && inputUrl) {
          inputUrl.value = text;
          state.url = text;
          renderQR();
          showToast(isBn ? '✅ পেস্ট হয়েছে!' : '✅ Pasted from clipboard!');
        } else if (!text) {
          showToast(isBn ? 'ক্লিপবোর্ড খালি' : 'Clipboard is empty');
        }
      } catch (err) {
        showToast(isBn ? 'ইনপুটে লং-প্রেস করে পেস্ট করুন' : 'Long-press input field to paste');
      }
    });
  }

  // Platform chips
  document.querySelectorAll('.platform-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const url = chip.getAttribute('data-url');
      const name = chip.getAttribute('data-name');
      if (inputUrl) inputUrl.value = url;
      state.url = url;
      renderQR();
      showToast(`Selected ${name}`);
    });
  });

  // Top Theme Toggle Button
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Dark Mode' : 'Light Mode');
    });
  }

  // History Save
  function saveCurrentToHistory(format) {
    if (!state.settings.autoSaveHistory) return;
    const now = new Date();
    const item = {
      id: Date.now(),
      title: state.title || 'AX QR Code',
      data: getCleanUrl(),
      format: format.toUpperCase(),
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stateSnapshot: JSON.parse(JSON.stringify(state))
    };
    state.history.unshift(item);
    if (state.history.length > 30) state.history.pop();
    try {
      localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history));
    } catch (e) {}
  }

  // ==================== 1. DOWNLOAD PNG ====================
  const btnDownloadPng = document.getElementById('btn-download-png');
  if (btnDownloadPng) {
    btnDownloadPng.addEventListener('click', async () => {
      const isBn = state.settings.language === 'bn';
      showToast(isBn ? 'PNG তৈরি হচ্ছে...' : 'Generating PNG...');

      try {
        const inst = new QRCodeStyling(buildExportConfig('canvas'));
        const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.png`;

        let blob = null;
        if (typeof inst.getRawData === 'function') {
          blob = await inst.getRawData('png');
        }

        if (!blob) {
          const canvas = getQrCanvas();
          if (canvas) {
            blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
          }
        }

        if (!blob) throw new Error('Could not generate PNG');

        if (state.settings.saveToGallery && isAndroid()) {
          const base64 = await blobToBase64(blob);
          const res = JSON.parse(window.AndroidBridge.saveImageToGallery(base64, fname) || '{}');
          if (res.success) {
            saveCurrentToHistory('png');
            showToast(isBn ? '✅ গ্যালারিতে সংরক্ষিত হয়েছে!' : '✅ Saved to Gallery!');
            return;
          }
        }

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          window.AndroidBridge.downloadFile(base64, fname, 'image/png');
          saveCurrentToHistory('png');
          showToast(isBn ? '✅ PNG ডাউনলোড সম্পন্ন!' : '✅ PNG Downloaded!');
        } else {
          const ok = triggerBlobDownload(blob, fname);
          if (ok) {
            saveCurrentToHistory('png');
            showToast(isBn ? '✅ PNG ডাউনলোড সম্পন্ন!' : '✅ PNG Downloaded!');
          } else {
            throw new Error('Download trigger failed');
          }
        }
      } catch (err) {
        showToast('❌ PNG error: ' + (err.message || 'failed'));
      }
    });
  }

  // ==================== 2. SAVE TO GALLERY ====================
  const btnSaveGallery = document.getElementById('btn-save-gallery');
  if (btnSaveGallery) {
    btnSaveGallery.addEventListener('click', async () => {
      const isBn = state.settings.language === 'bn';
      showToast(isBn ? 'গ্যালারিতে সংরক্ষণ হচ্ছে...' : 'Saving to Gallery...');

      try {
        const inst = new QRCodeStyling(buildExportConfig('canvas'));
        const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.png`;

        let blob = null;
        if (typeof inst.getRawData === 'function') {
          blob = await inst.getRawData('png');
        }
        if (!blob) {
          const canvas = getQrCanvas();
          if (canvas) blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        }
        if (!blob) throw new Error('Could not render image');

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          const resStr = window.AndroidBridge.saveImageToGallery(base64, fname);
          const res = JSON.parse(resStr || '{}');
          if (res.success) {
            saveCurrentToHistory('png');
            showToast(isBn ? `✅ গ্যালারিতে সংরক্ষিত (${res.path || fname})` : `✅ Saved to Gallery (${res.path || fname})`);
          } else {
            throw new Error(res.error || 'Native save failed');
          }
        } else {
          // Web fallback: download to device
          triggerBlobDownload(blob, fname);
          saveCurrentToHistory('png');
          showToast(isBn ? '✅ ডিভাইসে সেভ হয়েছে!' : '✅ Image saved to device!');
        }
      } catch (err) {
        showToast('❌ Save failed: ' + (err.message || 'unknown error'));
      }
    });
  }

  // ==================== 3. DOWNLOAD SVG ====================
  const btnDownloadSvg = document.getElementById('btn-download-svg');
  if (btnDownloadSvg) {
    btnDownloadSvg.addEventListener('click', async () => {
      const isBn = state.settings.language === 'bn';
      showToast(isBn ? 'SVG তৈরি হচ্ছে...' : 'Generating SVG...');

      try {
        const inst = new QRCodeStyling(buildExportConfig('svg'));
        const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.svg`;

        let blob = null;
        if (typeof inst.getRawData === 'function') {
          blob = await inst.getRawData('svg');
        }

        if (!blob) throw new Error('Could not generate SVG');

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          window.AndroidBridge.downloadFile(base64, fname, 'image/svg+xml');
          saveCurrentToHistory('svg');
          showToast(isBn ? '✅ SVG ডাউনলোড সম্পন্ন!' : '✅ SVG Downloaded!');
        } else {
          const ok = triggerBlobDownload(blob, fname);
          if (ok) {
            saveCurrentToHistory('svg');
            showToast(isBn ? '✅ SVG ডাউনলোড সম্পন্ন!' : '✅ SVG Downloaded!');
          } else {
            throw new Error('Download failed');
          }
        }
      } catch (err) {
        showToast('❌ SVG error: ' + (err.message || 'failed'));
      }
    });
  }

  // ==================== 4. SHARE QR ====================
  const btnShareQr = document.getElementById('btn-share-qr');
  if (btnShareQr) {
    btnShareQr.addEventListener('click', async () => {
      const isBn = state.settings.language === 'bn';
      showToast(isBn ? 'শেয়ার প্যানেল খুলছে...' : 'Opening share sheet...');

      try {
        const canvas = getQrCanvas();
        if (!canvas) throw new Error('No QR canvas');

        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        if (!blob) throw new Error('Blob export failed');

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          const shared = window.AndroidBridge.shareImage(base64, 'AX QR Studio', 'QR Code: ' + getCleanUrl());
          if (shared) {
            showToast(isBn ? '✅ শেয়ার উইন্ডো ওপেন হয়েছে' : '✅ Share opened');
            return;
          }
        }

        // Web Share API
        if (navigator.share) {
          const file = new File([blob], 'ax_qr_code.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'AX QR Studio — QR Code',
              text: `Scanned from AX QR Studio: ${getCleanUrl()}`,
              files: [file]
            });
            showToast(isBn ? '✅ শেয়ার সম্পন্ন!' : '✅ Shared successfully!');
            return;
          }

          // Fallback share URL
          await navigator.share({
            title: 'AX QR Studio',
            text: getCleanUrl(),
            url: getCleanUrl()
          });
          showToast(isBn ? '✅ শেয়ার সম্পন্ন!' : '✅ Shared!');
          return;
        }

        // Final fallback: copy link
        copyToClipboard(getCleanUrl(), isBn ? 'লিংক ক্লিপবোর্ডে কপি হয়েছে!' : 'Link copied to clipboard!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(getCleanUrl(), isBn ? 'লিংক ক্লিপবোর্ডে কপি হয়েছে!' : 'Link copied to clipboard!');
        }
      }
    });
  }

  // ==================== MULTI-LINK HUB ====================
  const multilinkItemsContainer = document.getElementById('multilink-items');
  function renderMultiLinkEditor() {
    if (!multilinkItemsContainer) return;
    multilinkItemsContainer.innerHTML = '';
    state.multiLinks.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between space-x-2';
      card.innerHTML = `
        <div class="flex-1 space-y-1">
          <input type="text" value="${item.title}" class="item-title-input w-full p-1.5 text-xs font-bold bg-white dark:bg-slate-800 border rounded-lg" data-index="${index}">
          <input type="url" value="${item.url}" class="item-url-input w-full p-1.5 text-xs font-mono bg-white dark:bg-slate-800 border rounded-lg text-indigo-600" data-index="${index}">
        </div>
        <div class="flex items-center space-x-1">
          <button class="btn-remove-link p-1.5 text-slate-400 hover:text-rose-500" data-index="${index}" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      multilinkItemsContainer.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    multilinkItemsContainer.querySelectorAll('.item-title-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        state.multiLinks[idx].title = e.target.value;
      });
    });

    multilinkItemsContainer.querySelectorAll('.item-url-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        state.multiLinks[idx].url = e.target.value;
      });
    });

    multilinkItemsContainer.querySelectorAll('.btn-remove-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.multiLinks.splice(idx, 1);
        renderMultiLinkEditor();
      });
    });
  }

  const btnAddMultilink = document.getElementById('btn-add-multilink');
  if (btnAddMultilink) {
    btnAddMultilink.addEventListener('click', () => {
      state.multiLinks.push({
        id: Date.now(),
        title: 'New Social Link',
        url: 'https://',
        platform: 'link'
      });
      renderMultiLinkEditor();
    });
  }

  const btnGenerateMultilink = document.getElementById('btn-generate-multilink');
  if (btnGenerateMultilink) {
    btnGenerateMultilink.addEventListener('click', () => {
      const title = document.getElementById('multilink-title')?.value.trim() || 'ArafSparrow — Social Hub';
      const bio = document.getElementById('multilink-bio')?.value.trim() || 'Follow all my official channels & airdrop updates';

      const landingHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;box-sizing:border-box}.hub{max-width:400px;width:100%;text-align:center}.avatar{width:76px;height:76px;border-radius:24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(99,102,241,0.4);font-size:2rem}h1{font-size:1.35rem;margin:0 0 8px}p{color:#94a3b8;font-size:0.85rem;margin:0 0 24px}.btn{display:block;background:#1e293b;color:#f8fafc;padding:14px;border-radius:16px;text-decoration:none;margin-bottom:12px;font-weight:700;font-size:0.9rem;border:1px solid #334155;transition:all 0.2s}.btn:hover{background:#334155;transform:translateY(-2px)}.badge{font-size:0.75rem;color:#818cf8;margin-top:20px;display:block}</style></head><body><div class="hub"><div class="avatar">⚡</div><h1>${title}</h1><p>${bio}</p>${state.multiLinks.map(l => `<a class="btn" href="${l.url}" target="_blank">${l.title} →</a>`).join('')}<span class="badge">Powered by AX QR Studio & ArafSparrow</span></div></body></html>`;

      const landingDataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(landingHtml);
      state.url = landingDataUrl;
      state.title = title;
      if (inputUrl) inputUrl.value = 'Multi-Link Hub: ' + title;
      renderQR();
      switchScreen('screen-home');
      showToast('Multi-Link QR Generated!');
    });
  }

  // ==================== REAL-TIME CAMERA SCANNER ====================
  const scanResultCard = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanTypeBadge = document.getElementById('scan-type-badge');

  function stopCameraScanner() {
    if (html5QrScanner) {
      try {
        if (html5QrScanner.isScanning) {
          html5QrScanner.stop().catch(() => {}).finally(() => {
            html5QrScanner.clear();
          });
        }
      } catch (e) {}
    }
    activeCameraTrack = null;
    isTorchOn = false;
  }

  function startCameraScanner() {
    if (scanResultCard) scanResultCard.classList.add('hidden');
    stopCameraScanner();

    const readerEl = document.getElementById("reader");
    if (!readerEl) return;
    readerEl.innerHTML = '';

    html5QrScanner = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText) => {
      // Prevent rapid repeated triggers for the exact same QR code
      const now = Date.now();
      if (decodedText === lastScannedText && (now - lastScanTimestamp) < 2500) {
        return;
      }
      lastScannedText = decodedText;
      lastScanTimestamp = now;

      playScanBeep();
      triggerVibrate();
      handleScannedData(decodedText);
      stopCameraScanner();
    };

    const config = {
      fps: 15,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const edge = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.75);
        return { width: edge, height: edge };
      },
      aspectRatio: 1.0,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
      }
    };

    html5QrScanner.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    ).then(() => {
      setTimeout(() => {
        const videoElement = document.querySelector("#reader video");
        if (videoElement && videoElement.srcObject) {
          activeCameraTrack = videoElement.srcObject.getVideoTracks()[0];
        }
      }, 500);
    }).catch(err => {
      showToast('Camera error: ' + (err.message || 'Permission denied'));
    });
  }

  document.getElementById('btn-start-camera')?.addEventListener('click', () => {
    showToast('Restarting camera...');
    startCameraScanner();
  });

  // Torch / Flashlight Toggle
  document.getElementById('btn-toggle-torch')?.addEventListener('click', async () => {
    if (!activeCameraTrack) {
      showToast('Flashlight not available');
      return;
    }
    try {
      isTorchOn = !isTorchOn;
      await activeCameraTrack.applyConstraints({ advanced: [{ torch: isTorchOn }] });
      showToast(isTorchOn ? 'Flashlight ON' : 'Flashlight OFF');
    } catch {
      showToast('Flashlight toggle not supported');
    }
  });

  // Scan from Gallery File Input
  const scanGalleryInput = document.getElementById('scan-gallery-input');
  document.getElementById('btn-scan-gallery')?.addEventListener('click', () => scanGalleryInput?.click());
  if (scanGalleryInput) {
    scanGalleryInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      stopCameraScanner();

      if (!html5QrScanner) html5QrScanner = new Html5Qrcode("reader");

      html5QrScanner.scanFile(file, true)
        .then(decodedText => {
          playScanBeep();
          triggerVibrate();
          handleScannedData(decodedText);
        })
        .catch(() => {
          showToast(state.settings.language === 'bn' ? 'ছবিতে কোনো QR কোড পাওয়া যায়নি' : 'No QR code found in selected image');
        });
    });
  }

  function handleScannedData(text) {
    if (scanResultCard) scanResultCard.classList.remove('hidden');
    if (scanResultText) scanResultText.textContent = text;
    pendingOpenUrl = text;

    if (scanTypeBadge) {
      if (/^https?:\/\//i.test(text)) {
        scanTypeBadge.textContent = 'URL';
      } else if (text.startsWith('WIFI:')) {
        scanTypeBadge.textContent = 'Wi-Fi';
      } else if (text.startsWith('BEGIN:VCARD')) {
        scanTypeBadge.textContent = 'Contact';
      } else {
        scanTypeBadge.textContent = 'Text';
      }
    }

    // Auto save scan to history
    if (state.settings.autoSaveHistory) {
      const now = new Date();
      state.history.unshift({
        id: Date.now(),
        title: 'Scanned QR Code',
        data: text,
        format: 'SCAN',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stateSnapshot: { url: text }
      });
      if (state.history.length > 30) state.history.pop();
      try {
        localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history));
      } catch (e) {}
    }

    showToast(state.settings.language === 'bn' ? '✅ QR কোড শনাক্ত হয়েছে!' : '✅ QR Code Detected!');
  }

  // Open with Safety Confirmation
  const modalSafety = document.getElementById('modal-safety');
  const safetyModalUrl = document.getElementById('safety-modal-url');
  document.getElementById('btn-scan-open')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (state.settings.linkConfirm && /^https?:\/\//i.test(pendingOpenUrl)) {
      if (safetyModalUrl) safetyModalUrl.textContent = pendingOpenUrl;
      modalSafety?.classList.remove('hidden');
    } else {
      window.open(pendingOpenUrl, '_blank');
    }
  });

  document.getElementById('btn-safety-proceed')?.addEventListener('click', () => {
    modalSafety?.classList.add('hidden');
    if (pendingOpenUrl) window.open(pendingOpenUrl, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('btn-safety-cancel')?.addEventListener('click', () => modalSafety?.classList.add('hidden'));

  document.getElementById('btn-scan-copy')?.addEventListener('click', () => {
    if (pendingOpenUrl) {
      copyToClipboard(pendingOpenUrl);
    }
  });

  document.getElementById('btn-scan-share')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (isAndroid() && window.AndroidBridge.shareText) {
      window.AndroidBridge.shareText(pendingOpenUrl, "Scanned QR Code");
    } else if (navigator.share) {
      navigator.share({ title: 'Scanned from AX QR Studio', text: pendingOpenUrl }).catch(() => {});
    } else {
      copyToClipboard(pendingOpenUrl);
    }
  });

  // ==================== HISTORY CRUD ====================
  const historyItemsList = document.getElementById('history-items');
  function renderHistoryItems(filter = '') {
    if (!historyItemsList) return;
    historyItemsList.innerHTML = '';
    const filtered = state.history.filter(h => (h.data || '').toLowerCase().includes(filter.toLowerCase()) || (h.title || '').toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
      historyItemsList.innerHTML = `
        <div class="text-center py-10 text-slate-400">
          <i data-lucide="archive-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
          <p class="text-xs font-semibold">No saved QR codes found</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-xs space-x-2';
      card.innerHTML = `
        <div class="flex items-center space-x-3 overflow-hidden flex-1">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-extrabold text-xs flex items-center justify-center shrink-0">
            ${item.format || 'QR'}
          </div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.title}</h4>
            <p class="text-[11px] font-mono text-indigo-600 truncate">${item.data}</p>
            <span class="text-[10px] text-slate-400 font-medium">${item.date} • ${item.time}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 shrink-0">
          <button class="btn-history-load p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl" data-id="${item.id}" title="Reopen">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </button>
          <button class="btn-history-del p-2 text-slate-400 hover:text-rose-500 rounded-xl" data-id="${item.id}" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      historyItemsList.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    historyItemsList.querySelectorAll('.btn-history-load').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = state.history.find(h => h.id === id);
        if (item) {
          state.url = item.data;
          state.title = item.title;
          if (inputUrl) inputUrl.value = item.data;
          renderQR();
          switchScreen('screen-home');
          showToast('Loaded QR Code from history!');
        }
      });
    });

    historyItemsList.querySelectorAll('.btn-history-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        state.history = state.history.filter(h => h.id !== id);
        try { localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history)); } catch (e) {}
        renderHistoryItems(document.getElementById('history-search')?.value || '');
        showToast('Deleted from history');
      });
    });
  }

  document.getElementById('history-search')?.addEventListener('input', (e) => renderHistoryItems(e.target.value));

  // Clear History Modal
  const modalConfirmClear = document.getElementById('modal-confirm-clear');
  document.getElementById('row-clear-history')?.addEventListener('click', () => {
    modalConfirmClear?.classList.remove('hidden');
  });
  document.getElementById('btn-clear-history-top')?.addEventListener('click', () => {
    modalConfirmClear?.classList.remove('hidden');
  });
  document.getElementById('btn-cancel-clear-hist')?.addEventListener('click', () => {
    modalConfirmClear?.classList.add('hidden');
  });
  document.getElementById('btn-confirm-clear-hist')?.addEventListener('click', () => {
    state.history = [];
    try { localStorage.removeItem('ax_qr_history_v2'); } catch (e) {}
    renderHistoryItems();
    modalConfirmClear?.classList.add('hidden');
    showToast('All history cleared!');
  });

  // ==================== SETTINGS & MODALS ====================
  // Appearance Theme Choice Cards
  document.getElementById('theme-card-light')?.addEventListener('click', () => applyTheme('light'));
  document.getElementById('theme-card-dark')?.addEventListener('click', () => applyTheme('dark'));
  document.getElementById('theme-card-system')?.addEventListener('click', () => applyTheme('system'));

  // QR Preferences Quality Pills
  document.querySelectorAll('.pref-res-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pref-res-pill').forEach(p => p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active'));
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active');
      state.settings.defaultQuality = parseInt(pill.getAttribute('data-res'), 10);
      state.resolution = state.settings.defaultQuality;
      saveSettings();
      showToast(`Default Quality: ${state.resolution}px`);
    });
  });

  // Toggle Switches
  const togglePrefLogo = document.getElementById('toggle-pref-logo');
  if (togglePrefLogo) {
    togglePrefLogo.checked = state.settings.addLogoDefault;
    togglePrefLogo.addEventListener('change', (e) => {
      state.settings.addLogoDefault = e.target.checked;
      state.logoUrl = e.target.checked ? 'logo.png' : null;
      renderQR();
      saveSettings();
    });
  }

  const togglePrefGallery = document.getElementById('toggle-pref-gallery');
  if (togglePrefGallery) {
    togglePrefGallery.checked = state.settings.saveToGallery;
    togglePrefGallery.addEventListener('change', (e) => {
      state.settings.saveToGallery = e.target.checked;
      saveSettings();
    });
  }

  const toggleAutoHistory = document.getElementById('toggle-auto-history');
  if (toggleAutoHistory) {
    toggleAutoHistory.checked = state.settings.autoSaveHistory;
    toggleAutoHistory.addEventListener('change', (e) => {
      state.settings.autoSaveHistory = e.target.checked;
      saveSettings();
    });
  }

  const toggleScanBeep = document.getElementById('toggle-scan-beep');
  if (toggleScanBeep) {
    toggleScanBeep.checked = state.settings.scanBeep;
    toggleScanBeep.addEventListener('change', (e) => {
      state.settings.scanBeep = e.target.checked;
      saveSettings();
    });
  }

  const toggleScanVibrate = document.getElementById('toggle-scan-vibrate');
  if (toggleScanVibrate) {
    toggleScanVibrate.checked = state.settings.scanVibrate;
    toggleScanVibrate.addEventListener('change', (e) => {
      state.settings.scanVibrate = e.target.checked;
      saveSettings();
    });
  }

  const toggleLinkConfirm = document.getElementById('toggle-link-confirm');
  if (toggleLinkConfirm) {
    toggleLinkConfirm.checked = state.settings.linkConfirm;
    toggleLinkConfirm.addEventListener('change', (e) => {
      state.settings.linkConfirm = e.target.checked;
      saveSettings();
    });
  }

  // Row Modals Openers
  const modalLanguage = document.getElementById('modal-language');
  document.getElementById('row-language')?.addEventListener('click', () => modalLanguage?.classList.remove('hidden'));
  document.getElementById('btn-close-lang')?.addEventListener('click', () => modalLanguage?.classList.add('hidden'));

  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      applyLanguage(selected);
      modalLanguage?.classList.add('hidden');
      showToast(selected === 'bn' ? 'বাংলা ভাষা সক্রিয় হয়েছে' : 'Language set to English');
    });
  });

  const modalHelp = document.getElementById('modal-help-support');
  document.getElementById('row-help-support')?.addEventListener('click', () => modalHelp?.classList.remove('hidden'));
  document.getElementById('btn-close-help')?.addEventListener('click', () => modalHelp?.classList.add('hidden'));

  const modalAbout = document.getElementById('modal-about');
  document.getElementById('row-about')?.addEventListener('click', () => modalAbout?.classList.remove('hidden'));
  document.getElementById('btn-close-about')?.addEventListener('click', () => modalAbout?.classList.add('hidden'));

  const modalPrivacy = document.getElementById('modal-privacy');
  document.getElementById('row-privacy-security')?.addEventListener('click', () => modalPrivacy?.classList.remove('hidden'));
  document.getElementById('btn-close-privacy-modal')?.addEventListener('click', () => modalPrivacy?.classList.add('hidden'));
  document.getElementById('btn-ok-privacy')?.addEventListener('click', () => modalPrivacy?.classList.add('hidden'));

  document.getElementById('row-notifications')?.addEventListener('click', () => {
    showToast('Notifications are active for scan alerts');
  });

  // Discord Copy ID
  document.getElementById('btn-social-discord')?.addEventListener('click', () => {
    copyToClipboard('arafsparrow', 'Discord ID "arafsparrow" copied!');
    setTimeout(() => {
      window.open('https://discord.com/users/arafsparrow', '_blank');
    }, 400);
  });

  // Customize Modal Handlers
  const modalCustomize = document.getElementById('modal-customize');
  document.getElementById('row-pref-style')?.addEventListener('click', () => modalCustomize?.classList.remove('hidden'));
  document.getElementById('row-pref-colors')?.addEventListener('click', () => modalCustomize?.classList.remove('hidden'));
  document.getElementById('btn-close-customize')?.addEventListener('click', () => modalCustomize?.classList.add('hidden'));

  document.querySelectorAll('.custom-dot-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.custom-dot-pill').forEach(p => p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active'));
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active');
      state.dotsType = pill.getAttribute('data-dots');
      const prefStyleLabel = document.getElementById('pref-style-label');
      if (prefStyleLabel) prefStyleLabel.textContent = pill.textContent;
    });
  });

  document.getElementById('custom-picker-color')?.addEventListener('input', (e) => {
    state.qrColor = e.target.value;
    const dot = document.getElementById('color-dot-primary');
    if (dot) dot.style.backgroundColor = state.qrColor;
    const lbl = document.getElementById('custom-label-color');
    if (lbl) lbl.textContent = state.qrColor;
  });

  document.getElementById('custom-picker-bg')?.addEventListener('input', (e) => {
    state.bgColor = e.target.value;
    const dot = document.getElementById('color-dot-bg');
    if (dot) dot.style.backgroundColor = state.bgColor;
    const lbl = document.getElementById('custom-label-bg');
    if (lbl) lbl.textContent = state.bgColor;
  });

  document.querySelectorAll('.custom-logo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-logo');
      state.logoUrl = BRAND_LOGOS[key] || null;
      document.querySelectorAll('.custom-logo-btn').forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50'));
      btn.classList.add('border-indigo-600', 'bg-indigo-50');
      showToast(`Selected ${key} logo badge`);
    });
  });

  document.getElementById('btn-custom-remove-logo')?.addEventListener('click', () => {
    state.logoUrl = null;
    document.querySelectorAll('.custom-logo-btn').forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50'));
    showToast('Removed logo badge');
  });

  document.getElementById('btn-save-customize')?.addEventListener('click', () => {
    renderQR();
    modalCustomize?.classList.add('hidden');
    showToast('Custom style applied!');
  });

  // Create Screen Type Switcher
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active', 'bg-white', 'dark:bg-slate-800', 'text-indigo-600', 'shadow-xs'));
      pill.classList.add('active', 'bg-white', 'dark:bg-slate-800', 'text-indigo-600', 'shadow-xs');

      const t = pill.getAttribute('data-type');
      document.getElementById('field-url')?.classList.toggle('hidden', t !== 'url');
      document.getElementById('field-text')?.classList.toggle('hidden', t !== 'text');
      document.getElementById('field-wifi')?.classList.toggle('hidden', t !== 'wifi');
      document.getElementById('field-vcard')?.classList.toggle('hidden', t !== 'vcard');
    });
  });

  document.getElementById('btn-generate-custom')?.addEventListener('click', () => {
    const activeType = document.querySelector('.type-pill.active')?.getAttribute('data-type') || 'url';
    let generatedData = '';

    if (activeType === 'url') {
      generatedData = document.getElementById('create-input-url')?.value.trim() || 'https://t.me/ArafSparrow';
    } else if (activeType === 'text') {
      generatedData = document.getElementById('create-input-text')?.value.trim() || 'Hello from AX QR Studio!';
    } else if (activeType === 'wifi') {
      const ssid = document.getElementById('wifi-ssid')?.value.trim() || 'WiFi';
      const pass = document.getElementById('wifi-pass')?.value.trim() || '';
      const enc = document.getElementById('wifi-type')?.value || 'WPA';
      generatedData = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
    } else if (activeType === 'vcard') {
      const name = document.getElementById('vcard-name')?.value.trim() || 'Araf Sparrow';
      const phone = document.getElementById('vcard-phone')?.value.trim() || '';
      const email = document.getElementById('vcard-email')?.value.trim() || '';
      generatedData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
    }

    state.url = generatedData;
    if (inputUrl) inputUrl.value = generatedData;
    renderQR();
    switchScreen('screen-home');
    showToast('Custom QR Generated!');
  });

});
