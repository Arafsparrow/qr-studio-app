/**
 * AX QR Studio — Powered by ArafSparrow
 * Comprehensive Engine: Native AndroidBridge, Multi-Type Generator,
 * Camera Scanner & Gallery Decoder, History Filters, Notifications & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Native Android Bridge Detector
  const isAndroid = () => !!(window.AndroidBridge && typeof window.AndroidBridge.isNative === 'function' && window.AndroidBridge.isNative());

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
      defaultStyle: 'Rounded',
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
    historyFilter: 'all'
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
  let debounceTimer = null;

  // Audio Context for Beep Sound
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

  // Unlock audio on first touch/click
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
    }, 2400);
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

  applyTheme(state.settings.theme || 'light');

  // DOM Elements
  const inputUrl = document.getElementById('input-url');
  const btnPaste = document.getElementById('btn-paste');
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');

  // Navigation Tabs
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');
  const btnFloatingScan = document.getElementById('btn-floating-scan');

  function getCleanUrl(url) {
    let raw = (url || state.url || '').trim();
    if (!raw) return 'https://t.me/ArafSparrow';
    if (!/^https?:\/\//i.test(raw) && !raw.startsWith('mailto:') && !raw.startsWith('tel:') && !raw.startsWith('sms:') && !raw.startsWith('geo:') && !raw.startsWith('WIFI:') && !raw.startsWith('BEGIN:VCARD') && !raw.startsWith('data:')) {
      return 'https://' + raw;
    }
    return raw;
  }

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

  function getQrCanvas() {
    return qrCanvasWrapper?.querySelector('canvas') || null;
  }

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
    const config = {
      width: 270,
      height: 270,
      type: 'canvas',
      data: finalData,
      margin: 8,
      qrOptions: { errorCorrectionLevel: state.errorCorrection },
      image: state.logoUrl || undefined,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 5, crossOrigin: 'anonymous' },
      dotsOptions: { type: state.dotsType, color: state.qrColor },
      cornersSquareOptions: { type: state.cornerSquareType, color: state.qrColor },
      cornersDotOptions: { type: state.cornerDotType, color: state.qrColor },
      backgroundOptions: { color: state.bgColor }
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
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchScreen(tab.getAttribute('data-screen')));
  });

  if (btnFloatingScan) {
    btnFloatingScan.addEventListener('click', () => switchScreen('screen-scan'));
  }

  // Home Screen Quick Type Pills
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
        inputUrl.placeholder = 'Enter URL or link here...';
        inputUrl.value = 'https://t.me/ArafSparrow';
      } else if (t === 'text') {
        inputUrl.placeholder = 'Enter plain text content...';
        inputUrl.value = 'Hello from AX QR Studio!';
      } else if (t === 'wifi') {
        inputUrl.placeholder = 'WIFI:S:NetworkName;T:WPA;P:password;;';
        inputUrl.value = 'WIFI:S:AX_Studio_WiFi;T:WPA;P:securepassword;;';
      } else if (t === 'contact') {
        inputUrl.placeholder = 'BEGIN:VCARD...';
        inputUrl.value = 'BEGIN:VCARD\nVERSION:3.0\nN:ArafSparrow\nTEL:+123456789\nEMAIL:cjaraf162@gmail.com\nEND:VCARD';
      }
      state.url = inputUrl.value;
      renderQR();
    });
  });

  // URL Input Events with Debounce for High Performance
  if (inputUrl) {
    inputUrl.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.url = e.target.value;
        renderQR();
      }, 140);
    });
  }

  // QR Style Selector Cards (Default, Rounded, Dots, Classy, Extra)
  document.querySelectorAll('.qr-style-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.qr-style-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const s = card.getAttribute('data-style');
      if (s === 'square') {
        state.dotsType = 'square';
        state.cornerSquareType = 'square';
        state.cornerDotType = 'square';
      } else if (s === 'rounded') {
        state.dotsType = 'rounded';
        state.cornerSquareType = 'extra-rounded';
        state.cornerDotType = 'dot';
      } else if (s === 'dots') {
        state.dotsType = 'dots';
        state.cornerSquareType = 'dot';
        state.cornerDotType = 'dot';
      } else if (s === 'classy') {
        state.dotsType = 'classy';
        state.cornerSquareType = 'extra-rounded';
        state.cornerDotType = 'classy';
      } else if (s === 'extra-rounded') {
        state.dotsType = 'extra-rounded';
        state.cornerSquareType = 'extra-rounded';
        state.cornerDotType = 'dot';
      }
      renderQR();
    });
  });

  // Clipboard Helpers
  async function copyToClipboard(text, successMsg) {
    try {
      if (isAndroid() && window.AndroidBridge.copyToClipboard) {
        window.AndroidBridge.copyToClipboard(text);
        showToast(successMsg || '✅ Copied to clipboard!');
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg || '✅ Copied to clipboard!');
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(successMsg || '✅ Copied to clipboard!');
      }
    } catch (e) {
      showToast('❌ Clipboard access denied');
    }
  }

  if (btnPaste) {
    btnPaste.addEventListener('click', async () => {
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
          showToast('✅ Pasted from clipboard!');
        } else {
          showToast('Clipboard is empty');
        }
      } catch {
        showToast('Long-press the field to paste');
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
  function saveCurrentToHistory(format, titleOverride = null) {
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
      stateSnapshot: JSON.parse(JSON.stringify(state))
    };
    state.history.unshift(item);
    if (state.history.length > 50) state.history.pop();
    try {
      localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history));
    } catch (e) {}
  }

  // ==================== DOWNLOAD PNG ====================
  const btnDownloadPng = document.getElementById('btn-download-png');
  if (btnDownloadPng) {
    btnDownloadPng.addEventListener('click', async () => {
      showToast('Generating HD PNG...');
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
        if (!blob) throw new Error('Could not render PNG');

        if (state.settings.saveToGallery && isAndroid()) {
          const base64 = await blobToBase64(blob);
          const res = JSON.parse(window.AndroidBridge.saveImageToGallery(base64, fname) || '{}');
          if (res.success) {
            saveCurrentToHistory('png');
            showToast('✅ Saved to Gallery!');
            return;
          }
        }

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          window.AndroidBridge.downloadFile(base64, fname, 'image/png');
          saveCurrentToHistory('png');
          showToast('✅ PNG Downloaded!');
        } else {
          triggerBlobDownload(blob, fname);
          saveCurrentToHistory('png');
          showToast('✅ PNG Downloaded!');
        }
      } catch (err) {
        showToast('❌ PNG error: ' + (err.message || 'failed'));
      }
    });
  }

  // ==================== SAVE TO GALLERY ====================
  const btnSaveGallery = document.getElementById('btn-save-gallery');
  if (btnSaveGallery) {
    btnSaveGallery.addEventListener('click', async () => {
      showToast('Saving to Gallery...');
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
            showToast(`✅ Saved to Gallery (${res.path || fname})`);
          } else {
            throw new Error(res.error || 'Save failed');
          }
        } else {
          triggerBlobDownload(blob, fname);
          saveCurrentToHistory('png');
          showToast('✅ Image saved to device!');
        }
      } catch (err) {
        showToast('❌ Save failed: ' + (err.message || 'unknown error'));
      }
    });
  }

  // ==================== DOWNLOAD SVG ====================
  const btnDownloadSvg = document.getElementById('btn-download-svg');
  if (btnDownloadSvg) {
    btnDownloadSvg.addEventListener('click', async () => {
      showToast('Generating SVG...');
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
          showToast('✅ SVG Downloaded!');
        } else {
          triggerBlobDownload(blob, fname);
          saveCurrentToHistory('svg');
          showToast('✅ SVG Downloaded!');
        }
      } catch (err) {
        showToast('❌ SVG error: ' + (err.message || 'failed'));
      }
    });
  }

  // ==================== SHARE QR ====================
  const btnShareQr = document.getElementById('btn-share-qr');
  if (btnShareQr) {
    btnShareQr.addEventListener('click', async () => {
      showToast('Opening share panel...');
      try {
        const canvas = getQrCanvas();
        if (!canvas) throw new Error('No QR canvas');

        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        if (!blob) throw new Error('Blob export failed');

        if (isAndroid()) {
          const base64 = await blobToBase64(blob);
          const shared = window.AndroidBridge.shareImage(base64, 'AX QR Studio', 'QR Code: ' + getCleanUrl());
          if (shared) {
            showToast('✅ Share opened');
            return;
          }
        }

        if (navigator.share) {
          const file = new File([blob], 'ax_qr_code.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'AX QR Studio',
              text: `Scanned from AX QR Studio: ${getCleanUrl()}`,
              files: [file]
            });
            showToast('✅ Shared successfully!');
            return;
          }
          await navigator.share({ title: 'AX QR Studio', text: getCleanUrl(), url: getCleanUrl() });
          showToast('✅ Shared!');
          return;
        }

        copyToClipboard(getCleanUrl(), 'Link copied to clipboard!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(getCleanUrl(), 'Link copied to clipboard!');
        }
      }
    });
  }

  // ==================== CREATE SCREEN: 12 RICH TYPES ====================
  const dynamicFields = document.getElementById('dynamic-fields');
  const createFormTitle = document.getElementById('create-form-title');
  let currentCreateType = 'link';

  const typeConfig = {
    link: {
      title: 'Website Link',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Website or Page URL</label>
          <input type="url" id="field-primary-input" placeholder="https://..." value="https://t.me/ArafSparrow" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-mono">
        </div>
      `
    },
    text: {
      title: 'Plain Text',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Text Message or Note</label>
          <textarea id="field-primary-input" rows="3" placeholder="Type text content here..." class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-mono">Hello from AX QR Studio!</textarea>
        </div>
      `
    },
    wifi: {
      title: 'Wi-Fi Network',
      html: `
        <div class="space-y-2">
          <input type="text" id="wifi-ssid" placeholder="Network Name (SSID)" value="AX_Studio_WiFi" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs">
          <input type="text" id="wifi-pass" placeholder="Password" value="securepassword" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs">
          <select id="wifi-type" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs">
            <option value="WPA">WPA / WPA2 (Default)</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None (Open)</option>
          </select>
        </div>
      `
    },
    contact: {
      title: 'Contact (vCard)',
      html: `
        <div class="space-y-2">
          <input type="text" id="vcard-name" placeholder="Full Name" value="Araf Sparrow" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <input type="tel" id="vcard-phone" placeholder="Phone Number" value="+1234567890" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <input type="email" id="vcard-email" placeholder="Email Address" value="cjaraf162@gmail.com" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
        </div>
      `
    },
    email: {
      title: 'Email Address',
      html: `
        <div class="space-y-2">
          <input type="email" id="email-addr" placeholder="Recipient Email" value="cjaraf162@gmail.com" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <input type="text" id="email-subject" placeholder="Subject" value="Hello AX QR Studio" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <textarea id="email-body" rows="2" placeholder="Message body..." class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">Sent via AX QR Studio</textarea>
        </div>
      `
    },
    phone: {
      title: 'Phone Call',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
          <input type="tel" id="field-primary-input" placeholder="+123456789" value="+123456789" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs font-mono">
        </div>
      `
    },
    sms: {
      title: 'SMS Message',
      html: `
        <div class="space-y-2">
          <input type="tel" id="sms-phone" placeholder="Recipient Phone Number" value="+123456789" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <textarea id="sms-body" rows="2" placeholder="SMS text..." class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">Hello from AX QR Studio</textarea>
        </div>
      `
    },
    location: {
      title: 'Map Location',
      html: `
        <div class="space-y-2">
          <input type="text" id="geo-lat" placeholder="Latitude (e.g. 23.8103)" value="23.8103" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <input type="text" id="geo-lng" placeholder="Longitude (e.g. 90.4125)" value="90.4125" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
        </div>
      `
    },
    multilink: {
      title: 'Multi-Link Hub (Pro)',
      html: `
        <div class="space-y-2">
          <input type="text" id="ml-title" placeholder="Hub Title" value="ArafSparrow — Social Hub" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs font-bold">
          <input type="text" id="ml-link1" placeholder="Link 1" value="https://t.me/ArafSparrow" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-mono">
          <input type="text" id="ml-link2" placeholder="Link 2" value="https://youtube.com/@arafsparrow" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-mono">
          <input type="text" id="ml-link3" placeholder="Link 3" value="https://github.com/Arafsparrow/qr-studio-app" class="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-mono">
        </div>
      `
    },
    social: {
      title: 'Social Media',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Social Profile URL</label>
          <input type="url" id="field-primary-input" placeholder="https://..." value="https://x.com/Araf_sparrow" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs font-mono">
        </div>
      `
    },
    event: {
      title: 'Calendar Event',
      html: `
        <div class="space-y-2">
          <input type="text" id="event-title" placeholder="Event Summary" value="AX QR Studio Launch" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
          <input type="text" id="event-desc" placeholder="Description / Location" value="Online Release Party" class="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs">
        </div>
      `
    },
    app: {
      title: 'App Download',
      html: `
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">App Store or APK Download URL</label>
          <input type="url" id="field-primary-input" placeholder="https://..." value="https://github.com/Arafsparrow/qr-studio-app/releases" class="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-xs font-mono">
        </div>
      `
    }
  };

  document.querySelectorAll('.create-type-card').forEach(card => {
    card.addEventListener('click', () => {
      const t = card.getAttribute('data-create-type');
      currentCreateType = t;
      const cfg = typeConfig[t] || typeConfig.link;
      if (createFormTitle) {
        createFormTitle.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-indigo-500"></i><span>${cfg.title}</span>`;
      }
      if (dynamicFields) {
        dynamicFields.innerHTML = cfg.html;
      }
      if (window.lucide) lucide.createIcons();
      document.getElementById('create-form-container')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

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
        const name = document.getElementById('vcard-name')?.value.trim() || 'Araf Sparrow';
        const phone = document.getElementById('vcard-phone')?.value.trim() || '';
        const email = document.getElementById('vcard-email')?.value.trim() || '';
        finalData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
      } else if (currentCreateType === 'email') {
        const addr = document.getElementById('email-addr')?.value.trim() || 'cjaraf162@gmail.com';
        const sub = encodeURIComponent(document.getElementById('email-subject')?.value.trim() || '');
        const body = encodeURIComponent(document.getElementById('email-body')?.value.trim() || '');
        finalData = `mailto:${addr}?subject=${sub}&body=${body}`;
      } else if (currentCreateType === 'phone') {
        const p = document.getElementById('field-primary-input')?.value.trim() || '+123456789';
        finalData = `tel:${p}`;
      } else if (currentCreateType === 'sms') {
        const p = document.getElementById('sms-phone')?.value.trim() || '+123456789';
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
      } else {
        finalData = document.getElementById('field-primary-input')?.value.trim() || 'https://t.me/ArafSparrow';
      }

      state.url = finalData;
      if (inputUrl) inputUrl.value = finalData;
      renderQR();
      saveCurrentToHistory('QR', typeConfig[currentCreateType]?.title || 'QR Code');
      switchScreen('screen-home');
      showToast('✅ QR Generated!');
    });
  }

  // ==================== REAL-TIME CAMERA QR SCANNER ====================
  const scanResultCard = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanTypeBadge = document.getElementById('scan-type-badge');

  function stopCameraScanner() {
    if (html5QrScanner) {
      try {
        if (html5QrScanner.isScanning) {
          html5QrScanner.stop().catch(() => {}).finally(() => {
            try { html5QrScanner.clear(); } catch (e) {}
          });
        }
      } catch (e) {}
    }
    if (activeCameraTrack) {
      try { activeCameraTrack.stop(); } catch (e) {}
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
      showToast('Camera: ' + (err.message || 'Permission denied'));
    });
  }

  document.getElementById('btn-restart-camera')?.addEventListener('click', () => {
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
      showToast('Flashlight not supported');
    }
  });

  // Scan from Gallery
  const scanGalleryInput = document.getElementById('scan-gallery-input');
  document.getElementById('btn-scan-gallery')?.addEventListener('click', () => scanGalleryInput?.click());
  document.getElementById('btn-scan-gallery-top')?.addEventListener('click', () => scanGalleryInput?.click());

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
          showToast('No QR code found in selected image');
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

    if (state.settings.autoSaveHistory) {
      const now = new Date();
      state.history.unshift({
        id: Date.now(),
        title: 'Scanned Code',
        data: text,
        format: 'SCAN',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.getTime(),
        stateSnapshot: { url: text }
      });
      if (state.history.length > 50) state.history.pop();
      try {
        localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history));
      } catch (e) {}
    }

    showToast('✅ QR Code Detected!');
  }

  document.getElementById('btn-scan-open')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    window.open(pendingOpenUrl, '_blank');
  });

  document.getElementById('btn-scan-copy')?.addEventListener('click', () => {
    if (pendingOpenUrl) copyToClipboard(pendingOpenUrl);
  });

  document.getElementById('btn-scan-share')?.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (isAndroid() && window.AndroidBridge.shareText) {
      window.AndroidBridge.shareText(pendingOpenUrl, "Scanned QR Code");
    } else if (navigator.share) {
      navigator.share({ title: 'Scanned Code', text: pendingOpenUrl }).catch(() => {});
    } else {
      copyToClipboard(pendingOpenUrl);
    }
  });

  // ==================== HISTORY CRUD & FILTERING ====================
  const historyItemsList = document.getElementById('history-items');
  function renderHistoryItems(searchQuery = '') {
    if (!historyItemsList) return;
    historyItemsList.innerHTML = '';

    let items = state.history;
    if (state.historyFilter === 'generated') {
      items = items.filter(h => h.format !== 'SCAN');
    } else if (state.historyFilter === 'scanned') {
      items = items.filter(h => h.format === 'SCAN');
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
      if (window.lucide) lucide.createIcons();
      return;
    }

    items.forEach(item => {
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

  // History Filter Pills
  document.querySelectorAll('.history-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.history-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.historyFilter = pill.getAttribute('data-filter') || 'all';
      renderHistoryItems(document.getElementById('history-search')?.value || '');
    });
  });

  document.getElementById('history-search')?.addEventListener('input', (e) => renderHistoryItems(e.target.value));

  document.getElementById('btn-clear-history-top')?.addEventListener('click', () => {
    if (confirm('Clear all history records?')) {
      state.history = [];
      try { localStorage.removeItem('ax_qr_history_v2'); } catch (e) {}
      renderHistoryItems();
      showToast('All history cleared!');
    }
  });

  document.getElementById('row-clear-history')?.addEventListener('click', () => {
    if (confirm('Permanently clear all history?')) {
      state.history = [];
      try { localStorage.removeItem('ax_qr_history_v2'); } catch (e) {}
      renderHistoryItems();
      showToast('History cleared');
    }
  });

  // ==================== SETTINGS & MODALS ====================
  document.getElementById('theme-card-light')?.addEventListener('click', () => applyTheme('light'));
  document.getElementById('theme-card-dark')?.addEventListener('click', () => applyTheme('dark'));
  document.getElementById('theme-card-system')?.addEventListener('click', () => applyTheme('system'));

  // Quality Pills
  document.querySelectorAll('.pref-res-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pref-res-pill').forEach(p => p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active'));
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active');
      state.settings.defaultQuality = parseInt(pill.getAttribute('data-res'), 10);
      state.resolution = state.settings.defaultQuality;
      saveSettings();
      showToast(`Quality: ${state.resolution}px`);
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

  // Modals Openers
  const modalNotifications = document.getElementById('modal-notifications');
  document.getElementById('row-notifications')?.addEventListener('click', () => modalNotifications?.classList.remove('hidden'));
  document.getElementById('btn-close-notifications')?.addEventListener('click', () => modalNotifications?.classList.add('hidden'));

  document.getElementById('btn-req-notif-perm')?.addEventListener('click', () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        showToast('Notification permission: ' + permission);
      });
    } else {
      showToast('Notifications active on Android');
    }
  });

  const modalPrivacy = document.getElementById('modal-privacy');
  document.getElementById('row-privacy-security')?.addEventListener('click', () => modalPrivacy?.classList.remove('hidden'));
  document.getElementById('btn-close-privacy-modal')?.addEventListener('click', () => modalPrivacy?.classList.add('hidden'));

  document.getElementById('btn-clear-cache')?.addEventListener('click', () => {
    if (confirm('Clear local cache and restart?')) {
      localStorage.clear();
      location.reload();
    }
  });

  const modalLanguage = document.getElementById('modal-language');
  document.getElementById('row-language')?.addEventListener('click', () => modalLanguage?.classList.remove('hidden'));
  document.getElementById('btn-close-lang')?.addEventListener('click', () => modalLanguage?.classList.add('hidden'));

  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      state.settings.language = selected;
      saveSettings();
      document.getElementById('current-lang-label').textContent = selected === 'bn' ? 'বাংলা' : 'English';
      modalLanguage?.classList.add('hidden');
      showToast(selected === 'bn' ? 'ভাষা: বাংলা' : 'Language: English');
    });
  });

  const modalHelp = document.getElementById('modal-help-support');
  document.getElementById('row-help-support')?.addEventListener('click', () => modalHelp?.classList.remove('hidden'));
  document.getElementById('btn-close-help')?.addEventListener('click', () => modalHelp?.classList.add('hidden'));

  const modalAbout = document.getElementById('modal-about');
  document.getElementById('row-about')?.addEventListener('click', () => modalAbout?.classList.remove('hidden'));
  document.getElementById('btn-close-about')?.addEventListener('click', () => modalAbout?.classList.add('hidden'));

  document.getElementById('btn-social-discord')?.addEventListener('click', () => {
    copyToClipboard('arafsparrow', 'Discord ID "arafsparrow" copied!');
    setTimeout(() => window.open('https://discord.com/users/arafsparrow', '_blank'), 400);
  });

});
