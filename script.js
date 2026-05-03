document.addEventListener('DOMContentLoaded', () => {
    const riskFill = document.getElementById('riskFill');
    const progressBar = document.getElementById('progress-bar');
    const counter = document.getElementById('panel-counter');
    const panels = document.querySelectorAll('.panel');

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Обновляем шкалу риска
        if (riskFill) {
            riskFill.style.height = scrollPercent + '%';
        }

        // Логика счетчика панелей
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / 8`;
                if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
            }
        });
    });
});
