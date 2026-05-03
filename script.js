document.addEventListener('DOMContentLoaded', () => {
    const riskFill = document.getElementById('riskFill');
    const progressBar = document.getElementById('progress-bar');
    const counter = document.getElementById('panel-counter');
    const aiToggle = document.getElementById('ai-toggle');
    const images = document.querySelectorAll('.panel img');
    const panels = document.querySelectorAll('.panel');

    // ЛОГИКА СКРОЛЛА
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Риск-метр
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // Проверка каждой панели
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            
            // Обновление номера страницы (Panel 1/8)
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / 8`;
                if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
            }

            // Глитч на картинках в самом конце
            const img = panel.querySelector('img');
            if (img && scrollPercent > 80) {
                img.classList.add('glitch-mode');
            } else if (img) {
                img.classList.remove('glitch-mode');
            }
        });

        // Тряска экрана (риск выше 90%)
        if (scrollPercent > 90) {
            document.body.style.animation = "shake 0.15s infinite";
        } else {
            document.body.style.animation = "none";
        }
    });

    // ЛОГИКА ИИ ПЕРЕКЛЮЧАТЕЛЯ
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            images.forEach(img => {
                let currentSrc = img.getAttribute('src');
                if (aiToggle.checked) {
                    // заменяем .jpg на _ai.jpg
                    img.setAttribute('src', currentSrc.replace('.jpg', '_ai.jpg'));
                } else {
                    // возвращаем оригинал
                    img.setAttribute('src', currentSrc.replace('_ai.jpg', '.jpg'));
                }
            });
        });
    }
});

// ФУНКЦИЯ ОПРОСА
function handleSurvey(ans) {
    document.querySelector('.survey-btns').style.display = 'none';
    document.getElementById('survey-thanks').style.display = 'block';
}
