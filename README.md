# 🚀 AX QR Studio — Powered by ArafSparrow

**AX QR Studio** is a next-generation, premium-grade QR code generator and real-time scanner Android app designed with a sleek purple-and-white visual interface, smooth animations, rounded cards, and responsive touch layouts.

![AX QR Studio Logo](logo.png)

---

## ✨ Features & Architecture

### 1. App Logo & Branding
- **Name**: AX QR Studio
- **Branding**: Powered by ArafSparrow
- **Theme**: Premium violet (`#6366f1` / `#7c3aed`), dark navy (`#0b0f19`), crisp white cards, and subtle shadows.
- **Custom Launcher Icon**: Official AX QR Studio square and round adaptive icons for all Android densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi).

### 2. Social Links & Community (ArafSparrow Official)
- **Telegram Channel**: [https://t.me/ArafSparrow](https://t.me/ArafSparrow)
- **Airdrop Community**: [https://t.me/incometricks007](https://t.me/incometricks007)
- **YouTube Channel**: [https://youtube.com/@arafsparrow](https://youtube.com/@arafsparrow)
- **X (Twitter)**: [https://x.com/Araf_sparrow](https://x.com/Araf_sparrow)
- **Discord**: `arafsparrow` ([Profile Link](https://discord.com/users/arafsparrow))
- **GitHub Repository**: [https://github.com/Arafsparrow/qr-studio-app](https://github.com/Arafsparrow/qr-studio-app)

### 3. QR Code Generator & Native Save
- **Single Link & Text**: Instant live QR generation with paste, clear, test, and copy.
- **Save to Gallery**: Native Android `MediaStore.Images.Media` bridge writes generated QR PNGs directly into device `Pictures/AX QR Studio/` with automatic gallery indexing!
- **Download PNG (HD)**: High-resolution export (500px, 1000px HD, 2000px 4K).
- **Download SVG**: Lossless scalable vector graphics export to `Downloads/AX QR Studio/`.
- **Share QR**: Native Android `Intent.ACTION_SEND` bridge via `FileProvider` shares the real PNG file to WhatsApp, Telegram, Messenger, Gmail, Bluetooth, and all installed apps!
- **Styling**: Rounded, Dots, Classy, and Square patterns, custom corner frames, gradient colors, and logo overlays (Telegram, YouTube, X, Discord, GitHub, or custom uploads).

### 4. Real-Time Camera QR Scanner & Gallery Decoder
- Powered by `html5-qrcode` with responsive, enlarged viewfinder.
- Real-time video viewfinder with laser scan line animation.
- Flashlight / Torch toggle control.
- Scan QR codes from saved gallery images via native photo picker.
- Audio beep confirmation via Web Audio API.
- Vibration confirmation via native `Vibrator` / `VibratorManager` bridge.
- Detected URL/Text modal with safety verification before opening external links, instant copy, and sharing.

### 5. 5-Tab Android Bottom Navigation
- 🏠 **Home**: Complete dashboard with live preview, PNG/SVG downloads, Save to Gallery, and native Share.
- ➕ **Create**: Full generator for URL, Text, Wi-Fi, and Contacts.
- 📷 **Scan**: Real-time camera viewfinder scanner + Gallery decoder.
- 🕒 **History**: Persistent local storage with search, reopen, and delete confirmation.
- ⚙️ **Settings**: Themes (Light/Dark/System), full English & Bengali localization, download quality, and official Social Links.

---

## 🛠️ GitHub Actions Automated APK Build

Whenever code is pushed to `main`, GitHub Actions automatically:
1. Sets up JDK 17 & Gradle 8.5 on Ubuntu.
2. Compiles Android assets and generates `app-debug.apk`.
3. Uploads `QR-Studio-Android-APK` directly into the GitHub Actions Artifacts tab for instant mobile download!
