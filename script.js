document.addEventListener('DOMContentLoaded', () => {
    const riskFill = document.getElementById('riskFill');
    const progressBar = document.getElementById('progress-bar');
    const counter = document.getElementById('panel-counter');
    const panels = document.querySelectorAll('.panel');
    const aiToggle = document.getElementById('ai-toggle');
    const images = document.querySelectorAll('.panel img');

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Риск-метр
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // Счетчик и прогресс панелей
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / ${panels.length}`;
                if (progressBar) progressBar.style.width = ((index + 1) / panels.length * 100) + '%';
            }
        });
    });

    // AI MODE логика
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            images.forEach(img => {
                let currentSrc = img.getAttribute('src');
                if (aiToggle.checked) {
                    // заменяет "page1.jpg" на "page1_ai.jpg"
                    img.setAttribute('src', currentSrc.replace('.jpg', '_ai.jpg'));
                } else {
                    img.setAttribute('src', currentSrc.replace('_ai.jpg', '.jpg'));
                }
            });
        });
    }
});
