package com.qrstudio.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "AX_QR_Studio";
    private WebView webView;
    private ValueCallback<Uri[]> fileUploadCallback;
    private final static int FILE_CHOOSER_REQUEST_CODE = 101;
    private final static int CAMERA_PERMISSION_REQUEST_CODE = 102;
    private PermissionRequest pendingWebPermissionRequest;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Register Native Android Bridge
        webView.addJavascriptInterface(new AndroidBridge(this), "AndroidBridge");

        // Check & request Camera permission if needed
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST_CODE);
        }

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url == null) return false;
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    if (url.contains("localhost") || url.contains("127.0.0.1") || url.startsWith("file:///")) {
                        return false;
                    }
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to open URL: " + url, e);
                    }
                } else if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("tg:")) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to open Intent URL: " + url, e);
                    }
                }
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                        request.grant(request.getResources());
                    } else {
                        pendingWebPermissionRequest = request;
                        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST_CODE);
                    }
                });
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (fileUploadCallback != null) {
                    fileUploadCallback.onReceiveValue(null);
                }
                fileUploadCallback = filePathCallback;

                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
                } catch (Exception e) {
                    fileUploadCallback = null;
                    return false;
                }
                return true;
            }
        });

        // Load local assets
        webView.loadUrl("file:///android_asset/index.html");

        // Back press handling
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    finish();
                }
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if (pendingWebPermissionRequest != null) {
                    pendingWebPermissionRequest.grant(pendingWebPermissionRequest.getResources());
                    pendingWebPermissionRequest = null;
                }
            } else {
                if (pendingWebPermissionRequest != null) {
                    pendingWebPermissionRequest.deny();
                    pendingWebPermissionRequest = null;
                }
                Toast.makeText(this, "Camera permission needed for scanning", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, @Nullable int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (fileUploadCallback != null) {
                Uri[] results = null;
                if (resultCode == RESULT_OK && data != null) {
                    String dataString = data.getDataString();
                    if (dataString != null) {
                        results = new Uri[]{Uri.parse(dataString)};
                    } else if (data.getClipData() != null) {
                        int count = data.getClipData().getItemCount();
                        results = new Uri[count];
                        for (int i = 0; i < count; i++) {
                            results[i] = data.getClipData().getItemAt(i).getUri();
                        }
                    }
                }
                fileUploadCallback.onReceiveValue(results);
                fileUploadCallback = null;
            }
        }
    }

    /**
     * Native Android Bridge exposed to JavaScript as `window.AndroidBridge`
     */
    public class AndroidBridge {
        private final Context context;

        public AndroidBridge(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public boolean isNative() {
            return true;
        }

        /**
         * Saves a generated QR code image (PNG) directly to device Gallery via MediaStore.
         */
        @JavascriptInterface
        public String saveImageToGallery(String base64Data, String filename) {
            try {
                if (base64Data == null || base64Data.isEmpty()) {
                    return "{\"success\":false,\"error\":\"Empty image data\"}";
                }
                if (base64Data.contains(",")) {
                    base64Data = base64Data.substring(base64Data.indexOf(",") + 1);
                }
                byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
                if (bytes == null || bytes.length == 0) {
                    return "{\"success\":false,\"error\":\"Base64 decode failed\"}";
                }

                if (filename == null || filename.isEmpty()) {
                    filename = "AX_QR_" + System.currentTimeMillis() + ".png";
                }
                if (!filename.endsWith(".png")) {
                    filename += ".png";
                }

                ContentResolver resolver = context.getContentResolver();
                Uri imageUri = null;

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues values = new ContentValues();
                    values.put(MediaStore.Images.Media.DISPLAY_NAME, filename);
                    values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
                    values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/AX QR Studio");
                    values.put(MediaStore.Images.Media.IS_PENDING, 1);

                    imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                    if (imageUri != null) {
                        try (OutputStream out = resolver.openOutputStream(imageUri)) {
                            if (out != null) out.write(bytes);
                        }
                        values.clear();
                        values.put(MediaStore.Images.Media.IS_PENDING, 0);
                        resolver.update(imageUri, values, null, null);
                    }
                } else {
                    File picturesDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "AX QR Studio");
                    if (!picturesDir.exists()) picturesDir.mkdirs();
                    File imageFile = new File(picturesDir, filename);
                    try (FileOutputStream out = new FileOutputStream(imageFile)) {
                        out.write(bytes);
                    }
                    MediaScannerConnection.scanFile(context, new String[]{imageFile.getAbsolutePath()}, new String[]{"image/png"}, null);
                    imageUri = Uri.fromFile(imageFile);
                }

                final String finalFilename = filename;
                runOnUiThread(() -> Toast.makeText(context, "Saved to Gallery: " + finalFilename, Toast.LENGTH_LONG).show());
                return "{\"success\":true,\"filename\":\"" + filename + "\",\"path\":\"Pictures/AX QR Studio/" + filename + "\"}";
            } catch (Exception e) {
                Log.e(TAG, "Error saving image to gallery", e);
                return "{\"success\":false,\"error\":\"" + e.getMessage() + "\"}";
            }
        }

        /**
         * Downloads a file (SVG, PNG, etc.) to Downloads folder.
         */
        @JavascriptInterface
        public String downloadFile(String dataOrBase64, String filename, String mimeType) {
            try {
                if (dataOrBase64 == null || dataOrBase64.isEmpty()) {
                    return "{\"success\":false,\"error\":\"Empty file data\"}";
                }
                byte[] bytes;
                if (dataOrBase64.startsWith("data:") || dataOrBase64.contains(";base64,")) {
                    String base64 = dataOrBase64.substring(dataOrBase64.indexOf(",") + 1);
                    bytes = Base64.decode(base64, Base64.DEFAULT);
                } else if (mimeType.contains("svg") || dataOrBase64.trim().startsWith("<svg") || dataOrBase64.trim().startsWith("<?xml")) {
                    bytes = dataOrBase64.getBytes(StandardCharsets.UTF_8);
                } else {
                    bytes = Base64.decode(dataOrBase64, Base64.DEFAULT);
                }

                if (filename == null || filename.isEmpty()) {
                    filename = "AX_QR_" + System.currentTimeMillis();
                }

                ContentResolver resolver = context.getContentResolver();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues values = new ContentValues();
                    values.put(MediaStore.Downloads.DISPLAY_NAME, filename);
                    values.put(MediaStore.Downloads.MIME_TYPE, mimeType);
                    values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/AX QR Studio");
                    values.put(MediaStore.Downloads.IS_PENDING, 1);

                    Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                    if (uri != null) {
                        try (OutputStream out = resolver.openOutputStream(uri)) {
                            if (out != null) out.write(bytes);
                        }
                        values.clear();
                        values.put(MediaStore.Downloads.IS_PENDING, 0);
                        resolver.update(uri, values, null, null);
                    }
                } else {
                    File downloadDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "AX QR Studio");
                    if (!downloadDir.exists()) downloadDir.mkdirs();
                    File file = new File(downloadDir, filename);
                    try (FileOutputStream out = new FileOutputStream(file)) {
                        out.write(bytes);
                    }
                    MediaScannerConnection.scanFile(context, new String[]{file.getAbsolutePath()}, new String[]{mimeType}, null);
                }

                final String finalFilename = filename;
                runOnUiThread(() -> Toast.makeText(context, "Downloaded: " + finalFilename, Toast.LENGTH_LONG).show());
                return "{\"success\":true,\"filename\":\"" + filename + "\"}";
            } catch (Exception e) {
                Log.e(TAG, "Error downloading file", e);
                return "{\"success\":false,\"error\":\"" + e.getMessage() + "\"}";
            }
        }

        /**
         * Native Share Intent with real PNG image attachment.
         */
        @JavascriptInterface
        public boolean shareImage(String base64Data, String title, String text) {
            try {
                if (base64Data == null || base64Data.isEmpty()) return false;
                if (base64Data.contains(",")) {
                    base64Data = base64Data.substring(base64Data.indexOf(",") + 1);
                }
                byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);

                File cacheDir = new File(context.getCacheDir(), "shared_images");
                if (!cacheDir.exists()) cacheDir.mkdirs();
                File sharedFile = new File(cacheDir, "ax_qr_code.png");
                try (FileOutputStream out = new FileOutputStream(sharedFile)) {
                    out.write(bytes);
                }

                Uri contentUri = FileProvider.getUriForFile(context, context.getPackageName() + ".fileprovider", sharedFile);

                Intent shareIntent = new Intent(Intent.ACTION_SEND);
                shareIntent.setType("image/png");
                shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
                if (text != null && !text.isEmpty()) {
                    shareIntent.putExtra(Intent.EXTRA_TEXT, text);
                }
                shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

                Intent chooser = Intent.createChooser(shareIntent, title != null && !title.isEmpty() ? title : "Share QR Code");
                chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(chooser);
                return true;
            } catch (Exception e) {
                Log.e(TAG, "Error sharing image", e);
                return false;
            }
        }

        /**
         * Native Share Intent for plain text / URL.
         */
        @JavascriptInterface
        public boolean shareText(String text, String title) {
            try {
                Intent shareIntent = new Intent(Intent.ACTION_SEND);
                shareIntent.setType("text/plain");
                shareIntent.putExtra(Intent.EXTRA_TEXT, text);
                Intent chooser = Intent.createChooser(shareIntent, title != null ? title : "Share");
                chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(chooser);
                return true;
            } catch (Exception e) {
                Log.e(TAG, "Error sharing text", e);
                return false;
            }
        }

        /**
         * Native Vibration.
         */
        @JavascriptInterface
        public void vibrate(long milliseconds) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    VibratorManager vibratorManager = (VibratorManager) context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
                    if (vibratorManager != null) {
                        Vibrator vibrator = vibratorManager.getDefaultVibrator();
                        vibrator.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE));
                    }
                } else {
                    Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
                    if (vibrator != null && vibrator.hasVibrator()) {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            vibrator.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE));
                        } else {
                            vibrator.vibrate(milliseconds);
                        }
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Vibrate error", e);
            }
        }

        /**
         * Copy text to native system clipboard.
         */
        @JavascriptInterface
        public boolean copyToClipboard(String text) {
            try {
                ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData clip = ClipData.newPlainText("AX QR Studio", text);
                clipboard.setPrimaryClip(clip);
                runOnUiThread(() -> Toast.makeText(context, "Copied to clipboard!", Toast.LENGTH_SHORT).show());
                return true;
            } catch (Exception e) {
                Log.e(TAG, "Copy error", e);
                return false;
            }
        }

        /**
         * Read text from native system clipboard.
         */
        @JavascriptInterface
        public String getClipboardText() {
            try {
                ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
                if (clipboard != null && clipboard.hasPrimaryClip()) {
                    ClipData clip = clipboard.getPrimaryClip();
                    if (clip != null && clip.getItemCount() > 0) {
                        CharSequence text = clip.getItemAt(0).getText();
                        return text != null ? text.toString() : "";
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Get clipboard error", e);
            }
            return "";
        }
    }
}
