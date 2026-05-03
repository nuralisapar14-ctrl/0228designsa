document.addEventListener('DOMContentLoaded', () => {
    const aiToggle = document.getElementById('ai-toggle');
    const images = document.querySelectorAll('.panel img');
    const riskFill = document.getElementById('riskFill');
    const counter = document.getElementById('panel-counter');
    const progressBar = document.getElementById('progress-bar');
    const panels = document.querySelectorAll('.panel');

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // 1. Риск-метр
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // 2. Счетчик панелей и прогресс
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / 8`;
                if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
            }

            // Глитч на картинках в конце (после 80%)
            const img = panel.querySelector('img');
            if (img) {
                if (scrollPercent > 80) img.classList.add('glitch-mode');
                else img.classList.remove('glitch-mode');
            }
        });

        // 3. Тряска экрана
        if (scrollPercent > 90) {
            document.body.style.animation = "shake 0.1s infinite";
        } else {
            document.body.style.animation = "none";
        }
    });

    // 4. Логика ИИ (замена .jpg на _ai.jpg)
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            images.forEach(img => {
                let currentSrc = img.getAttribute('src');
                if (aiToggle.checked) {
                    img.setAttribute('src', currentSrc.replace('.jpg', '_ai.jpg'));
                } else {
                    img.setAttribute('src', currentSrc.replace('_ai.jpg', '.jpg'));
                }
            });
        });
    }
});

function handleSurvey(ans) {
    document.querySelector('.survey-btns').style.display = 'none';
    document.getElementById('survey-thanks').style.display = 'block';
}
