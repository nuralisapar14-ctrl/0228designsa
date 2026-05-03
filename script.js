document.addEventListener('DOMContentLoaded', () => {
    const riskFill = document.getElementById('riskFill');
    const panels = document.querySelectorAll('.panel');
    const counter = document.getElementById('panel-counter');
    const progressBar = document.getElementById('progress-bar');
    const aiToggle = document.getElementById('ai-toggle');
    const images = document.querySelectorAll('.panel img');

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Обновление шкалы риска
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // Обновление счетчика страниц
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / 8`;
                if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
            }
        });

        // Тряска полностью удалена отсюда
    });

    // Логика переключения ИИ-фоток
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            images.forEach(img => {
                let src = img.getAttribute('src');
                if (aiToggle.checked) {
                    img.setAttribute('src', src.replace('.jpg', '_ai.jpg'));
                } else {
                    img.setAttribute('src', src.replace('_ai.jpg', '.jpg'));
                }
            });
        });
    }
});

function handleSurvey(ans) {
    document.querySelector('.survey-btns').style.display = 'none';
    document.getElementById('survey-thanks').style.display = 'block';
}
