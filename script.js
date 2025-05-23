document.addEventListener('DOMContentLoaded', () => {
    // Ensure body starts with opacity 1 if no JS fade-in is needed, or let CSS handle it
    // The CSS already sets initial opacity to 0 and fades in.

    const links = document.querySelectorAll('nav a'); // Or any other links you want to apply this to

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Prevent default navigation if it's an internal link and not opening in a new tab
            if (href && href.startsWith('/') || href.includes('.html')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 450); // Match timeout to CSS animation duration (slightly less)
            }
        });
    });

    // Remove fade-out class if user navigates back with browser buttons
    window.addEventListener('pageshow', function(event) {
       if (event.persisted) { // Check if page is from bfcache
           document.body.classList.remove('fade-out');
           // Re-trigger fade-in if needed, though CSS should handle it on new load
           // Ensure opacity is reset if it was stuck at 0 from fade-out
           document.body.style.opacity = '0'; // Reset opacity for CSS animation
           // Force reflow/repaint to ensure animation restarts
           void document.body.offsetWidth; 
           document.body.style.animation = 'none'; // Temporarily remove animation
           setTimeout(() => { // Re-apply animation
               document.body.style.animation = '';
               document.body.style.opacity = ''; // Let CSS control opacity again
           }, 0);
       }
    });

    // Theme Switcher Logic
    const themeSwitcherButton = document.getElementById('theme-switcher');
    const currentTheme = localStorage.getItem('theme');

    function setTheme(theme) { // Corrected function name from setTeam to setTheme
       if (theme === 'dark') {
           document.body.classList.add('dark-mode');
           themeSwitcherButton.textContent = '☀️'; // Sun icon for light mode
           localStorage.setItem('theme', 'dark');
       } else {
           document.body.classList.remove('dark-mode');
           themeSwitcherButton.textContent = '🌓'; // Moon icon for dark mode
           localStorage.setItem('theme', 'light');
       }
    }
    
    if (currentTheme) {
       setTheme(currentTheme); // Corrected function name
    } else {
       // Default to light mode if no theme is stored
       setTheme('light'); // Corrected function name
    }

    themeSwitcherButton.addEventListener('click', () => {
        let theme = 'light';
        if (!document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        setTheme(theme); // Corrected function name
    });
});
