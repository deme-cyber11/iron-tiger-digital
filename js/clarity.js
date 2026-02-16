/**
 * Microsoft Clarity — Heatmaps & Session Recordings
 *
 * To activate:
 * 1. Create a free project at https://clarity.microsoft.com/
 * 2. Get your Project ID (e.g., "abc123xyz")
 * 3. Replace YOUR_PROJECT_ID below with your actual ID
 *
 * Clarity does not use cookies — it stores data in localStorage.
 * No cookie consent required, but disclosed in our privacy policy.
 */

(function() {
    var CLARITY_ID = 'YOUR_PROJECT_ID';

    // Don't load until a real project ID is set
    if (CLARITY_ID === 'YOUR_PROJECT_ID') return;

    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_ID);
})();
