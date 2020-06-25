module.exports = {
    android: [
        `<link rel="manifest" href="${output}manifest.json">`,
        `<meta name="mobile-web-app-capable" content="yes">`,
        `<meta name="theme-color" content="${background}">`,
        `<meta name="application-name" content="${appName}">`,
    ],
    appleIcon: [
        `<link rel="apple-touch-icon" sizes="${width}x${height}" href="${output}apple-touch-icon-${width}x${height}.png">`,
        `<meta name="apple-mobile-web-app-capable" content="yes">`,
        `<meta name="apple-mobile-web-app-status-bar-style" content="${appleStatusBarStyle}">`,
        `<meta name="apple-mobile-web-app-title" content="${appName}">`,
    ],
    appleStartup: [
        `<link rel="apple-touch-startup-image" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${devicePixelRatio}) and (orientation: ${orientation})"    href="${output}apple-touch-startup-image-${width}x${height}.png">`,
    ],
    coast: [
        `<link rel="icon" type="image/png" sizes="228x228" href="${output}coast-228x228.png">`,
    ],
    favicons: [
        `<link rel="shortcut icon" href="${output}favicon.ico">`,
        `<link rel="icon" type="image/png" sizes="${width}x${height}" href="${output}favicon-${width}x${height}.png">`,
    ],
    windows: [
        `<meta name="msapplication-TileColor" content="${background}">`,
        `<meta name="msapplication-TileImage" content="${output}mstile-144x144.png">`,
        `<meta name="msapplication-config" content="${output}browserconfig.xml">`,
    ],
    yandex: [
        `<link rel="yandex-tableau-widget" href="${output}yandex-browser-manifest.json">`,
    ],
};
//# sourceMappingURL=html.js.map