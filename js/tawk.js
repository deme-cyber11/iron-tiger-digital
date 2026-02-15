/**
 * Tawk.to Live Chat Widget
 *
 * To activate:
 * 1. Create a free account at https://www.tawk.to/
 * 2. Get your Property ID from Dashboard > Administration > Channels > Chat Widget
 * 3. Replace YOUR_PROPERTY_ID below with your actual property ID
 *
 * To disable: Simply delete this file or remove the <script> tag from your HTML pages.
 */
var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement('script');
    var s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
