/**
 * AX QR Studio — Professional QR Code Engine & Native Bridge
 * Complete Repair, 100% Offline Support, Performance Optimization & Premium Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // Native Android Bridge Detector
  const isAndroid = () => !!(window.AndroidBridge && typeof window.AndroidBridge.isNative === 'function' && window.AndroidBridge.isNative());

  // ==================== INTERNATIONALIZATION (i18n) DICTIONARY ====================
  const translations = {
    en: {
      badge_offline: "Offline Mode",
      type_link: "Link",
      type_text: "Text",
      type_wifi: "WiFi",
      type_contact: "Contact",
      placeholder_input: "Enter URL or link here...",
      warning_contrast: "Low contrast! Code may be difficult for some cameras to scan.",
      title_presets: "Design Presets",
      custom_colors: "Custom",
      title_styles: "QR Shape & Pattern",
      style_square: "Default",
      style_rounded: "Rounded",
      style_dots: "Dots",
      style_classy: "Classy",
      style_extra: "Extra",
      title_resolution: "Download Resolution",
      download_png_hd: "Download PNG (HD)",
      download_svg: "Download SVG",
      share_qr: "Share QR",
      save_to_gallery_btn: "Save to Device Gallery",
      batch_generator_btn: "Batch QR Generator (CSV to ZIP)",
      create_title: "Create QR Code",
      create_subtitle: "Choose a type or template to get started",
      batch_label: "Batch",
      templates_title: "Templates Library",
      templates_hint: "Tap to auto-fill",
      template_biz: "Biz Contact",
      template_wifi: "Home WiFi",
      template_hub: "Linktree Hub",
      template_event: "Event RSVP",
      card_website: "Website",
      card_text: "Plain Text",
      card_wifi: "Wi-Fi",
      card_contact: "Contact",
      card_email: "Email",
      card_phone: "Phone",
      card_sms: "SMS",
      card_location: "Location",
      card_multilink: "Multi-Link",
      card_social: "Social Media",
      card_event: "Event",
      card_app: "App Store",
      generate_and_preview: "Generate & Preview",
      scanner_title: "Real-time QR Scanner",
      scanner_subtitle: "Point your camera at a QR code",
      scanner_align_hint: "Align the QR code within the frame",
      scan_gallery_btn: "Scan from Gallery",
      restart_camera_btn: "Restart Camera",
      qr_detected: "QR Code Detected!",
      warning_suspicious_url: "Suspicious destination: Confirm before opening this address.",
      action_open: "Open",
      action_copy: "Copy",
      action_share: "Share",
      action_edit: "Edit",
      history_title: "History",
      history_subtitle: "Your generated and scanned codes",
      export_btn: "Export",
      clear_all_btn: "Clear All",
      filter_all: "All",
      filter_generated: "Generated",
      filter_scanned: "Scanned",
      filter_favorites: "★ Favorites",
      search_placeholder: "Search codes...",
      settings_title: "Settings",
      settings_subtitle: "Customise your experience",
      app_tagline: "Professional Offline QR Suite",
      appearance_title: "Appearance",
      appearance_sub: "Make the app look the way you like",
      theme_light: "Light Mode",
      theme_dark: "Dark Mode",
      theme_system: "System",
      qr_pref_title: "QR Preferences",
      qr_pref_sub: "Default settings for QR generation",
      default_quality: "Default Download Quality",
      default_qr_style: "Default QR Style",
      default_colors: "Default Colors",
      add_logo_default: "Add Logo by Default",
      save_to_gallery_pref: "Save to Device Gallery",
      auto_save_history: "Auto Save to History",
      scan_beep_sound: "Scan Beep Sound",
      vibration_feedback: "Vibration Feedback",
      confirm_external_links: "Confirm Scanned External Links",
      clear_history_btn: "Clear All History Records",
      batch_qr_generator: "Batch QR Generator (CSV to ZIP)",
      notifications_title: "Notifications",
      privacy_security_title: "Privacy & Security",
      language_title: "Language",
      community_title: "Official Communities",
      help_support_title: "Help & Support",
      about_title: "About AX QR Studio",
      about_edition: "Studio Pro • Fully Offline",
      nav_home: "Home",
      nav_create: "Create",
      nav_scan: "Scan",
      nav_history: "History",
      nav_settings: "Settings",
      batch_modal_title: "Batch QR Generator",
      batch_instructions: "Paste CSV rows below or upload a file. Each row will be exported as an individual HD QR code packaged into a ZIP archive.",
      upload_csv: "Upload CSV File",
      sample_csv: "Load Sample",
      start_batch_btn: "Generate & Download ZIP",
      notification_pref_title: "Notification Preferences",
      scan_alert_title: "Scan Detection Alert",
      save_alert_title: "QR Saved / Downloaded Alert",
      check_system_perms: "Test Notification Banner",
      privacy_modal_title: "Privacy & Security",
      privacy_point1_title: "100% Local Processing",
      privacy_point1_desc: "All QR code generation and decoding occurs directly in device memory with zero external telemetry or cloud servers.",
      privacy_point2_title: "Camera Safety",
      privacy_point2_desc: "Camera frames are analyzed in-memory and immediately destroyed. No video is ever stored or transmitted.",
      privacy_point3_title: "Sandboxed Storage",
      privacy_point3_desc: "History and preferences reside in isolated local app storage and can be cleared independently below.",
      clear_history_only: "Clear History Records Only",
      reset_settings_only: "Reset Settings to Default",
      clear_all_data: "Reset All App Data & Reload",
      faq_title: "Frequently Asked Questions",
      faq_q1: "Does AX QR Studio work offline?",
      faq_a1: "Yes! All QR generation, styling, camera scanning, gallery image decoding, and history storage are 100% self-contained and work without any internet connection.",
      faq_q2: "How to export high resolution 4K QR codes?",
      faq_a2: "Select '2000px 4K' above the download button for ultra-sharp print quality, or tap 'Download SVG' for infinite lossless vector scalability.",
      faq_q3: "How does Batch QR Generation work?",
      faq_a3: "Paste a CSV list or upload a .csv file in Settings → Batch QR Generator. All individual QR codes are generated and packaged into a ZIP file ready to download.",
      app_edition: "Studio Pro • 100% Offline",
      app_desc: "Fast, Private & Secure QR Code Suite",
      about_app: "Application",
      about_version: "Version",
      about_offline_status: "Offline Engine",
      about_storage_status: "Local Database",
      select_language: "Select Language",
      style_modal_subtitle: "Choose default shape style for generated QR codes",
      style_rounded_full: "Modern Rounded",
      style_dots_full: "Circular Dots",
      style_classy_full: "Classy Curved",
      style_square_full: "Classic Square",
      style_extra_full: "Extra Geometric",
      colors_modal_title: "QR Color Studio",
      colors_modal_subtitle: "Customize QR foreground and background colors",
      live_preview: "Live Color Preview",
      qr_foreground: "QR Foreground (Dots)",
      qr_background: "QR Background",
      reset_btn: "Reset Default",
      apply_colors_btn: "Apply Colors"
    },
    bn: {
      badge_offline: "অফলাইন মোড",
      type_link: "লিঙ্ক",
      type_text: "টেক্সট",
      type_wifi: "ওয়াইফাই",
      type_contact: "পরিচিতি",
      placeholder_input: "এখানে ইউআরএল বা লিঙ্ক লিখুন...",
      warning_contrast: "কম বৈসাদৃশ্য! কিছু ক্যামেরায় কোডটি স্ক্যান করতে সমস্যা হতে পারে।",
      title_presets: "ডিজাইন প্রিসেট",
      custom_colors: "কাস্টম",
      title_styles: "কিউআর আকার ও প্যাটার্ন",
      style_square: "ডিফল্ট",
      style_rounded: "রাউন্ডেড",
      style_dots: "ডটস",
      style_classy: "ক্ল্যাসি",
      style_extra: "এক্সট্রা",
      title_resolution: "ডাউনলোড রেজোলিউশন",
      download_png_hd: "ডাউনলোড পিএনজি (এইচডি)",
      download_svg: "ডাউনলোড এসভিজি",
      share_qr: "কিউআর শেয়ার করুন",
      save_to_gallery_btn: "ডিভাইস গ্যালারিতে সেভ করুন",
      batch_generator_btn: "ব্যাচ কিউআর জেনারেটর (সিএসভি থেকে জিপ)",
      create_title: "কিউআর কোড তৈরি করুন",
      create_subtitle: "শুরু করতে একটি ধরণ বা টেমপ্লেট বেছে নিন",
      batch_label: "ব্যাচ",
      templates_title: "টেমপ্লেট লাইব্রেরি",
      templates_hint: "অটো-ফিল করতে ট্যাপ করুন",
      template_biz: "বিজনেস কার্ড",
      template_wifi: "বাসার ওয়াইফাই",
      template_hub: "লিঙ্কট্রি হাব",
      template_event: "ইভেন্ট আরএসভিপি",
      card_website: "ওয়েবসাইট",
      card_text: "প্লেইন টেক্সট",
      card_wifi: "ওয়াই-ফাই",
      card_contact: "কন্টাক্ট",
      card_email: "ইমেইল",
      card_phone: "ফোন কল",
      card_sms: "এসএমএস",
      card_location: "অবস্থান",
      card_multilink: "মাল্টি-লিঙ্ক",
      card_social: "সোশ্যাল মিডিয়া",
      card_event: "ইভেন্ট",
      card_app: "অ্যাপ স্টোর",
      generate_and_preview: "তৈরি ও প্রিভিউ",
      scanner_title: "রিয়েল-টাইম কিউআর স্ক্যানার",
      scanner_subtitle: "কিউআর কোডের দিকে ক্যামেরা তাক করুন",
      scanner_align_hint: "ফ্রেমের ভেতরে কিউআর কোডটি রাখুন",
      scan_gallery_btn: "গ্যালারি থেকে স্ক্যান",
      restart_camera_btn: "ক্যামেরা রিস্টার্ট",
      qr_detected: "কিউআর কোড শনাক্ত হয়েছে!",
      warning_suspicious_url: "সন্দেহজনক ঠিকানা: লিঙ্কটি খোলার আগে নিশ্চিত হন।",
      action_open: "খুলুন",
      action_copy: "কপি",
      action_share: "শেয়ার",
      action_edit: "এডিট",
      history_title: "ইতিহাস",
      history_subtitle: "আপনার সংরক্ষিত ও স্ক্যান করা কোড",
      export_btn: "রপ্তানি",
      clear_all_btn: "সব মুছুন",
      filter_all: "সব",
      filter_generated: "তৈরি করা",
      filter_scanned: "স্ক্যান করা",
      filter_favorites: "★ প্রিয় তালিকা",
      search_placeholder: "কোড খুঁজুন...",
      settings_title: "সেটিংস",
      settings_subtitle: "অ্যাপটি আপনার মতো সাজান",
      app_tagline: "প্রফেশনাল অফলাইন কিউআর স্যুট",
      appearance_title: "রূপরেখা",
      appearance_sub: "পছন্দের থিম নির্বাচন করুন",
      theme_light: "লাইট মোড",
      theme_dark: "ডার্ক মোড",
      theme_system: "সিস্টেম",
      qr_pref_title: "কিউআর পছন্দসমূহ",
      qr_pref_sub: "কিউআর তৈরির ডিফল্ট সেটিংস",
      default_quality: "ডিফল্ট ডাউনলোড কোয়ালিটি",
      default_qr_style: "ডিফল্ট কিউআর স্টাইল",
      default_colors: "ডিফল্ট রঙ",
      add_logo_default: "ডিফল্টভাবে লোগো যুক্ত করুন",
      save_to_gallery_pref: "ডিভাইস গ্যালারিতে সেভ করুন",
      auto_save_history: "স্বয়ংক্রিয়ভাবে ইতিহাসে সেভ করুন",
      scan_beep_sound: "স্ক্যান বিপ শব্দ",
      vibration_feedback: "ভাইব্রেশন ফিডব্যাক",
      confirm_external_links: "বাহ্যিক লিঙ্ক খোলার আগে নিশ্চিত করুন",
      clear_history_btn: "সব ইতিহাস রেকর্ড মুছুন",
      batch_qr_generator: "ব্যাচ কিউআর জেনারেটর (সিএসভি থেকে জিপ)",
      notifications_title: "নোটিফিকেশন",
      privacy_security_title: "গোপনীয়তা ও সুরক্ষা",
      language_title: "ভাষা (Language)",
      community_title: "অফিসিয়াল কমিউনিটি",
      help_support_title: "সাহায্য ও সমর্থন",
      about_title: "সম্পর্কিত",
      about_edition: "স্টুডিও প্রো • সম্পূর্ণ অফলাইন",
      nav_home: "হোম",
      nav_create: "তৈরি",
      nav_scan: "স্ক্যান",
      nav_history: "ইতিহাস",
      nav_settings: "সেটিংস",
      batch_modal_title: "ব্যাচ কিউআর জেনারেটর",
      batch_instructions: "নিচে সিএসভি সারি পেস্ট করুন বা ফাইল আপলোড করুন। প্রতিটি কোড এইচডি পিএনজি হিসেবে তৈরি হয়ে জিপ আর্কাইভে ডাউনলোড হবে।",
      upload_csv: "সিএসভি ফাইল আপলোড",
      sample_csv: "নমুনা দেখুন",
      start_batch_btn: "তৈরি ও জিপ ডাউনলোড",
      notification_pref_title: "নোটিফিকেশন পছন্দসমূহ",
      scan_alert_title: "স্ক্যান শনাক্তকরণ অ্যালার্ট",
      save_alert_title: "কিউআর সেভ / ডাউনলোড অ্যালার্ট",
      check_system_perms: "নোটিফিকেশন ব্যানার পরীক্ষা",
      privacy_modal_title: "গোপনীয়তা ও সুরক্ষা",
      privacy_point1_title: "১০০% লোকাল প্রসেসিং",
      privacy_point1_desc: "সমস্ত কিউআর কোড তৈরি ও ডিকোডিং সরাসরি ডিভাইসের মেমরিতে ঘটে। কোনো তথ্য ক্লাউডে পাঠানো হয় না।",
      privacy_point2_title: "ক্যামেরার সুরক্ষা",
      privacy_point2_desc: "ক্যামেরা ফ্রেম মেমরিতে বিশ্লেষণ করার পর সাথে সাথে নষ্ট করা হয়। কোনো ভিডিও সেভ হয় না।",
      privacy_point3_title: "সুরক্ষিত লোকাল স্টোরেজ",
      privacy_point3_desc: "ইতিহাস ও পছন্দসমূহ ডিভাইসের সংরক্ষিত মেমরিতে থাকে এবং নিচের বাটন দিয়ে মুছতে পারবেন।",
      clear_history_only: "শুধু ইতিহাস রেকর্ড মুছুন",
      reset_settings_only: "সেটিংস ডিফল্ট করুন",
      clear_all_data: "সব ডেটা রিসেট ও রিলোড",
      faq_title: "সাধারণ জিজ্ঞাসা",
      faq_q1: "এএক্স কিউআর স্টুডিও কি অফলাইনে কাজ করে?",
      faq_a1: "হ্যাঁ! কিউআর তৈরি, স্টাইলিং, ক্যামেরা স্ক্যান, গ্যালারি ইমেজ ডিকোডিং ও হিস্ট্রি সম্পূর্ণ অফলাইনে ইন্টারনেট ছাড়াই চলে।",
      faq_q2: "কীভাবে উচ্চ রেজোলিউশনের ৪কে কিউআর পাবেন?",
      faq_a2: "ডাউনলোড বাটনের ওপরে '2000px 4K' নির্বাচন করুন বা ভেক্টর স্কেলিংয়ের জন্য 'ডাউনলোড এসভিজি' ট্যাপ করুন।",
      faq_q3: "ব্যাচ কিউআর জেনারেটর কীভাবে কাজ করে?",
      faq_a3: "সেটিংস থেকে ব্যাচ কিউআর জেনারেটরে গিয়ে সিএসভি টেক্সট দিন। সবগুলো কিউআর একসাথে তৈরি হয়ে একটি জিপ ফাইলে সেভ হবে।",
      app_edition: "স্টুডিও প্রো • ১০০% অফলাইন",
      app_desc: "দ্রুত, নিরাপদ ও অফলাইন কিউআর কোড স্যুট",
      about_app: "অ্যাপ্লিকেশন",
      about_version: "ভার্সন",
      about_offline_status: "অফলাইন ইঞ্জিন",
      about_storage_status: "লোকাল ডাটাবেস",
      select_language: "ভাষা নির্বাচন করুন",
      style_modal_subtitle: "কিউআর কোডের জন্য ডিফল্ট আকার নির্বাচন করুন",
      style_rounded_full: "আধুনিক রাউন্ডেড",
      style_dots_full: "বৃত্তাকার ডটস",
      style_classy_full: "ক্ল্যাসি কার্ভড",
      style_square_full: "ক্লাসিক স্কয়ার",
      style_extra_full: "এক্সট্রা জিওমেট্রিক",
      colors_modal_title: "কিউআর কালার স্টুডিও",
      colors_modal_subtitle: "কিউআর কোডের সামনের ও পেছনের রঙ পছন্দ করুন",
      live_preview: "লাইভ রঙ প্রিভিউ",
      qr_foreground: "কিউআর রঙ (ডটস)",
      qr_background: "পেছনের রঙ",
      reset_btn: "ডিফল্ট করুন",
      apply_colors_btn: "রঙ প্রয়োগ করুন"
    }
  };

  function t(key, fallback = '') {
    const lang = state.settings.language || 'en';
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || fallback || key;
  }

  function applyLanguage(lang) {
    state.settings.language = lang === 'bn' ? 'bn' : 'en';
    saveSettings();

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (k) el.textContent = t(k);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (k) el.setAttribute('placeholder', t(k));
    });

    // Update quick switch label and modal checkmarks
    const quickLabel = document.getElementById('lang-quick-label');
    if (quickLabel) quickLabel.textContent = state.settings.language === 'bn' ? 'বাং' : 'EN';

    const currentLangLabel = document.getElementById('current-lang-label');
    if (currentLangLabel) currentLangLabel.textContent = state.settings.language === 'bn' ? 'বাংলা' : 'English';

    const chkEn = document.querySelector('.lang-check-en');
    const chkBn = document.querySelector('.lang-check-bn');
    if (chkEn) chkEn.classList.toggle('hidden', state.settings.language !== 'en');
    if (chkBn) chkBn.classList.toggle('hidden', state.settings.language !== 'bn');

    // Update dynamic create form title if active
    updateCreateFormTitle();
    refreshIcons();
  }

  // ==================== STATE MANAGEMENT ====================
  const state = {
    url: '',
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
      theme: 'dark',
      defaultQuality: 1000,
      defaultStyle: 'Rounded',
      defaultPrimaryColor: '#6366f1',
      defaultBgColor: '#ffffff',
      addLogoDefault: false,
      saveToGallery: true,
      autoSaveHistory: true,
      scanBeep: true,
      scanVibrate: true,
      linkConfirm: true,
      notifScan: true,
      notifSave: true,
      language: 'en'
    },
    history: [],
    historyFilter: 'all',
    favorites: []
  };

  // Load Saved Settings, History & Favorites
  try {
    const savedSettings = localStorage.getItem('ax_qr_settings_v3') || localStorage.getItem('ax_qr_settings_v2');
    if (savedSettings) Object.assign(state.settings, JSON.parse(savedSettings));

    const savedHistory = localStorage.getItem('ax_qr_history_v3') || localStorage.getItem('ax_qr_history_v2');
    if (savedHistory) state.history = JSON.parse(savedHistory);

    const savedFavs = localStorage.getItem('ax_qr_favorites_v3');
    if (savedFavs) state.favorites = JSON.parse(savedFavs);

    state.resolution = state.settings.defaultQuality || 1000;
    if (state.settings.addLogoDefault) {
      state.logoUrl = 'logo.png';
      state.errorCorrection = 'H';
    }
  } catch (e) {
    console.warn('Storage load error:', e);
  }

  function saveSettings() {
    try {
      localStorage.setItem('ax_qr_settings_v3', JSON.stringify(state.settings));
    } catch (e) {}
  }

  function saveHistory() {
    try {
      localStorage.setItem('ax_qr_history_v3', JSON.stringify(state.history));
      localStorage.setItem('ax_qr_favorites_v3', JSON.stringify(state.favorites));
    } catch (e) {}
  }

  // ==================== OFFLINE DETECTION & INDICATOR ====================
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    const badge = document.getElementById('offline-badge');
    if (badge) {
      if (!isOnline) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // ==================== THEME MANAGEMENT ====================
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
      refreshIcons();
    }

    const cardLight = document.getElementById('theme-card-light');
    const cardDark = document.getElementById('theme-card-dark');
    const cardSystem = document.getElementById('theme-card-system');

    if (cardLight) cardLight.classList.toggle('active', theme === 'light');
    if (cardDark) cardDark.classList.toggle('active', theme === 'dark');
    if (cardSystem) cardSystem.classList.toggle('active', theme === 'system');
  }

  // Listen for system theme changes if set to system
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (state.settings.theme === 'system') {
        applyTheme('system');
      }
    });
  }
  applyTheme(state.settings.theme || 'dark');

  // ==================== TOAST & NOTIFICATIONS ====================
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastText) return;
    clearTimeout(toastTimer);
    toastText.textContent = msg;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    toastTimer = setTimeout(() => {
      toast.classList.add('translate-y-16', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2500);
  }

  // ==================== AUDIO & VIBRATION ====================
  let audioCtx = null;
  function initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {}
  }
  document.addEventListener('click', initAudio, { once: true });
  document.addEventListener('touchstart', initAudio, { once: true });

  function playScanBeep() {
    if (!state.settings.scanBeep) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  }

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

  // ==================== CLIPBOARD HELPERS ====================
  async function copyToClipboard(text, successMsg) {
    try {
      if (isAndroid() && window.AndroidBridge.copyToClipboard) {
        window.AndroidBridge.copyToClipboard(text);
        showToast(successMsg || '✅ ' + (state.settings.language === 'bn' ? 'ক্লিপবোর্ডে কপি হয়েছে!' : 'Copied to clipboard!'));
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg || '✅ ' + (state.settings.language === 'bn' ? 'ক্লিপবোর্ডে কপি হয়েছে!' : 'Copied to clipboard!'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(successMsg || '✅ ' + (state.settings.language === 'bn' ? 'ক্লিপবোর্ডে কপি হয়েছে!' : 'Copied to clipboard!'));
      }
    } catch (e) {
      showToast('❌ Clipboard error');
    }
  }

  async function pasteFromClipboard() {
    try {
      let text = '';
      if (isAndroid() && window.AndroidBridge.getClipboardText) {
        text = window.AndroidBridge.getClipboardText();
      } else if (navigator.clipboard && navigator.clipboard.readText) {
        text = await navigator.clipboard.readText();
      }
      if (text) {
        const inputUrl = document.getElementById('input-url');
        if (inputUrl) inputUrl.value = text;
        state.url = text;
        renderQR();
        showToast('✅ ' + (state.settings.language === 'bn' ? 'পেস্ট করা হয়েছে!' : 'Pasted from clipboard!'));
      } else {
        showToast(state.settings.language === 'bn' ? 'ক্লিপবোর্ড খালি' : 'Clipboard is empty');
      }
    } catch (e) {
      showToast(state.settings.language === 'bn' ? 'ইনপুটে লং-প্রেস করে পেস্ট করুন' : 'Long-press input field to paste');
    }
  }

  // ==================== QR CONTRAST VALIDATION (Phase 9) ====================
  function getLuminance(hex) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  function checkContrast(fgHex, bgHex) {
    try {
      const l1 = getLuminance(fgHex);
      const l2 = getLuminance(bgHex);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const warnBanner = document.getElementById('contrast-warning-banner');
      if (warnBanner) {
        if (ratio < 2.8) {
          warnBanner.classList.remove('hidden');
          warnBanner.classList.add('flex');
        } else {
          warnBanner.classList.add('hidden');
          warnBanner.classList.remove('flex');
        }
      }
    } catch (e) {}
  }

  // ==================== QR STYLING CONFIG & ENGINE ====================
  function applyStyleConfig(styleName) {
    const norm = (styleName || 'Rounded').toLowerCase();
    let label = 'Rounded';
    if (norm.includes('dot')) {
      state.dotsType = 'dots';
      state.cornerSquareType = 'dot';
      state.cornerDotType = 'dot';
      label = 'Dots';
    } else if (norm.includes('classy')) {
      state.dotsType = 'classy';
      state.cornerSquareType = 'extra-rounded';
      state.cornerDotType = 'classy';
      label = 'Classy';
    } else if (norm.includes('square') || norm.includes('default')) {
      state.dotsType = 'square';
      state.cornerSquareType = 'square';
      state.cornerDotType = 'square';
      label = 'Square';
    } else if (norm.includes('extra')) {
      state.dotsType = 'extra-rounded';
      state.cornerSquareType = 'extra-rounded';
      state.cornerDotType = 'dot';
      label = 'Extra';
    } else {
      state.dotsType = 'rounded';
      state.cornerSquareType = 'extra-rounded';
      state.cornerDotType = 'dot';
      label = 'Rounded';
    }

    state.settings.defaultStyle = label;
    const labelEl = document.getElementById('pref-style-label');
    if (labelEl) labelEl.textContent = label;

    // Synchronize style cards on Home screen
    document.querySelectorAll('.qr-style-card').forEach(card => {
      const s = card.getAttribute('data-style');
      const isAct = (label === 'Square' && s === 'square') ||
                    (label === 'Rounded' && s === 'rounded') ||
                    (label === 'Dots' && s === 'dots') ||
                    (label === 'Classy' && s === 'classy') ||
                    (label === 'Extra' && s === 'extra-rounded');
      card.classList.toggle('active', isAct);
    });

    // Synchronize modal options
    document.querySelectorAll('.style-choice-btn').forEach(btn => {
      const name = btn.getAttribute('data-style-name');
      const isAct = (name === label);
      btn.classList.toggle('border-indigo-500', isAct);
      btn.classList.toggle('dark:border-indigo-500', isAct);
      const chk = btn.querySelector('.check-icon');
      if (chk) chk.classList.toggle('hidden', !isAct);
    });
  }

  function applyColorConfig(primaryColor, bgColor) {
    state.qrColor = primaryColor || '#6366f1';
    state.bgColor = bgColor || '#ffffff';
    state.settings.defaultPrimaryColor = state.qrColor;
    state.settings.defaultBgColor = state.bgColor;

    const dotPrimary = document.getElementById('color-dot-primary');
    const dotBg = document.getElementById('color-dot-bg');
    if (dotPrimary) dotPrimary.style.backgroundColor = state.qrColor;
    if (dotBg) dotBg.style.backgroundColor = state.bgColor;

    checkContrast(state.qrColor, state.bgColor);
  }

  // Apply saved configurations
  applyStyleConfig(state.settings.defaultStyle || 'Rounded');
  applyColorConfig(state.settings.defaultPrimaryColor || '#6366f1', state.settings.defaultBgColor || '#ffffff');

  function getCleanUrl(url) {
    let raw = (url || state.url || '').trim();
    if (!raw) return 'https://axqrstudio.app';
    if (!/^https?:\/\//i.test(raw) &&
        !raw.startsWith('mailto:') &&
        !raw.startsWith('tel:') &&
        !raw.startsWith('smsto:') &&
        !raw.startsWith('geo:') &&
        !raw.startsWith('WIFI:') &&
        !raw.startsWith('BEGIN:VCARD') &&
        !raw.startsWith('BEGIN:VEVENT') &&
        !raw.startsWith('data:')) {
      return 'https://' + raw;
    }
    return raw;
  }

  function buildConfig(size, type = 'canvas') {
    return {
      width: size,
      height: size,
      type: type,
      data: getCleanUrl(),
      margin: 10,
      qrOptions: {
        errorCorrectionLevel: state.logoUrl ? 'H' : state.errorCorrection
      },
      image: state.logoUrl || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.32,
        margin: 6,
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
  }

  // Live Canvas Rendering with Debounce
  let qrCodeInstance = null;
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');
  let renderDebounceTimer = null;

  function renderQR() {
    clearTimeout(renderDebounceTimer);
    renderDebounceTimer = setTimeout(() => {
      const config = buildConfig(270, 'canvas');
      if (!qrCodeInstance) {
        if (qrCanvasWrapper) {
          qrCanvasWrapper.innerHTML = '';
          qrCodeInstance = new QRCodeStyling(config);
          qrCodeInstance.append(qrCanvasWrapper);
        }
      } else {
        qrCodeInstance.update(config);
      }
      checkContrast(state.qrColor, state.bgColor);
      updateLiveFavoriteButton();
    }, 90);
  }
  renderQR();

  // Mini Preview in Colors Modal
  let miniColorQrInstance = null;
  function updateMiniColorPreview(fg, bg) {
    const miniWrapper = document.getElementById('mini-color-qr');
    const previewBox = document.getElementById('mini-color-preview-box');
    if (previewBox) previewBox.style.backgroundColor = bg || '#ffffff';
    const config = {
      width: 80,
      height: 80,
      type: 'svg',
      data: 'https://axqrstudio.app',
      margin: 4,
      dotsOptions: { color: fg || '#6366f1', type: state.dotsType || 'rounded' },
      backgroundOptions: { color: 'transparent' },
      cornersSquareOptions: { color: fg || '#6366f1', type: state.cornerSquareType || 'extra-rounded' },
      cornersDotOptions: { color: fg || '#6366f1', type: state.cornerDotType || 'dot' }
    };
    if (!miniColorQrInstance) {
      if (miniWrapper) {
        miniWrapper.innerHTML = '';
        miniColorQrInstance = new QRCodeStyling(config);
        miniColorQrInstance.append(miniWrapper);
      }
    } else {
      miniColorQrInstance.update(config);
    }
  }

  // ==================== DESIGN PRESETS (Phase 9) ====================
  const designPresets = {
    violet: { fg: '#8b5cf6', bg: '#0b0f19', style: 'Classy' },
    cyan: { fg: '#06b6d4', bg: '#0b0f19', style: 'Rounded' },
    amber: { fg: '#f59e0b', bg: '#000000', style: 'Extra' },
    emerald: { fg: '#10b981', bg: '#ffffff', style: 'Dots' },
    classic: { fg: '#000000', bg: '#ffffff', style: 'Square' }
  };

  document.querySelectorAll('.design-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.getAttribute('data-preset');
      const preset = designPresets[p];
      if (preset) {
        applyStyleConfig(preset.style);
        applyColorConfig(preset.fg, preset.bg);
        renderQR();
        showToast(`Preset: ${p.toUpperCase()} applied`);
      }
    });
  });

  // ==================== SCREEN NAVIGATION ====================
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');
  const btnFloatingScan = document.getElementById('btn-floating-scan');

  function switchScreen(targetScreenId) {
    navTabs.forEach(tab => {
      const isTarget = tab.getAttribute('data-screen') === targetScreenId;
      tab.classList.toggle('active-tab', isTarget);
      tab.classList.toggle('text-indigo-600', isTarget);
      tab.classList.toggle('dark:text-indigo-400', isTarget);
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

    if (targetScreenId === 'screen-scan') {
      startCameraScanner();
    } else {
      stopCameraScanner();
    }

    if (targetScreenId === 'screen-history') {
      renderHistoryItems();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshIcons();
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchScreen(tab.getAttribute('data-screen')));
  });

  if (btnFloatingScan) {
    btnFloatingScan.addEventListener('click', () => switchScreen('screen-scan'));
  }

  // ==================== HOME SCREEN CONTROLS ====================
  const inputUrl = document.getElementById('input-url');
  if (inputUrl) {
    inputUrl.addEventListener('input', (e) => {
      state.url = e.target.value;
      renderQR();
    });
  }

  const btnPaste = document.getElementById('btn-paste');
  if (btnPaste) btnPaste.addEventListener('click', pasteFromClipboard);

  // Quick Type Filter Pills
  document.querySelectorAll('.home-type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.home-type-pill').forEach(p => {
        p.classList.remove('active', 'text-white', 'bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 'shadow-sm');
        p.classList.add('text-slate-600', 'dark:text-slate-400');
      });
      pill.classList.add('active', 'text-white', 'bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 'shadow-sm');
      pill.classList.remove('text-slate-600', 'dark:text-slate-400');

      const t = pill.getAttribute('data-type');
      if (t === 'link') {
        inputUrl.placeholder = t('placeholder_input', 'Enter URL or link here...');
        inputUrl.value = '';
      } else if (t === 'text') {
        inputUrl.placeholder = 'Enter plain text content...';
        inputUrl.value = '';
      } else if (t === 'wifi') {
        inputUrl.placeholder = 'WIFI:S:MyNetwork;T:WPA;P:secret123;;';
        inputUrl.value = '';
      } else if (t === 'contact') {
        inputUrl.placeholder = 'BEGIN:VCARD\nVERSION:3.0\nN:John Doe\nTEL:+123456789\nEND:VCARD';
        inputUrl.value = '';
      }
      state.url = inputUrl.value;
      renderQR();
    });
  });

  // Social Chips
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

  // QR Style Selector Cards
  document.querySelectorAll('.qr-style-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.qr-style-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      applyStyleConfig(card.getAttribute('data-style'));
      renderQR();
    });
  });

  // Live Resolution Selector Pills
  document.querySelectorAll('.live-res-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.live-res-pill').forEach(p => {
        p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/50', 'text-indigo-700', 'dark:text-indigo-300', 'active');
        p.classList.add('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      });
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/50', 'text-indigo-700', 'dark:text-indigo-300', 'active');
      pill.classList.remove('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      state.resolution = parseInt(pill.getAttribute('data-res'), 10);
      showToast(`Resolution: ${state.resolution}px`);
    });
  });

  // Top Theme Toggle & Quick Lang Switcher
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Dark Mode' : 'Light Mode');
    });
  }

  const btnLangQuick = document.getElementById('btn-lang-quick');
  if (btnLangQuick) {
    btnLangQuick.addEventListener('click', () => {
      const nextLang = state.settings.language === 'en' ? 'bn' : 'en';
      applyLanguage(nextLang);
      showToast(nextLang === 'bn' ? 'ভাষা: বাংলা' : 'Language: English');
    });
  }

  // ==================== EXPORT: PNG, SVG, GALLERY & SHARE ====================
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

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

  async function generateExportBlob(type = 'png', targetResolution = null) {
    const size = targetResolution || state.resolution || 1000;
    const exportDiv = document.createElement('div');
    exportDiv.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:' + size + 'px;height:' + size + 'px;';
    document.body.appendChild(exportDiv);

    try {
      const config = buildConfig(size, type === 'svg' ? 'svg' : 'canvas');
      const inst = new QRCodeStyling(config);
      inst.append(exportDiv);

      // Allow DOM draw
      await new Promise(r => setTimeout(r, 60));

      let blob = null;
      if (typeof inst.getRawData === 'function') {
        try {
          blob = await inst.getRawData(type === 'svg' ? 'svg' : 'png');
        } catch (e) {}
      }

      if (!blob) {
        if (type === 'svg') {
          const svgEl = exportDiv.querySelector('svg');
          if (svgEl) {
            const serializer = new XMLSerializer();
            const svgStr = serializer.serializeToString(svgEl);
            blob = new Blob([svgStr], { type: 'image/svg+xml' });
          }
        } else {
          const canvasEl = exportDiv.querySelector('canvas');
          if (canvasEl) {
            blob = await new Promise(res => canvasEl.toBlob(res, 'image/png'));
          }
        }
      }

      return blob;
    } finally {
      if (exportDiv.parentNode) exportDiv.parentNode.removeChild(exportDiv);
    }
  }

  function recordHistory(format, titleOverride = null) {
    if (!state.settings.autoSaveHistory) return;
    const now = new Date();
    const item = {
      id: Date.now(),
      title: titleOverride || state.title || 'Generated QR Code',
      data: getCleanUrl(),
      format: format.toUpperCase(),
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: now.getTime(),
      favorite: false
    };
    state.history.unshift(item);
    if (state.history.length > 100) state.history.pop();
    saveHistory();
  }

  // Download PNG Button
  const btnDownloadPng = document.getElementById('btn-download-png');
  if (btnDownloadPng) {
    btnDownloadPng.addEventListener('click', async () => {
      showToast(state.settings.language === 'bn' ? 'এইচডি পিএনজি তৈরি হচ্ছে...' : 'Generating HD PNG...');
      try {
        const blob = await generateExportBlob('png', state.resolution);
        if (!blob) throw new Error('Render failed');

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.png`;

        if (state.settings.saveToGallery && isAndroid() && window.AndroidBridge.saveImageToGallery) {
          const base64 = await blobToBase64(blob);
          const resStr = window.AndroidBridge.saveImageToGallery(base64, fname);
          const res = JSON.parse(resStr || '{}');
          if (res.success) {
            recordHistory('png');
            showToast(`✅ ${state.settings.language === 'bn' ? 'গ্যালারিতে সংরক্ষিত!' : 'Saved to Gallery!'}`);
            return;
          }
        }

        if (isAndroid() && window.AndroidBridge.downloadFile) {
          const base64 = await blobToBase64(blob);
          window.AndroidBridge.downloadFile(base64, fname, 'image/png');
          recordHistory('png');
          showToast(`✅ ${state.settings.language === 'bn' ? 'পিএনজি ডাউনলোড সম্পন্ন!' : 'PNG Downloaded!'}`);
        } else {
          triggerBlobDownload(blob, fname);
          recordHistory('png');
          showToast(`✅ ${state.settings.language === 'bn' ? 'পিএনজি ডাউনলোড সম্পন্ন!' : 'PNG Downloaded!'}`);
        }
      } catch (err) {
        showToast('❌ PNG Export Error: ' + err.message);
      }
    });
  }

  // Download SVG Button
  const btnDownloadSvg = document.getElementById('btn-download-svg');
  if (btnDownloadSvg) {
    btnDownloadSvg.addEventListener('click', async () => {
      showToast(state.settings.language === 'bn' ? 'এসভিজি তৈরি হচ্ছে...' : 'Generating SVG...');
      try {
        const blob = await generateExportBlob('svg', 1000);
        if (!blob) throw new Error('Render failed');

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.svg`;

        if (isAndroid() && window.AndroidBridge.downloadFile) {
          const base64 = await blobToBase64(blob);
          window.AndroidBridge.downloadFile(base64, fname, 'image/svg+xml');
          recordHistory('svg');
          showToast(`✅ ${state.settings.language === 'bn' ? 'এসভিজি ডাউনলোড সম্পন্ন!' : 'SVG Downloaded!'}`);
        } else {
          triggerBlobDownload(blob, fname);
          recordHistory('svg');
          showToast(`✅ ${state.settings.language === 'bn' ? 'এসভিজি ডাউনলোড সম্পন্ন!' : 'SVG Downloaded!'}`);
        }
      } catch (err) {
        showToast('❌ SVG Export Error: ' + err.message);
      }
    });
  }

  // Save to Device Gallery Button
  const btnSaveGallery = document.getElementById('btn-save-gallery');
  if (btnSaveGallery) {
    btnSaveGallery.addEventListener('click', async () => {
      showToast(state.settings.language === 'bn' ? 'গ্যালারিতে সেভ করা হচ্ছে...' : 'Saving to Gallery...');
      try {
        const blob = await generateExportBlob('png', state.resolution);
        if (!blob) throw new Error('Render failed');

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const fname = `AX_QR_${dateStr}_${Date.now().toString().slice(-4)}.png`;

        if (isAndroid() && window.AndroidBridge.saveImageToGallery) {
          const base64 = await blobToBase64(blob);
          const resStr = window.AndroidBridge.saveImageToGallery(base64, fname);
          const res = JSON.parse(resStr || '{}');
          if (res.success) {
            recordHistory('png');
            showToast(`✅ ${state.settings.language === 'bn' ? 'গ্যালারিতে সেভ সম্পন্ন!' : 'Saved to Gallery!'}`);
          } else {
            throw new Error(res.error || 'Native write failed');
          }
        } else {
          triggerBlobDownload(blob, fname);
          recordHistory('png');
          showToast('✅ Saved image to device downloads!');
        }
      } catch (err) {
        showToast('❌ Save error: ' + err.message);
      }
    });
  }

  // Native & Web Share
  const btnShareQr = document.getElementById('btn-share-qr');
  if (btnShareQr) {
    btnShareQr.addEventListener('click', async () => {
      showToast(state.settings.language === 'bn' ? 'শেয়ার অপশন খোলা হচ্ছে...' : 'Opening Share...');
      try {
        const blob = await generateExportBlob('png', 1000);
        if (!blob) throw new Error('Render failed');

        if (isAndroid() && window.AndroidBridge.shareImage) {
          const base64 = await blobToBase64(blob);
          const ok = window.AndroidBridge.shareImage(base64, 'AX QR Studio', 'QR Code: ' + getCleanUrl());
          if (ok) return;
        }

        if (navigator.share) {
          const file = new File([blob], 'ax_qr_code.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'AX QR Studio',
              text: getCleanUrl(),
              files: [file]
            });
            return;
          }
          await navigator.share({ title: 'AX QR Studio', text: getCleanUrl(), url: getCleanUrl() });
          return;
        }

        copyToClipboard(getCleanUrl(), 'Link copied to share!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(getCleanUrl(), 'Link copied to share!');
        }
      }
    });
  }

  // ==================== FAVORITES SYSTEM (Phase 9) ====================
  function updateLiveFavoriteButton() {
    const btn = document.getElementById('btn-toggle-favorite-live');
    if (!btn) return;
    const current = getCleanUrl();
    const isFav = state.favorites.includes(current);
    const star = btn.querySelector('svg, i');
    if (star) {
      star.style.fill = isFav ? '#f59e0b' : 'none';
      star.style.color = isFav ? '#f59e0b' : '';
    }
  }

  const btnFavLive = document.getElementById('btn-toggle-favorite-live');
  if (btnFavLive) {
    btnFavLive.addEventListener('click', () => {
      const current = getCleanUrl();
      const idx = state.favorites.indexOf(current);
      if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast(state.settings.language === 'bn' ? 'প্রিয় তালিকা থেকে মুছে ফেলা হয়েছে' : 'Removed from Favorites');
      } else {
        state.favorites.push(current);
        showToast(state.settings.language === 'bn' ? '★ প্রিয় তালিকায় যুক্ত হয়েছে!' : '★ Added to Favorites!');
      }
      saveHistory();
      updateLiveFavoriteButton();
    });
  }

  // ==================== CREATE SCREEN: 12 RICH TYPES & TEMPLATES ====================
  const dynamicFields = document.getElementById('dynamic-fields');
  const createFormTitle = document.getElementById('create-form-title');
  let currentCreateType = 'link';

  const typeConfig = {
    link: {
      title: 'Website Link',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Website or Page URL</label>
          <input type="url" id="field-primary-input" placeholder="https://example.com" value="" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono">
        </div>
      `
    },
    text: {
      title: 'Plain Text',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Text Content or Note</label>
          <textarea id="field-primary-input" rows="3" placeholder="Type text content here..." class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono"></textarea>
        </div>
      `
    },
    wifi: {
      title: 'Wi-Fi Network',
      html: `
        <div class="space-y-2">
          <input type="text" id="wifi-ssid" placeholder="Network Name (SSID)" value="Home_WiFi" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="text" id="wifi-pass" placeholder="Password" value="" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <select id="wifi-type" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
            <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None (Open Network)</option>
          </select>
        </div>
      `
    },
    contact: {
      title: 'Contact (vCard 3.0)',
      html: `
        <div class="space-y-2">
          <input type="text" id="vcard-name" placeholder="Full Name" value="Alex Morgan" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="tel" id="vcard-phone" placeholder="Phone Number" value="+1234567890" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="email" id="vcard-email" placeholder="Email Address" value="alex@example.com" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="text" id="vcard-org" placeholder="Company / Title" value="Studio Lead" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
        </div>
      `
    },
    email: {
      title: 'Email Address',
      html: `
        <div class="space-y-2">
          <input type="email" id="email-addr" placeholder="Recipient Email" value="contact@example.com" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="text" id="email-subject" placeholder="Subject" value="Inquiry" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <textarea id="email-body" rows="2" placeholder="Message body..." class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs"></textarea>
        </div>
      `
    },
    phone: {
      title: 'Phone Call',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
          <input type="tel" id="field-primary-input" placeholder="+123456789" value="+123456789" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono">
        </div>
      `
    },
    sms: {
      title: 'SMS Message',
      html: `
        <div class="space-y-2">
          <input type="tel" id="sms-phone" placeholder="Recipient Phone Number" value="+123456789" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <textarea id="sms-body" rows="2" placeholder="SMS text..." class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs"></textarea>
        </div>
      `
    },
    location: {
      title: 'Map Location',
      html: `
        <div class="space-y-2">
          <input type="text" id="geo-lat" placeholder="Latitude (e.g. 23.8103)" value="23.8103" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="text" id="geo-lng" placeholder="Longitude (e.g. 90.4125)" value="90.4125" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
        </div>
      `
    },
    multilink: {
      title: 'Multi-Link Landing Hub',
      html: `
        <div class="space-y-2">
          <input type="text" id="ml-title" placeholder="Hub Title (e.g. My Socials)" value="My Links" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold">
          <input type="text" id="ml-link1" placeholder="Link 1 (https://...)" value="https://axqrstudio.app" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono">
          <input type="text" id="ml-link2" placeholder="Link 2 (https://...)" value="" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono">
          <input type="text" id="ml-link3" placeholder="Link 3 (https://...)" value="" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono">
        </div>
      `
    },
    social: {
      title: 'Social Media',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Social Profile URL</label>
          <input type="url" id="field-primary-input" placeholder="https://x.com/axqrstudio" value="" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono">
        </div>
      `
    },
    event: {
      title: 'Calendar Event',
      html: `
        <div class="space-y-2">
          <input type="text" id="event-title" placeholder="Event Summary" value="AX QR Studio Meetup" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
          <input type="text" id="event-desc" placeholder="Description / Location" value="Online Conference" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
        </div>
      `
    },
    app: {
      title: 'App Store / Download',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">App Download Link</label>
          <input type="url" id="field-primary-input" placeholder="https://play.google.com/store/apps/details?id=com.qrstudio.app" value="" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono">
        </div>
      `
    }
  };

  function updateCreateFormTitle() {
    if (!createFormTitle) return;
    const cfg = typeConfig[currentCreateType] || typeConfig.link;
    createFormTitle.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-indigo-500"></i><span>${cfg.title}</span>`;
    refreshIcons();
  }

  function setCreateType(typeKey) {
    currentCreateType = typeKey;
    document.querySelectorAll('.create-type-card').forEach(c => {
      const isAct = c.getAttribute('data-create-type') === typeKey;
      c.classList.toggle('border-indigo-500', isAct);
      c.classList.toggle('dark:border-indigo-500', isAct);
      c.classList.toggle('active', isAct);
    });

    const cfg = typeConfig[typeKey] || typeConfig.link;
    updateCreateFormTitle();
    if (dynamicFields) dynamicFields.innerHTML = cfg.html;
    refreshIcons();
  }
  setCreateType('link');

  document.querySelectorAll('.create-type-card').forEach(card => {
    card.addEventListener('click', () => {
      setCreateType(card.getAttribute('data-create-type'));
      document.getElementById('create-form-container')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // QR Template Auto-fill (Phase 9)
  const templates = {
    biz_card: () => {
      setCreateType('contact');
      setTimeout(() => {
        const n = document.getElementById('vcard-name'); if (n) n.value = 'John Doe';
        const p = document.getElementById('vcard-phone'); if (p) p.value = '+1 555-0199';
        const e = document.getElementById('vcard-email'); if (e) e.value = 'john@business.com';
        const o = document.getElementById('vcard-org'); if (o) o.value = 'Acme Corp';
        showToast('Template: Business Card loaded');
      }, 50);
    },
    home_wifi: () => {
      setCreateType('wifi');
      setTimeout(() => {
        const s = document.getElementById('wifi-ssid'); if (s) s.value = 'Home_5G_Network';
        const p = document.getElementById('wifi-pass'); if (p) p.value = 'GuestPass2026';
        showToast('Template: Home Wi-Fi loaded');
      }, 50);
    },
    multilink_hub: () => {
      setCreateType('multilink');
      setTimeout(() => {
        const t = document.getElementById('ml-title'); if (t) t.value = 'My Portfolio & Socials';
        const l1 = document.getElementById('ml-link1'); if (l1) l1.value = 'https://github.com';
        const l2 = document.getElementById('ml-link2'); if (l2) l2.value = 'https://t.me';
        const l3 = document.getElementById('ml-link3'); if (l3) l3.value = 'https://youtube.com';
        showToast('Template: Multi-Link Hub loaded');
      }, 50);
    },
    whatsapp_chat: () => {
      setCreateType('link');
      setTimeout(() => {
        const i = document.getElementById('field-primary-input');
        if (i) i.value = 'https://wa.me/1234567890?text=Hello%20there!';
        showToast('Template: WhatsApp loaded');
      }, 50);
    },
    telegram_channel: () => {
      setCreateType('link');
      setTimeout(() => {
        const i = document.getElementById('field-primary-input');
        if (i) i.value = 'https://t.me/AXQRStudio';
        showToast('Template: Telegram Channel loaded');
      }, 50);
    },
    event_rsvp: () => {
      setCreateType('event');
      setTimeout(() => {
        const t = document.getElementById('event-title'); if (t) t.value = 'Studio Product Launch';
        const d = document.getElementById('event-desc'); if (d) d.value = 'Convention Hall 4B & Livestream';
        showToast('Template: Event RSVP loaded');
      }, 50);
    }
  };

  document.querySelectorAll('.template-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-template');
      if (templates[key]) templates[key]();
    });
  });

  // Generate Button on Create Screen
  const btnGenerateCreate = document.getElementById('btn-generate-create');
  if (btnGenerateCreate) {
    btnGenerateCreate.addEventListener('click', () => {
      let finalData = '';
      if (currentCreateType === 'wifi') {
        const ssid = document.getElementById('wifi-ssid')?.value.trim() || 'WiFi';
        const pass = document.getElementById('wifi-pass')?.value.trim() || '';
        const enc = document.getElementById('wifi-type')?.value || 'WPA';
        finalData = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
      } else if (currentCreateType === 'contact') {
        const name = document.getElementById('vcard-name')?.value.trim() || 'Alex Morgan';
        const phone = document.getElementById('vcard-phone')?.value.trim() || '';
        const email = document.getElementById('vcard-email')?.value.trim() || '';
        const org = document.getElementById('vcard-org')?.value.trim() || '';
        finalData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
      } else if (currentCreateType === 'email') {
        const addr = document.getElementById('email-addr')?.value.trim() || '';
        const sub = encodeURIComponent(document.getElementById('email-subject')?.value.trim() || '');
        const body = encodeURIComponent(document.getElementById('email-body')?.value.trim() || '');
        finalData = `mailto:${addr}?subject=${sub}&body=${body}`;
      } else if (currentCreateType === 'phone') {
        const p = document.getElementById('field-primary-input')?.value.trim() || '';
        finalData = `tel:${p}`;
      } else if (currentCreateType === 'sms') {
        const p = document.getElementById('sms-phone')?.value.trim() || '';
        const b = encodeURIComponent(document.getElementById('sms-body')?.value.trim() || '');
        finalData = `smsto:${p}:${b}`;
      } else if (currentCreateType === 'location') {
        const lat = document.getElementById('geo-lat')?.value.trim() || '23.8103';
        const lng = document.getElementById('geo-lng')?.value.trim() || '90.4125';
        finalData = `geo:${lat},${lng}`;
      } else if (currentCreateType === 'multilink') {
        const title = document.getElementById('ml-title')?.value.trim() || 'Hub';
        const l1 = document.getElementById('ml-link1')?.value.trim();
        const l2 = document.getElementById('ml-link2')?.value.trim();
        const l3 = document.getElementById('ml-link3')?.value.trim();
        const hubHtml = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><style>body{margin:0;font-family:sans-serif;background:#0b0f19;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;text-align:center}.box{max-width:360px;width:100%}a{display:block;background:#1e293b;color:#38bdf8;padding:12px;border-radius:14px;margin-bottom:10px;text-decoration:none;font-weight:700}</style></head><body><div class="box"><h2>${title}</h2>${l1?`<a href="${l1}">${l1}</a>`:''}${l2?`<a href="${l2}">${l2}</a>`:''}${l3?`<a href="${l3}">${l3}</a>`:''}</div></body></html>`;
        finalData = 'data:text/html;charset=utf-8,' + encodeURIComponent(hubHtml);
      } else if (currentCreateType === 'event') {
        const sum = document.getElementById('event-title')?.value.trim() || 'Event';
        const desc = document.getElementById('event-desc')?.value.trim() || '';
        finalData = `BEGIN:VEVENT\nSUMMARY:${sum}\nDESCRIPTION:${desc}\nEND:VEVENT`;
      } else {
        finalData = document.getElementById('field-primary-input')?.value.trim() || 'https://axqrstudio.app';
      }

      state.url = finalData;
      if (inputUrl) inputUrl.value = finalData;
      renderQR();
      recordHistory('QR', typeConfig[currentCreateType]?.title || 'QR Code');
      switchScreen('screen-home');
      showToast('✅ ' + (state.settings.language === 'bn' ? 'কিউআর কোড তৈরি হয়েছে!' : 'QR Code Generated!'));
    });
  }

  // ==================== REAL-TIME CAMERA SCANNER ====================
  let html5QrScanner = null;
  let isTorchOn = false;
  let activeCameraTrack = null;
  let isZoomed = false;
  let lastScannedText = null;
  let lastScanTimestamp = 0;
  let isScanningActive = false;

  const scanResultCard = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanTypeBadge = document.getElementById('scan-type-badge');
  const scanUrlWarning = document.getElementById('scan-url-warning');
  let pendingOpenUrl = null;

  async function stopCameraScanner() {
    isScanningActive = false;
    if (activeCameraTrack) {
      try { activeCameraTrack.stop(); } catch (e) {}
      activeCameraTrack = null;
    }
    isTorchOn = false;

    if (html5QrScanner) {
      try {
        if (html5QrScanner.isScanning) {
          await html5QrScanner.stop();
        }
      } catch (e) {}
      try {
        html5QrScanner.clear();
      } catch (e) {}
      html5QrScanner = null;
    }
  }

  async function startCameraScanner() {
    if (isScanningActive) return;
    await stopCameraScanner();

    const readerEl = document.getElementById('reader');
    if (!readerEl) return;
    readerEl.innerHTML = '';

    try {
      html5QrScanner = new Html5Qrcode('reader');
      isScanningActive = true;

      const qrSuccessCallback = (decodedText) => {
        const now = Date.now();
        if (decodedText === lastScannedText && (now - lastScanTimestamp) < 2500) {
          return;
        }
        lastScannedText = decodedText;
        lastScanTimestamp = now;

        playScanBeep();
        triggerVibrate(100);
        handleScannedData(decodedText);
      };

      const config = {
        fps: 15,
        qrbox: (w, h) => {
          const edge = Math.floor(Math.min(w, h) * 0.75);
          return { width: edge, height: edge };
        },
        aspectRatio: 1.0,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        }
      };

      await html5QrScanner.start(
        { facingMode: 'environment' },
        config,
        qrSuccessCallback
      );

      // Extract active video track for torch/zoom
      setTimeout(() => {
        const videoEl = document.querySelector('#reader video');
        if (videoEl && videoEl.srcObject) {
          activeCameraTrack = videoEl.srcObject.getVideoTracks()[0];
        }
      }, 500);

    } catch (err) {
      isScanningActive = false;
      showToast('Camera: ' + (err.message || 'Permission required'));
    }
  }

  document.getElementById('btn-restart-camera')?.addEventListener('click', () => {
    showToast('Restarting camera...');
    startCameraScanner();
  });

  // Torch Toggle
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
      showToast('Flashlight not supported on this device');
    }
  });

  // Zoom Toggle (Phase 6: Zoom controls)
  document.getElementById('btn-toggle-zoom')?.addEventListener('click', async () => {
    if (!activeCameraTrack) return;
    try {
      const caps = activeCameraTrack.getCapabilities ? activeCameraTrack.getCapabilities() : {};
      if (caps.zoom) {
        isZoomed = !isZoomed;
        const targetZoom = isZoomed ? Math.min(2.0, caps.zoom.max || 2.0) : 1.0;
        await activeCameraTrack.applyConstraints({ advanced: [{ zoom: targetZoom }] });
        const label = document.getElementById('zoom-label');
        if (label) label.textContent = isZoomed ? '2x' : '1x';
        showToast(`Zoom: ${isZoomed ? '2x' : '1x'}`);
      } else {
        showToast('Digital zoom not supported');
      }
    } catch {
      showToast('Zoom control unavailable');
    }
  });

  // ==================== GALLERY IMAGE DECODER (DUAL ENGINE: jsQR + Html5Qrcode) ====================
  const scanGalleryInput = document.getElementById('scan-gallery-input');

  function triggerGalleryPicker() {
    if (scanGalleryInput) {
      scanGalleryInput.value = '';
      scanGalleryInput.click();
    }
  }

  document.getElementById('btn-scan-gallery')?.addEventListener('click', triggerGalleryPicker);
  document.getElementById('btn-scan-gallery-top')?.addEventListener('click', triggerGalleryPicker);
  document.getElementById('btn-scan-gallery-home')?.addEventListener('click', triggerGalleryPicker);

  if (scanGalleryInput) {
    scanGalleryInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      showToast(state.settings.language === 'bn' ? 'ছবি ডিকোড করা হচ্ছে...' : 'Decoding QR Image...');

      try {
        let decodedText = null;

        // Primary Engine: jsQR via HTML5 Canvas
        if (window.jsQR) {
          decodedText = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imgData.data, imgData.width, imgData.height, {
                inversionAttempts: 'dontInvert'
              });
              resolve(code ? code.data : null);
            };
            img.onerror = () => resolve(null);
            img.src = URL.createObjectURL(file);
          });
        }

        // Secondary Fallback: Html5Qrcode file scan
        if (!decodedText) {
          const tempScanner = new Html5Qrcode('reader');
          decodedText = await tempScanner.scanFile(file, false);
        }

        if (decodedText) {
          playScanBeep();
          triggerVibrate(100);
          switchScreen('screen-scan');
          handleScannedData(decodedText);
          showToast('✅ ' + (state.settings.language === 'bn' ? 'গ্যালারি থেকে কিউআর কোড পাওয়া গেছে!' : 'QR Code Found in Image!'));
        } else {
          showToast(state.settings.language === 'bn' ? 'কোনো কিউআর কোড পাওয়া যায়নি' : 'No QR code found in selected image');
        }
      } catch (err) {
        showToast(state.settings.language === 'bn' ? 'কোনো কিউআর কোড পাওয়া যায়নি' : 'No QR code found in selected image');
      } finally {
        scanGalleryInput.value = '';
      }
    });
  }

  // Handle Scanned Result Data
  function handleScannedData(text) {
    if (scanResultCard) {
      scanResultCard.classList.remove('hidden');
      scanResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (scanResultText) scanResultText.textContent = text;
    pendingOpenUrl = text;

    // Detect QR Type Badge
    let typeName = 'TEXT';
    if (/^https?:\/\//i.test(text)) {
      typeName = 'URL';
    } else if (text.startsWith('WIFI:')) {
      typeName = 'WI-FI';
    } else if (text.startsWith('BEGIN:VCARD')) {
      typeName = 'CONTACT';
    } else if (text.startsWith('mailto:')) {
      typeName = 'EMAIL';
    } else if (text.startsWith('tel:')) {
      typeName = 'PHONE';
    } else if (text.startsWith('geo:')) {
      typeName = 'MAP';
    }
    if (scanTypeBadge) scanTypeBadge.textContent = typeName;

    // URL Safety Check (Phase 6)
    if (scanUrlWarning) {
      const isSus = /^[0-9.]+$|^[a-z0-9]+\.(xyz|top|work|click|country|gq|cf|ml)$/i.test(text.replace(/^https?:\/\//i, '').split('/')[0]);
      scanUrlWarning.classList.toggle('hidden', !isSus);
      scanUrlWarning.classList.toggle('flex', isSus);
    }

    // Auto-save Scanned to History
    if (state.settings.autoSaveHistory) {
      const now = new Date();
      state.history.unshift({
        id: Date.now(),
        title: 'Scanned ' + typeName,
        data: text,
        format: 'SCAN',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.getTime(),
        favorite: false
      });
      if (state.history.length > 100) state.history.pop();
      saveHistory();
    }
  }

  // Scan Action Buttons: Open, Copy, Share, Edit
  document.getElementById('btn-scan-open')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (state.settings.linkConfirm && /^https?:\/\//i.test(pendingOpenUrl)) {
      if (!confirm(`Open external link:\n${pendingOpenUrl}?`)) return;
    }
    window.open(pendingOpenUrl, '_blank');
  });

  document.getElementById('btn-scan-copy')?.addEventListener('click', () => {
    if (pendingOpenUrl) copyToClipboard(pendingOpenUrl);
  });

  document.getElementById('btn-scan-share')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (isAndroid() && window.AndroidBridge.shareText) {
      window.AndroidBridge.shareText(pendingOpenUrl, 'Scanned QR Code');
    } else if (navigator.share) {
      navigator.share({ title: 'Scanned Code', text: pendingOpenUrl }).catch(() => {});
    } else {
      copyToClipboard(pendingOpenUrl);
    }
  });

  document.getElementById('btn-scan-recreate')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    state.url = pendingOpenUrl;
    if (inputUrl) inputUrl.value = pendingOpenUrl;
    renderQR();
    switchScreen('screen-home');
    showToast('Loaded into generator!');
  });

  // ==================== HISTORY, SEARCH, FILTERS & FAVORITES ====================
  const historyItemsList = document.getElementById('history-items');

  function renderHistoryItems(searchQuery = '') {
    if (!historyItemsList) return;
    historyItemsList.innerHTML = '';

    let items = state.history;
    if (state.historyFilter === 'generated') {
      items = items.filter(h => h.format !== 'SCAN');
    } else if (state.historyFilter === 'scanned') {
      items = items.filter(h => h.format === 'SCAN');
    } else if (state.historyFilter === 'favorites') {
      items = items.filter(h => h.favorite || state.favorites.includes(h.data));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(h => (h.data || '').toLowerCase().includes(q) || (h.title || '').toLowerCase().includes(q));
    }

    if (items.length === 0) {
      historyItemsList.innerHTML = `
        <div class="text-center py-12 text-slate-400">
          <i data-lucide="archive-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
          <p class="text-xs font-semibold">No records found</p>
        </div>
      `;
      refreshIcons();
      return;
    }

    items.forEach(item => {
      const isFav = item.favorite || state.favorites.includes(item.data);
      const card = document.createElement('div');
      card.className = 'p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-xs space-x-2';
      card.innerHTML = `
        <div class="flex items-center space-x-3 overflow-hidden flex-1">
          <div class="w-9 h-9 rounded-xl ${item.format === 'SCAN' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'} font-extrabold text-[11px] flex items-center justify-center shrink-0">
            ${item.format === 'SCAN' ? '<i data-lucide="scan" class="w-4 h-4"></i>' : '<i data-lucide="qr-code" class="w-4 h-4"></i>'}
          </div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.title}</h4>
            <p class="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 truncate">${item.data}</p>
            <span class="text-[9px] text-slate-400 font-medium">${item.date} • ${item.time}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 shrink-0">
          <button class="btn-history-fav p-2 rounded-xl ${isFav ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}" data-id="${item.id}" title="Favorite">
            <i data-lucide="star" class="w-4 h-4" ${isFav ? 'style="fill:#f59e0b;"' : ''}></i>
          </button>
          <button class="btn-history-load p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl" data-id="${item.id}" title="Reopen">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </button>
          <button class="btn-history-del p-2 text-slate-400 hover:text-rose-500 rounded-xl" data-id="${item.id}" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      historyItemsList.appendChild(card);
    });
    refreshIcons();

    // Bind Favorite Toggle
    historyItemsList.querySelectorAll('.btn-history-fav').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = state.history.find(h => h.id === id);
        if (item) {
          item.favorite = !item.favorite;
          if (item.favorite) {
            if (!state.favorites.includes(item.data)) state.favorites.push(item.data);
          } else {
            const idx = state.favorites.indexOf(item.data);
            if (idx > -1) state.favorites.splice(idx, 1);
          }
          saveHistory();
          renderHistoryItems(document.getElementById('history-search')?.value || '');
          updateLiveFavoriteButton();
        }
      });
    });

    // Bind Reopen in Generator
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

    // Bind Delete
    historyItemsList.querySelectorAll('.btn-history-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        state.history = state.history.filter(h => h.id !== id);
        saveHistory();
        renderHistoryItems(document.getElementById('history-search')?.value || '');
        showToast('Deleted from history');
      });
    });
  }

  // History Filter Pills
  document.querySelectorAll('.history-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.history-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.historyFilter = pill.getAttribute('data-filter') || 'all';
      renderHistoryItems(document.getElementById('history-search')?.value || '');
    });
  });

  document.getElementById('history-search')?.addEventListener('input', (e) => {
    renderHistoryItems(e.target.value);
  });

  // Export History (CSV / JSON)
  document.getElementById('btn-export-history')?.addEventListener('click', () => {
    if (state.history.length === 0) {
      showToast('No history records to export');
      return;
    }
    let csv = 'ID,Title,Format,Date,Time,Content\n';
    state.history.forEach(h => {
      const row = [h.id, `"${(h.title || '').replace(/"/g, '""')}"`, h.format, h.date, h.time, `"${(h.data || '').replace(/"/g, '""')}"`];
      csv += row.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const fname = `AX_QR_History_${Date.now()}.csv`;
    if (isAndroid() && window.AndroidBridge.downloadFile) {
      window.AndroidBridge.downloadFile(btoa(csv), fname, 'text/csv');
      showToast('✅ History exported to CSV!');
    } else {
      triggerBlobDownload(blob, fname);
      showToast('✅ History exported to CSV!');
    }
  });

  // Clear All History
  const clearHistoryHandler = () => {
    if (confirm(state.settings.language === 'bn' ? 'সব ইতিহাস স্থায়ীভাবে মুছে ফেলবেন?' : 'Permanently clear all history records?')) {
      state.history = [];
      saveHistory();
      renderHistoryItems();
      showToast(state.settings.language === 'bn' ? 'সব ইতিহাস মুছে ফেলা হয়েছে' : 'History cleared!');
    }
  };
  document.getElementById('btn-clear-history-top')?.addEventListener('click', clearHistoryHandler);
  document.getElementById('row-clear-history')?.addEventListener('click', clearHistoryHandler);

  // ==================== BATCH QR GENERATOR (Phase 9) ====================
  const modalBatch = document.getElementById('modal-batch-generator');
  const btnOpenBatchHome = document.getElementById('btn-open-batch-home');
  const btnOpenBatchCreate = document.getElementById('btn-open-batch-create');
  const rowBatchSettings = document.getElementById('row-batch-generator');
  const btnCloseBatch = document.getElementById('btn-close-batch');
  const batchCsvTextarea = document.getElementById('batch-csv-textarea');
  const batchProgressBox = document.getElementById('batch-progress-box');
  const batchProgressBar = document.getElementById('batch-progress-bar');
  const batchProgressLabel = document.getElementById('batch-progress-label');
  const batchProgressPercent = document.getElementById('batch-progress-percent');
  const batchCsvInput = document.getElementById('batch-csv-input');

  const openBatchModal = () => modalBatch?.classList.remove('hidden');
  const closeBatchModal = () => modalBatch?.classList.add('hidden');

  btnOpenBatchHome?.addEventListener('click', openBatchModal);
  btnOpenBatchCreate?.addEventListener('click', openBatchModal);
  rowBatchSettings?.addEventListener('click', openBatchModal);
  btnCloseBatch?.addEventListener('click', closeBatchModal);

  document.getElementById('btn-sample-csv')?.addEventListener('click', () => {
    if (batchCsvTextarea) {
      batchCsvTextarea.value = `Title,Data\nGoogle Search,https://google.com\nStudio Website,https://axqrstudio.app\nOffice Guest WiFi,WIFI:S:Guest;T:WPA;P:guest2026;;\nCustomer Support,mailto:support@axqrstudio.app\nSales Hotline,tel:+18005550199`;
      showToast('Sample CSV Loaded');
    }
  });

  document.getElementById('btn-import-csv')?.addEventListener('click', () => {
    if (batchCsvInput) {
      batchCsvInput.value = '';
      batchCsvInput.click();
    }
  });

  if (batchCsvInput) {
    batchCsvInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (batchCsvTextarea) batchCsvTextarea.value = evt.target.result;
        showToast('CSV file loaded');
      };
      reader.readAsText(file);
    });
  }

  // Start Batch Generation
  document.getElementById('btn-start-batch')?.addEventListener('click', async () => {
    const raw = batchCsvTextarea?.value.trim();
    if (!raw) {
      showToast('Please enter or upload CSV rows first');
      return;
    }

    if (!window.JSZip) {
      showToast('JSZip engine not available');
      return;
    }

    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    const rows = [];
    lines.forEach((line, idx) => {
      // Skip header if detected
      if (idx === 0 && line.toLowerCase().includes('data') && (line.toLowerCase().includes('title') || line.toLowerCase().includes('content'))) {
        return;
      }
      const parts = line.split(',');
      if (parts.length >= 2) {
        rows.push({ title: parts[0].trim(), data: parts.slice(1).join(',').trim() });
      } else {
        rows.push({ title: `QR_${idx + 1}`, data: parts[0].trim() });
      }
    });

    if (rows.length === 0) {
      showToast('No valid rows found');
      return;
    }

    if (batchProgressBox) batchProgressBox.classList.remove('hidden');
    const zip = new JSZip();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const pct = Math.round(((i + 1) / rows.length) * 100);
      if (batchProgressBar) batchProgressBar.style.width = pct + '%';
      if (batchProgressPercent) batchProgressPercent.textContent = pct + '%';
      if (batchProgressLabel) batchProgressLabel.textContent = `Generating ${i + 1} of ${rows.length}...`;

      try {
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1000px;height:1000px;';
        document.body.appendChild(tempDiv);

        const config = {
          width: 1000,
          height: 1000,
          type: 'canvas',
          data: row.data,
          margin: 10,
          qrOptions: { errorCorrectionLevel: 'Q' },
          dotsOptions: { type: state.dotsType, color: state.qrColor },
          cornersSquareOptions: { type: state.cornerSquareType, color: state.qrColor },
          cornersDotOptions: { type: state.cornerDotType, color: state.qrColor },
          backgroundOptions: { color: state.bgColor }
        };

        const inst = new QRCodeStyling(config);
        inst.append(tempDiv);
        await new Promise(r => setTimeout(r, 40));

        let blob = null;
        if (typeof inst.getRawData === 'function') {
          blob = await inst.getRawData('png').catch(() => null);
        }
        if (!blob) {
          const canvas = tempDiv.querySelector('canvas');
          if (canvas) blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        }

        if (blob) {
          const safeName = (row.title || `QR_${i + 1}`).replace(/[^a-z0-9_-]/gi, '_');
          zip.file(`${safeName}.png`, blob);
        }

        if (tempDiv.parentNode) tempDiv.parentNode.removeChild(tempDiv);
      } catch (err) {
        console.warn('Batch item error:', err);
      }
    }

    if (batchProgressLabel) batchProgressLabel.textContent = 'Packaging ZIP...';
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipFname = `AX_QR_Batch_${Date.now()}.zip`;

    if (isAndroid() && window.AndroidBridge.downloadFile) {
      const base64 = await blobToBase64(zipBlob);
      window.AndroidBridge.downloadFile(base64, zipFname, 'application/zip');
      showToast('✅ Batch ZIP Generated & Saved!');
    } else {
      triggerBlobDownload(zipBlob, zipFname);
      showToast('✅ Batch ZIP Generated & Saved!');
    }

    setTimeout(() => {
      if (batchProgressBox) batchProgressBox.classList.add('hidden');
      closeBatchModal();
    }, 1200);
  });

  // ==================== SETTINGS & MODALS ====================
  document.getElementById('theme-card-light')?.addEventListener('click', () => applyTheme('light'));
  document.getElementById('theme-card-dark')?.addEventListener('click', () => applyTheme('dark'));
  document.getElementById('theme-card-system')?.addEventListener('click', () => applyTheme('system'));

  // Default Quality Pills in Settings
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

  // Toggles
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

  // ==================== DEFAULT QR STYLE MODAL ====================
  const modalPrefStyle = document.getElementById('modal-pref-style');
  const btnCloseStyleModal = document.getElementById('btn-close-style-modal');

  document.getElementById('row-pref-style')?.addEventListener('click', () => {
    applyStyleConfig(state.settings.defaultStyle || 'Rounded');
    modalPrefStyle?.classList.remove('hidden');
  });

  btnCloseStyleModal?.addEventListener('click', () => modalPrefStyle?.classList.add('hidden'));
  modalPrefStyle?.addEventListener('click', (e) => {
    if (e.target === modalPrefStyle) modalPrefStyle.classList.add('hidden');
  });

  document.querySelectorAll('.style-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const styleName = btn.getAttribute('data-style-name') || 'Rounded';
      applyStyleConfig(styleName);
      saveSettings();
      renderQR();
      modalPrefStyle?.classList.add('hidden');
      showToast(`Default Style: ${styleName}`);
    });
  });

  // ==================== DEFAULT QR COLORS MODAL ====================
  const modalPrefColors = document.getElementById('modal-pref-colors');
  const btnCloseColorsModal = document.getElementById('btn-close-colors-modal');
  const pickerFg = document.getElementById('picker-fg-color');
  const inputFgHex = document.getElementById('input-fg-hex');
  const labelFgHex = document.getElementById('label-fg-hex');
  const pickerBg = document.getElementById('picker-bg-color');
  const inputBgHex = document.getElementById('input-bg-hex');
  const labelBgHex = document.getElementById('label-bg-hex');
  const btnResetColors = document.getElementById('btn-reset-colors');
  const btnApplyColors = document.getElementById('btn-apply-colors');

  let tempFg = state.qrColor || '#6366f1';
  let tempBg = state.bgColor || '#ffffff';

  function syncModalColorInputs(fg, bg) {
    tempFg = fg;
    tempBg = bg;
    if (pickerFg) pickerFg.value = tempFg;
    if (inputFgHex) inputFgHex.value = tempFg.toUpperCase();
    if (labelFgHex) labelFgHex.textContent = tempFg.toUpperCase();
    if (pickerBg) pickerBg.value = tempBg;
    if (inputBgHex) inputBgHex.value = tempBg.toUpperCase();
    if (labelBgHex) labelBgHex.textContent = tempBg.toUpperCase();
    updateMiniColorPreview(tempFg, tempBg);
  }

  const openColorsModal = () => {
    syncModalColorInputs(state.qrColor || '#6366f1', state.bgColor || '#ffffff');
    modalPrefColors?.classList.remove('hidden');
  };

  document.getElementById('row-pref-colors')?.addEventListener('click', openColorsModal);
  document.getElementById('btn-open-colors-modal-quick')?.addEventListener('click', openColorsModal);
  btnCloseColorsModal?.addEventListener('click', () => modalPrefColors?.classList.add('hidden'));
  modalPrefColors?.addEventListener('click', (e) => {
    if (e.target === modalPrefColors) modalPrefColors.classList.add('hidden');
  });

  pickerFg?.addEventListener('input', (e) => {
    tempFg = e.target.value;
    if (inputFgHex) inputFgHex.value = tempFg.toUpperCase();
    if (labelFgHex) labelFgHex.textContent = tempFg.toUpperCase();
    updateMiniColorPreview(tempFg, tempBg);
  });

  inputFgHex?.addEventListener('input', (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      tempFg = val;
      if (pickerFg) pickerFg.value = tempFg;
      if (labelFgHex) labelFgHex.textContent = tempFg.toUpperCase();
      updateMiniColorPreview(tempFg, tempBg);
    }
  });

  document.querySelectorAll('.color-preset-fg').forEach(btn => {
    btn.addEventListener('click', () => {
      tempFg = btn.getAttribute('data-color') || '#6366f1';
      if (pickerFg) pickerFg.value = tempFg;
      if (inputFgHex) inputFgHex.value = tempFg.toUpperCase();
      if (labelFgHex) labelFgHex.textContent = tempFg.toUpperCase();
      updateMiniColorPreview(tempFg, tempBg);
    });
  });

  pickerBg?.addEventListener('input', (e) => {
    tempBg = e.target.value;
    if (inputBgHex) inputBgHex.value = tempBg.toUpperCase();
    if (labelBgHex) labelBgHex.textContent = tempBg.toUpperCase();
    updateMiniColorPreview(tempFg, tempBg);
  });

  inputBgHex?.addEventListener('input', (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      tempBg = val;
      if (pickerBg) pickerBg.value = tempBg;
      if (labelBgHex) labelBgHex.textContent = tempBg.toUpperCase();
      updateMiniColorPreview(tempFg, tempBg);
    }
  });

  document.querySelectorAll('.color-preset-bg').forEach(btn => {
    btn.addEventListener('click', () => {
      tempBg = btn.getAttribute('data-color') || '#ffffff';
      if (pickerBg) pickerBg.value = tempBg;
      if (inputBgHex) inputBgHex.value = tempBg.toUpperCase();
      if (labelBgHex) labelBgHex.textContent = tempBg.toUpperCase();
      updateMiniColorPreview(tempFg, tempBg);
    });
  });

  btnResetColors?.addEventListener('click', () => {
    syncModalColorInputs('#6366f1', '#ffffff');
    showToast('Reset to default colors');
  });

  btnApplyColors?.addEventListener('click', () => {
    applyColorConfig(tempFg, tempBg);
    saveSettings();
    renderQR();
    modalPrefColors?.classList.add('hidden');
    showToast('Colors Applied!');
  });

  // ==================== NOTIFICATIONS & PERMISSIONS ====================
  const modalNotifications = document.getElementById('modal-notifications');
  document.getElementById('row-notifications')?.addEventListener('click', () => modalNotifications?.classList.remove('hidden'));
  document.getElementById('btn-close-notifications')?.addEventListener('click', () => modalNotifications?.classList.add('hidden'));

  document.getElementById('btn-req-notif-perm')?.addEventListener('click', () => {
    showToast('✅ Notifications active & ready');
  });

  // ==================== PRIVACY & SAFE DATA CLEARING (Phase 7) ====================
  const modalPrivacy = document.getElementById('modal-privacy');
  document.getElementById('row-privacy-security')?.addEventListener('click', () => modalPrivacy?.classList.remove('hidden'));
  document.getElementById('btn-close-privacy-modal')?.addEventListener('click', () => modalPrivacy?.classList.add('hidden'));

  document.getElementById('btn-clear-history-only')?.addEventListener('click', () => {
    if (confirm('Clear only history records? Settings and preferences will remain.')) {
      state.history = [];
      saveHistory();
      renderHistoryItems();
      showToast('History records cleared');
    }
  });

  document.getElementById('btn-reset-settings-only')?.addEventListener('click', () => {
    if (confirm('Reset only settings to default? History records will remain.')) {
      state.settings = {
        theme: 'dark',
        defaultQuality: 1000,
        defaultStyle: 'Rounded',
        defaultPrimaryColor: '#6366f1',
        defaultBgColor: '#ffffff',
        addLogoDefault: false,
        saveToGallery: true,
        autoSaveHistory: true,
        scanBeep: true,
        scanVibrate: true,
        linkConfirm: true,
        notifScan: true,
        notifSave: true,
        language: 'en'
      };
      saveSettings();
      applyStyleConfig('Rounded');
      applyColorConfig('#6366f1', '#ffffff');
      applyTheme('dark');
      applyLanguage('en');
      showToast('Settings reset to default');
    }
  });

  document.getElementById('btn-clear-cache')?.addEventListener('click', () => {
    if (confirm('Clear ALL app data, cache, and history?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // ==================== LANGUAGE MODAL ====================
  const modalLanguage = document.getElementById('modal-language');
  document.getElementById('row-language')?.addEventListener('click', () => modalLanguage?.classList.remove('hidden'));
  document.getElementById('btn-close-lang')?.addEventListener('click', () => modalLanguage?.classList.add('hidden'));

  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      applyLanguage(selected);
      modalLanguage?.classList.add('hidden');
      showToast(selected === 'bn' ? 'ভাষা: বাংলা' : 'Language: English');
    });
  });

  // Help & About Modals
  const modalHelp = document.getElementById('modal-help-support');
  document.getElementById('row-help-support')?.addEventListener('click', () => modalHelp?.classList.remove('hidden'));
  document.getElementById('btn-close-help')?.addEventListener('click', () => modalHelp?.classList.add('hidden'));

  const modalAbout = document.getElementById('modal-about');
  document.getElementById('row-about')?.addEventListener('click', () => modalAbout?.classList.remove('hidden'));
  document.getElementById('btn-close-about')?.addEventListener('click', () => modalAbout?.classList.add('hidden'));

  // Initialize Language
  applyLanguage(state.settings.language || 'en');
});
