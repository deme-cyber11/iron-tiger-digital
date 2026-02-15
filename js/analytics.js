/**
 * Google Analytics 4 + Cookie Consent
 *
 * To activate:
 * 1. Create a GA4 property at https://analytics.google.com/
 * 2. Get your Measurement ID (G-XXXXXXXXXX)
 * 3. Replace GA_MEASUREMENT_ID below with your actual ID
 *
 * How it works:
 * - Shows a cookie consent banner on first visit
 * - GA4 only loads AFTER the user clicks "Accept"
 * - Consent is stored in localStorage (persists across sessions)
 * - Users can decline — GA4 never loads
 */

(function() {
    var GA_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

    // Check if GA4 is configured
    if (GA_ID === 'G-XXXXXXXXXX') return;

    var CONSENT_KEY = 'itd_cookie_consent';

    // If user already consented, load GA4 immediately
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
        loadGA4();
        return;
    }
    if (consent === 'declined') return;

    // Show consent banner
    showBanner();

    function loadGA4() {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });
    }

    function showBanner() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createBanner);
        } else {
            createBanner();
        }
    }

    function createBanner() {
        var banner = document.createElement('div');
        banner.id = 'cookie-consent';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML =
            '<div class="cookie-consent-inner">' +
                '<p>We use cookies to understand how visitors use our site so we can improve it. ' +
                'No personal data is sold. <a href="/privacy.html">Privacy Policy</a></p>' +
                '<div class="cookie-consent-buttons">' +
                    '<button id="cookie-decline" type="button">Decline</button>' +
                    '<button id="cookie-accept" type="button">Accept</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            banner.remove();
            loadGA4();
        });

        document.getElementById('cookie-decline').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'declined');
            banner.remove();
        });
    }
})();
