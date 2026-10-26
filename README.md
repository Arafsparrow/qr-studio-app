# 🚀 AX QR Studio — Powered by ArafSparrow

**AX QR Studio** is a next-generation, premium-grade QR code generator and real-time scanner Android app designed with a sleek purple-and-white visual interface, smooth animations, rounded cards, and responsive touch layouts.

![AX QR Studio](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/qr-code.svg)

---

## ✨ Features & Architecture

### 1. App Logo & Branding
- **Name**: AX QR Studio
- **Subtitle**: Powered by ArafSparrow
- **Theme**: Premium violet (`#6366f1` / `#7c3aed`), dark navy (`#0b0f19`), crisp white cards, and subtle shadows.
- **Custom Logo**: Unique geometric QR bracket monogram with stylized matrix.

### 2. Social Links & Community (ArafSparrow Official)
- **Airdrop Community**: [https://t.me/incometricks007](https://t.me/incometricks007)
- **Trading Community**: [https://t.me/arafsparrow1](https://t.me/arafsparrow1)
- **Telegram Channel**: [https://t.me/ArafSparrow](https://t.me/ArafSparrow)
- **X (Twitter)**: [https://x.com/Araf_sparrow](https://x.com/Araf_sparrow)
- **Discord**: `arafsparrow` ([Profile Link](https://discord.com/users/arafsparrow))
- **YouTube**: [https://youtube.com/@arafsparrow](https://youtube.com/@arafsparrow)

### 3. QR Code Generator
- **Single Link & Text**: Instant live QR generation with paste, clear, test, and copy.
- **Multi-Link Landing Hub**: Add, remove, edit, and reorder multiple social/profile links into an interactive mobile landing page encoded into the QR code!
- **Data Types Supported**: Websites (URL), Plain Text, Wi-Fi credentials (`WIFI:S:...`), vCard Contacts, and Email.
- **Downloads**: High-resolution PNG (HD / 4K) and Scalable Vector Graphics (SVG).
- **Share**: Native device share integration (`navigator.share`).
- **Styling**: Rounded, Dots, Classy, and Square patterns, custom corner frames, gradient colors, and logo overlays (Telegram, YouTube, X, Discord, or custom uploads).

### 4. Real-Time Camera QR Scanner
- Powered by `html5-qrcode`.
- Real-time video viewfinder with scan laser animation.
- Flashlight / Torch toggle control.
- Scan QR codes from saved gallery images.
- Detected URL/Text modal with safety verification before opening external links, instant copy, and sharing.

### 5. 5-Tab Android Bottom Navigation
- 🏠 **Home**: Complete dashboard matching visual reference mockup.
- ➕ **Create**: Full generator for URL, Text, Wi-Fi, and Contacts.
- 📷 **Scan**: Real-time camera viewfinder scanner.
- 🕒 **History**: Local storage with search, reopen, download, rename, and delete confirmation.
- ⚙️ **Settings**: Themes, download quality, and official Social Links.

---

## 🛠️ GitHub Actions Automated APK Build

Whenever code is pushed to `main`, GitHub Actions automatically:
1. Sets up JDK 17 & Gradle 8.5 on Ubuntu.
2. Compiles Android assets and generates `app-debug.apk`.
3. Uploads `QR-Studio-Android-APK` directly into the GitHub Actions Artifacts tab for instant mobile download!
