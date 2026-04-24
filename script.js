window.addEventListener('scroll', () => {
    const panels = document.querySelectorAll('.panel');
    const scrollPos = window.scrollY + window.innerHeight / 2;
    const total = 8; // We have 8 panels now

    // LOOP: Check position of each panel
    panels.forEach((panel, index) => {
        // CONDITION: If current view is within panel boundaries
        if (scrollPos >= panel.offsetTop && scrollPos < (panel.offsetTop + panel.offsetHeight)) {
            
            // Update the Counter text
            const counter = document.getElementById('panel-counter');
            if (counter) counter.innerText = `Panel ${index + 1} / ${total}`;
            
            // Update the Progress Bar width
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                let progress = ((index + 1) / total) * 100;
                progressBar.style.width = progress + '%';
            }
        }
    });
});
