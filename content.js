(function() {
    'use strict';
    
    console.log("🎨 Roblox Electric Lime Theme - Auto Mode Enabled");
    
    const THEME_NAME = "electric-lime";
    
    // Main function to set the theme
    function setElectricLimeTheme() {
        try {
            if (window.Roblox && window.Roblox["core-scripts"] && window.Roblox["core-scripts"]["theme"]) {
                window.Roblox["core-scripts"]["theme"].setTheme(THEME_NAME);
                console.log("✅ Electric Lime theme applied!");
                return true;
            }
        } catch(e) {
            // Silently fail and retry
        }
        return false;
    }
    
    // Injects script directly into page context
    function injectAndRun() {
        if (!document.documentElement) {
            setTimeout(injectAndRun, 100);
            return;
        }
        
        const script = document.createElement('script');
        script.textContent = `
            (function() {
                console.log("🔧 Electric Lime engine started");
                
                // Function to apply Electric Lime theme
                function applyElectricLime() {
                    try {
                        if (window.Roblox && window.Roblox["core-scripts"] && window.Roblox["core-scripts"]["theme"]) {
                            window.Roblox["core-scripts"]["theme"].setTheme("electric-lime");
                            return true;
                        }
                        return false;
                    } catch(e) {
                        return false;
                    }
                }
                
                // Apply immediately
                applyElectricLime();
                
                // Keep trying forever
                let attempts = 0;
                const foreverInterval = setInterval(() => {
                    attempts++;
                    if (applyElectricLime()) {
                        clearInterval(foreverInterval);
                        // Check every 5 seconds to ensure it stays
                        setInterval(() => {
                            try {
                                if (window.Roblox && window.Roblox["core-scripts"] && window.Roblox["core-scripts"]["theme"]) {
                                    window.Roblox["core-scripts"]["theme"].setTheme("electric-lime");
                                }
                            } catch(e) {}
                        }, 5000);
                    } else if (attempts > 100) {
                        clearInterval(foreverInterval);
                        setInterval(applyElectricLime, 30000);
                    }
                }, 1000);
                
                // Intercept theme changes to prevent switching away
                if (window.Roblox && window.Roblox["core-scripts"] && window.Roblox["core-scripts"]["theme"]) {
                    const originalSetTheme = window.Roblox["core-scripts"]["theme"].setTheme;
                    window.Roblox["core-scripts"]["theme"].setTheme = function(theme) {
                        if (theme !== "electric-lime") {
                            originalSetTheme.call(this, "electric-lime");
                        } else {
                            originalSetTheme.call(this, theme);
                        }
                    };
                }
                
                // Watch for page changes (SPA navigation)
                let lastUrl = location.href;
                new MutationObserver(() => {
                    if (location.href !== lastUrl) {
                        lastUrl = location.href;
                        setTimeout(applyElectricLime, 1000);
                    }
                }).observe(document, {subtree: true, childList: true});
                
                console.log("🔒 Electric Lime theme lock engaged!");
            })();
        `;
        document.documentElement.appendChild(script);
        script.remove();
    }
    
    // Run when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectAndRun);
    } else {
        injectAndRun();
    }
    
    // Also handle URL changes
    let lastUrl = location.href;
    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            setTimeout(injectAndRun, 1000);
        }
    }).observe(document, {subtree: true, childList: true});
    
})();