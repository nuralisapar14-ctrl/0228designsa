window.addEventListener('scroll', () => {
    const panels = document.querySelectorAll('.panel');
    const scrollPos = window.scrollY + window.innerHeight / 2;
    const total = 8; 

    panels.forEach((panel, index) => {
        if (scrollPos >= panel.offsetTop && scrollPos < (panel.offsetTop + panel.offsetHeight)) {
            document.getElementById('panel-counter').innerText = `Panel ${index + 1} / ${total}`;
            let progress = ((index + 1) / total) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
        }
    });
});
