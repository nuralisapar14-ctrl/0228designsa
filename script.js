window.addEventListener('scroll', () => {
    const riskFill = document.getElementById('riskFill');
    const panels = document.querySelectorAll('.panel');
    const counter = document.getElementById('panel-counter');
    const progressBar = document.getElementById('progress-bar');

    // 1. Вычисляем общий процент прокрутки всей страницы
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollTotal) * 100;

    // 2. Обновляем Риск-метр (3 функция)
    if (riskFill) {
        riskFill.style.height = scrollPercent + '%';
    }

    // 3. Обновляем счетчик панелей и верхний прогресс-бар (Логика из Беты)
    panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        
        // Появление панелей
        if (rect.top < window.innerHeight - 100) {
            panel.classList.add('active');
        }

        // Обновление цифр (Panel 1/8)
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            if (counter) counter.innerText = `Panel ${index + 1} / 8`;
            if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
        }
    });

    // 4. Тряска экрана (если риск выше 90%)
    if (scrollPercent > 90) {
        document.body.style.animation = "shake 0.2s infinite";
    } else {
        document.body.style.animation = "none";
    }
});
