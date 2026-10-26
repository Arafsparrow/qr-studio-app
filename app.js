/**
 * AX QR Studio — Powered by ArafSparrow
 * Complete Engine: Generator, Multi-Link Landing Hub, Camera Scanner, History & Settings
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Pre-built Brand Logo SVGs for QR center overlays
  const BRAND_LOGOS = {
    telegram: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%2324A1DE"/><path fill="%23FFF" d="M12 23.5l24-9.5-6.5 24-5.5-6.5-4 4v-5z"/></svg>',
    youtube: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="%23FF0000"/><path fill="%23FFF" d="M19 14.5v19l14-9.5z"/></svg>',
    x: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%23000"/><path fill="%23FFF" d="M14 13h5.2l6.2 8.3 6.6-8.3H34l-8.7 10.9L35 35h-5.2l-7-9.4-7.4 9.4H13l9.4-11.8L14 13z"/></svg>',
    discord: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="%235865F2"/><path fill="%23FFF" d="M33.5 16.5a19 19 0 0 0-4.8-1.5c-.2.4-.4.8-.6 1.2-1.8-.3-3.6-.3-5.4 0-.2-.4-.4-.8-.6-1.2-1.7.4-3.3 1-4.8 1.5-3 4.5-3.8 8.8-3.4 13.1 2 1.5 4 2.4 5.9 3 .5-.6.9-1.3 1.3-2-1.4-.5-2.1-1.3-2.1-1.3s.1.1.4.3c3.7 1.7 7.7 1.7 11.4 0 .3-.2.4-.3.4-.3-.1 0-.8.8-2.2 1.3.4.7.8 1.4 1.3 2 1.9-.6 3.9-1.5 5.9-3 .5-5-.5-9.3-3.3-13.1zm-13 10.3c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm8.9 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z"/></svg>'
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
    isDarkMode: false,
    history: [],
    multiLinks: [
      { id: 1, title: 'Telegram Channel', url: 'https://t.me/ArafSparrow', platform: 'telegram' },
      { id: 2, title: 'Airdrop Community', url: 'https://t.me/incometricks007', platform: 'telegram' },
      { id: 3, title: 'Trading Community', url: 'https://t.me/arafsparrow1', platform: 'telegram' },
      { id: 4, title: 'YouTube Channel', url: 'https://youtube.com/@arafsparrow', platform: 'youtube' },
      { id: 5, title: 'X (Twitter)', url: 'https://x.com/Araf_sparrow', platform: 'x' }
    ]
  };

  // Load history from localStorage
  try {
    const saved = localStorage.getItem('ax_qr_history_v2');
    if (saved) state.history = JSON.parse(saved);
  } catch (e) {}

  // Scanner Instance
  let html5QrScanner = null;
  let isTorchOn = false;
  let activeCameraTrack = null;

  // DOM Elements
  const inputUrl = document.getElementById('input-url');
  const btnPaste = document.getElementById('btn-paste');
  const btnClearInput = document.getElementById('btn-clear-input');
  const previewUrlText = document.getElementById('preview-url-text');
  const qrCanvasWrapper = document.getElementById('qr-canvas-wrapper');
  
  // Header Buttons
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const btnHistoryShortcut = document.getElementById('btn-history-shortcut');

  // Navigation Tabs & Views
  const navTabs = document.querySelectorAll('.bottom-nav-tab');
  const screenViews = document.querySelectorAll('.screen-view');

  // Home Quick Tiles
  const tileScan = document.getElementById('tile-scan');
  const tileMultilink = document.getElementById('tile-multilink');
  const tileCustomize = document.getElementById('tile-customize');

  // Segmented Single / Multi Link on Home
  const btnTabSingle = document.getElementById('btn-tab-single');
  const btnTabMulti = document.getElementById('btn-tab-multi');

  // Platform chips
  const platformChips = document.querySelectorAll('.platform-chip');

  // Home Action Buttons
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadSvg = document.getElementById('btn-download-svg');
  const btnShareQr = document.getElementById('btn-share-qr');

  // Multi-Link Elements
  const multilinkItemsContainer = document.getElementById('multilink-items');
  const btnAddMultilink = document.getElementById('btn-add-multilink');
  const btnGenerateMultilink = document.getElementById('btn-generate-multilink');
  const multilinkTitleInput = document.getElementById('multilink-title');
  const multilinkBioInput = document.getElementById('multilink-bio');

  // Scanner Elements
  const btnToggleTorch = document.getElementById('btn-toggle-torch');
  const btnStartCamera = document.getElementById('btn-start-camera');
  const btnScanGallery = document.getElementById('btn-scan-gallery');
  const scanGalleryInput = document.getElementById('scan-gallery-input');
  const scanResultCard = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanTypeBadge = document.getElementById('scan-type-badge');
  const btnScanOpen = document.getElementById('btn-scan-open');
  const btnScanCopy = document.getElementById('btn-scan-copy');
  const btnScanShare = document.getElementById('btn-scan-share');

  // Safety Modal
  const modalSafety = document.getElementById('modal-safety');
  const safetyModalUrl = document.getElementById('safety-modal-url');
  const btnSafetyCancel = document.getElementById('btn-safety-cancel');
  const btnSafetyProceed = document.getElementById('btn-safety-proceed');
  let pendingOpenUrl = null;

  // Customize Modal Elements
  const modalCustomize = document.getElementById('modal-customize');
  const btnCloseCustomize = document.getElementById('btn-close-customize');
  const btnSaveCustomize = document.getElementById('btn-save-customize');
  const customDotPills = document.querySelectorAll('.custom-dot-pill');
  const customPickerColor = document.getElementById('custom-picker-color');
  const customLabelColor = document.getElementById('custom-label-color');
  const customPickerBg = document.getElementById('custom-picker-bg');
  const customLabelBg = document.getElementById('custom-label-bg');
  const customLogoButtons = document.querySelectorAll('.custom-logo-btn');
  const btnCustomRemoveLogo = document.getElementById('btn-custom-remove-logo');

  // History Elements
  const historyItemsList = document.getElementById('history-items');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const historySearch = document.getElementById('history-search');

  // Settings Elements
  const btnOpenDiscord = document.getElementById('btn-open-discord');
  const settingResPills = document.querySelectorAll('.setting-res-pill');

  // Toast
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

  function getCleanUrl(url) {
    let raw = (url || state.url).trim();
    if (!raw) return 'https://t.me/ArafSparrow';
    if (!/^https?:\/\//i.test(raw) && !raw.startsWith('mailto:') && !raw.startsWith('tel:') && !raw.startsWith('WIFI:') && !raw.startsWith('BEGIN:VCARD') && !raw.startsWith('data:')) {
      return 'https://' + raw;
    }
    return raw;
  }

  // Build and render QR Code
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
      qrCanvasWrapper.innerHTML = '';
      qrCodeInstance = new QRCodeStyling(config);
      qrCodeInstance.append(qrCanvasWrapper);
    } else {
      qrCodeInstance.update(config);
    }
  }

  // Initial QR Render
  renderQR();

  // SCREEN NAVIGATION HANDLER
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

    // Stop scanner if leaving scan screen
    if (targetScreenId !== 'screen-scan' && html5QrScanner) {
      try {
        html5QrScanner.stop().catch(() => {});
      } catch (e) {}
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

  // QUICK HOME TILES CLICK
  tileScan.addEventListener('click', () => switchScreen('screen-scan'));
  tileMultilink.addEventListener('click', () => switchScreen('screen-multilink'));
  tileCustomize.addEventListener('click', () => {
    modalCustomize.classList.remove('hidden');
  });

  btnHistoryShortcut.addEventListener('click', () => switchScreen('screen-history'));

  // SINGLE LINK VS MULTI LINK SEGMENTED CONTROL
  btnTabSingle.addEventListener('click', () => {
    btnTabSingle.classList.add('active');
    btnTabMulti.classList.remove('active');
  });
  btnTabMulti.addEventListener('click', () => {
    switchScreen('screen-multilink');
  });

  // URL INPUT & PLATFORM CHIPS
  inputUrl.addEventListener('input', (e) => {
    state.url = e.target.value;
    renderQR();
  });

  btnClearInput.addEventListener('click', () => {
    inputUrl.value = '';
    state.url = '';
    renderQR();
  });

  btnPaste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        inputUrl.value = text;
        state.url = text;
        renderQR();
        showToast('Pasted from clipboard!');
      }
    } catch {
      showToast('Please allow clipboard access');
    }
  });

  platformChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const url = chip.getAttribute('data-url');
      const name = chip.getAttribute('data-name');
      inputUrl.value = url;
      state.url = url;
      renderQR();
      showToast(`Selected ${name}`);
    });
  });

  // THEME TOGGLE
  btnThemeToggle.addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    document.documentElement.classList.toggle('dark', state.isDarkMode);
    themeIcon.setAttribute('data-lucide', state.isDarkMode ? 'sun' : 'moon');
    if (window.lucide) lucide.createIcons();
    showToast(state.isDarkMode ? 'Dark Mode enabled' : 'Light Mode enabled');
  });

  // DOWNLOAD & SHARE QR
  function saveCurrentToHistory(format) {
    const item = {
      id: Date.now(),
      title: state.title || 'AX QR Code',
      data: getCleanUrl(),
      format: format.toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stateSnapshot: JSON.parse(JSON.stringify(state))
    };
    state.history.unshift(item);
    if (state.history.length > 30) state.history.pop();
    try {
      localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history));
    } catch (e) {}
  }

  btnDownloadPng.addEventListener('click', async () => {
    showToast('Generating HD PNG...');
    const expConfig = {
      width: state.resolution,
      height: state.resolution,
      type: 'canvas',
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
    const inst = new QRCodeStyling(expConfig);
    const fname = `AX-QR-${Date.now()}`;
    await inst.download({ name: fname, extension: 'png' });
    saveCurrentToHistory('png');
    showToast('Downloaded PNG (HD)!');
  });

  btnDownloadSvg.addEventListener('click', async () => {
    showToast('Generating Vector SVG...');
    const expConfig = {
      width: state.resolution,
      height: state.resolution,
      type: 'svg',
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
    const inst = new QRCodeStyling(expConfig);
    const fname = `AX-QR-${Date.now()}`;
    await inst.download({ name: fname, extension: 'svg' });
    saveCurrentToHistory('svg');
    showToast('Downloaded SVG (Vector)!');
  });

  btnShareQr.addEventListener('click', async () => {
    try {
      const canvas = qrCanvasWrapper.querySelector('canvas');
      if (canvas && navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'ax-qr-code.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'AX QR Studio — QR Code',
              text: `Scanned from AX QR Studio: ${getCleanUrl()}`,
              files: [file]
            });
            showToast('QR Code Shared!');
            return;
          }
          fallbackShare();
        }, 'image/png');
      } else {
        fallbackShare();
      }
    } catch {
      fallbackShare();
    }
  });

  function fallbackShare() {
    if (navigator.share) {
      navigator.share({
        title: 'AX QR Studio',
        text: `Check out this link: ${getCleanUrl()}`,
        url: getCleanUrl()
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(getCleanUrl());
      showToast('Link copied to clipboard!');
    }
  }

  // ==================== MULTI-LINK QR GENERATION & LANDING PAGE ====================
  function renderMultiLinkEditor() {
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
          <button class="btn-move-up p-1.5 text-slate-400 hover:text-indigo-600" data-index="${index}" title="Move Up">
            <i data-lucide="chevron-up" class="w-4 h-4"></i>
          </button>
          <button class="btn-remove-link p-1.5 text-slate-400 hover:text-rose-500" data-index="${index}" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      multilinkItemsContainer.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    // Attach listeners
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

    multilinkItemsContainer.querySelectorAll('.btn-move-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (idx > 0) {
          const temp = state.multiLinks[idx];
          state.multiLinks[idx] = state.multiLinks[idx - 1];
          state.multiLinks[idx - 1] = temp;
          renderMultiLinkEditor();
        }
      });
    });
  }

  btnAddMultilink.addEventListener('click', () => {
    state.multiLinks.push({
      id: Date.now(),
      title: 'New Social Link',
      url: 'https://',
      platform: 'link'
    });
    renderMultiLinkEditor();
  });

  // Multi-Link Landing Page Generator
  btnGenerateMultilink.addEventListener('click', () => {
    const title = multilinkTitleInput.value.trim() || 'ArafSparrow — Social Hub';
    const bio = multilinkBioInput.value.trim() || 'Follow all my official channels & airdrop updates';

    // Generate responsive self-contained HTML Landing Page
    const landingHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;box-sizing:border-box}.hub{max-width:400px;width:100%;text-align:center}.avatar{width:80px;height:80px;border-radius:24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(99,102,241,0.4);font-size:2rem}h1{font-size:1.4rem;margin:0 0 8px}p{color:#94a3b8;font-size:0.85rem;margin:0 0 24px}.btn{display:block;background:#1e293b;color:#f8fafc;padding:14px;border-radius:16px;text-decoration:none;margin-bottom:12px;font-weight:700;font-size:0.9rem;border:1px solid #334155;transition:all 0.2s}.btn:hover{background:#334155;transform:translateY(-2px)}.badge{font-size:0.75rem;color:#818cf8;margin-top:20px;display:block}</style></head><body><div class="hub"><div class="avatar">⚡</div><h1>${title}</h1><p>${bio}</p>${state.multiLinks.map(l => `<a class="btn" href="${l.url}" target="_blank">${l.title} →</a>`).join('')}<span class="badge">Powered by AX QR Studio & ArafSparrow</span></div></body></html>`;

    // Encode to data URL
    const landingDataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(landingHtml);
    
    state.url = landingDataUrl;
    state.title = title;
    inputUrl.value = 'Multi-Link Hub: ' + title;
    renderQR();
    switchScreen('screen-home');
    showToast('Multi-Link QR Generated!');
  });

  // ==================== CAMERA QR SCANNER (REAL-TIME) ====================
  function startCameraScanner() {
    scanResultCard.classList.add('hidden');
    if (html5QrScanner) {
      try { html5QrScanner.stop().catch(() => {}); } catch (e) {}
    }

    html5QrScanner = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      handleScannedData(decodedText);
      try {
        html5QrScanner.stop();
      } catch (e) {}
    };

    const config = { fps: 10, qrbox: { width: 220, height: 220 } };

    html5QrScanner.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    ).then(() => {
      // Get active video track for torch control
      setTimeout(() => {
        const videoElement = document.querySelector("#reader video");
        if (videoElement && videoElement.srcObject) {
          const track = videoElement.srcObject.getVideoTracks()[0];
          activeCameraTrack = track;
        }
      }, 500);
    }).catch(err => {
      showToast('Camera error: ' + (err.message || 'Permission denied'));
    });
  }

  btnStartCamera.addEventListener('click', () => startCameraScanner());

  // Flashlight / Torch toggle
  btnToggleTorch.addEventListener('click', async () => {
    if (!activeCameraTrack) {
      showToast('Flashlight not supported on this camera');
      return;
    }
    try {
      isTorchOn = !isTorchOn;
      await activeCameraTrack.applyConstraints({
        advanced: [{ torch: isTorchOn }]
      });
      showToast(isTorchOn ? 'Flashlight ON' : 'Flashlight OFF');
    } catch {
      showToast('Flashlight toggle not available');
    }
  });

  // Scan from Gallery Image
  btnScanGallery.addEventListener('click', () => scanGalleryInput.click());
  scanGalleryInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!html5QrScanner) html5QrScanner = new Html5Qrcode("reader");

    html5QrScanner.scanFile(file, true)
      .then(decodedText => {
        handleScannedData(decodedText);
      })
      .catch(() => {
        showToast('No QR code found in this image');
      });
  });

  function handleScannedData(text) {
    scanResultCard.classList.remove('hidden');
    scanResultText.textContent = text;
    pendingOpenUrl = text;

    // Detect Type
    if (/^https?:\/\//i.test(text)) {
      scanTypeBadge.textContent = 'URL';
    } else if (text.startsWith('WIFI:')) {
      scanTypeBadge.textContent = 'Wi-Fi';
    } else if (text.startsWith('BEGIN:VCARD')) {
      scanTypeBadge.textContent = 'Contact';
    } else {
      scanTypeBadge.textContent = 'Text';
    }

    showToast('QR Code Detected!');
  }

  // Open with Safety Confirmation
  btnScanOpen.addEventListener('click', () => {
    if (!pendingOpenUrl) return;
    if (/^https?:\/\//i.test(pendingOpenUrl)) {
      safetyModalUrl.textContent = pendingOpenUrl;
      modalSafety.classList.remove('hidden');
    } else {
      window.open(pendingOpenUrl, '_blank');
    }
  });

  btnSafetyProceed.addEventListener('click', () => {
    modalSafety.classList.add('hidden');
    if (pendingOpenUrl) {
      window.open(pendingOpenUrl, '_blank', 'noopener,noreferrer');
    }
  });
  btnSafetyCancel.addEventListener('click', () => modalSafety.classList.add('hidden'));

  btnScanCopy.addEventListener('click', () => {
    if (pendingOpenUrl) {
      navigator.clipboard.writeText(pendingOpenUrl);
      showToast('Copied to clipboard!');
    }
  });

  btnScanShare.addEventListener('click', () => {
    if (pendingOpenUrl && navigator.share) {
      navigator.share({
        title: 'Scanned from AX QR Studio',
        text: pendingOpenUrl
      }).catch(() => {});
    }
  });

  // ==================== HISTORY CRUD & LOCALSTORAGE ====================
  function renderHistoryItems(filter = '') {
    historyItemsList.innerHTML = '';
    const filtered = state.history.filter(h => h.data.toLowerCase().includes(filter.toLowerCase()) || h.title.toLowerCase().includes(filter.toLowerCase()));

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
      card.className = 'p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-2xs space-x-2';
      card.innerHTML = `
        <div class="flex items-center space-x-3 overflow-hidden flex-1">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-extrabold text-xs flex items-center justify-center shrink-0">
            ${item.format}
          </div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.title}</h4>
            <p class="text-[11px] font-mono text-indigo-600 truncate">${item.data}</p>
            <span class="text-[10px] text-slate-400 font-medium">${item.date} • ${item.time}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 shrink-0">
          <button class="btn-history-load p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl" data-id="${item.id}" title="Reopen">
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
          inputUrl.value = item.data;
          renderQR();
          switchScreen('screen-home');
          showToast('Loaded QR Code from history!');
        }
      });
    });

    historyItemsList.querySelectorAll('.btn-history-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (confirm('Are you sure you want to delete this saved QR code?')) {
          state.history = state.history.filter(h => h.id !== id);
          try { localStorage.setItem('ax_qr_history_v2', JSON.stringify(state.history)); } catch (e) {}
          renderHistoryItems(historySearch.value);
          showToast('Deleted from history');
        }
      });
    });
  }

  historySearch.addEventListener('input', (e) => renderHistoryItems(e.target.value));

  btnClearHistory.addEventListener('click', () => {
    if (confirm('Clear all history permanently?')) {
      state.history = [];
      try { localStorage.removeItem('ax_qr_history_v2'); } catch (e) {}
      renderHistoryItems();
      showToast('History cleared');
    }
  });

  // ==================== CUSTOMIZE MODAL HANDLERS ====================
  btnCloseCustomize.addEventListener('click', () => modalCustomize.classList.add('hidden'));

  customDotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      customDotPills.forEach(p => p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700'));
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700');
      state.dotsType = pill.getAttribute('data-dots');
    });
  });

  customPickerColor.addEventListener('input', (e) => {
    state.qrColor = e.target.value;
    customLabelColor.textContent = state.qrColor;
  });

  customPickerBg.addEventListener('input', (e) => {
    state.bgColor = e.target.value;
    customLabelBg.textContent = state.bgColor;
  });

  customLogoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-logo');
      state.logoUrl = BRAND_LOGOS[key] || null;
      customLogoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50'));
      btn.classList.add('border-indigo-600', 'bg-indigo-50');
      showToast(`Selected ${key} logo badge`);
    });
  });

  btnCustomRemoveLogo.addEventListener('click', () => {
    state.logoUrl = null;
    customLogoButtons.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50'));
    showToast('Removed logo badge');
  });

  btnSaveCustomize.addEventListener('click', () => {
    renderQR();
    modalCustomize.classList.add('hidden');
    showToast('Custom style applied!');
  });

  // ==================== CREATE SCREEN TYPE SWITCHING ====================
  const typePills = document.querySelectorAll('.type-pill');
  const fieldUrl = document.getElementById('field-url');
  const fieldText = document.getElementById('field-text');
  const fieldWifi = document.getElementById('field-wifi');
  const fieldVcard = document.getElementById('field-vcard');

  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('active', 'bg-white', 'dark:bg-slate-800', 'text-indigo-600', 'shadow-2xs'));
      pill.classList.add('active', 'bg-white', 'dark:bg-slate-800', 'text-indigo-600', 'shadow-2xs');

      const t = pill.getAttribute('data-type');
      fieldUrl.classList.toggle('hidden', t !== 'url');
      fieldText.classList.toggle('hidden', t !== 'text');
      fieldWifi.classList.toggle('hidden', t !== 'wifi');
      fieldVcard.classList.toggle('hidden', t !== 'vcard');
    });
  });

  document.getElementById('btn-generate-custom').addEventListener('click', () => {
    const activeType = document.querySelector('.type-pill.active').getAttribute('data-type');
    let generatedData = '';

    if (activeType === 'url') {
      generatedData = document.getElementById('create-input-url').value.trim() || 'https://t.me/ArafSparrow';
    } else if (activeType === 'text') {
      generatedData = document.getElementById('create-input-text').value.trim() || 'Hello from AX QR Studio!';
    } else if (activeType === 'wifi') {
      const ssid = document.getElementById('wifi-ssid').value.trim() || 'WiFi';
      const pass = document.getElementById('wifi-pass').value.trim() || '';
      const enc = document.getElementById('wifi-type').value;
      generatedData = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
    } else if (activeType === 'vcard') {
      const name = document.getElementById('vcard-name').value.trim() || 'Araf Sparrow';
      const phone = document.getElementById('vcard-phone').value.trim() || '';
      const email = document.getElementById('vcard-email').value.trim() || '';
      generatedData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
    }

    state.url = generatedData;
    inputUrl.value = generatedData;
    renderQR();
    switchScreen('screen-home');
    showToast('Custom QR Generated!');
  });

  // ==================== DISCORD COPY / PROFILE ====================
  btnOpenDiscord.addEventListener('click', () => {
    navigator.clipboard.writeText('arafsparrow');
    showToast('Discord username "arafsparrow" copied!');
    setTimeout(() => {
      window.open('https://discord.com/users/arafsparrow', '_blank');
    }, 400);
  });

  // Resolution Pills in Settings
  settingResPills.forEach(pill => {
    pill.addEventListener('click', () => {
      settingResPills.forEach(p => p.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active'));
      pill.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'active');
      state.resolution = parseInt(pill.getAttribute('data-res'), 10);
      showToast(`Default Resolution: ${state.resolution}px`);
    });
  });

});
