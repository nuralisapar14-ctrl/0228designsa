document.addEventListener('DOMContentLoaded', () => {
    
    // Переменные для элементов
    const riskFill = document.getElementById('riskFill');
    const vignette = document.querySelector('.vignette');
    const progressBar = document.getElementById('progress-bar');
    const counter = document.getElementById('panel-counter');
    const body = document.body;

    // 1. ЛОГИКА СКРОЛЛА (Объединенная)
    window.addEventListener('scroll', () => {
        const panels = document.querySelectorAll('.panel');
        const reveals = document.querySelectorAll('.reveal');
        const scrollPos = window.scrollY + window.innerHeight / 2;
        const totalPanels = 8;

        // Вычисляем общий прогресс страницы для Риск-метра и Виньетки
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // --- НОВЫЕ ФУНКЦИИ (Риск и Виньетка) ---
        if (riskFill) riskFill.style.height = scrollPercent + '%';

        // Усиливаем тень по мере спуска (Туннельное зрение)
        if (vignette) {
            const intensity = 150 + (scrollPercent * 1.5);
            vignette.style.boxShadow = `inset 0 0 ${intensity}px rgba(0, 0, 0, 0.95)`;
        }

        // Тряска экрана на финишной прямой (больше 85%)
        if (scrollPercent > 85) {
            body.classList.add('shake-active');
        } else {
            body.classList.remove('shake-active');
        }

        // --- ПЛАВНОЕ ПОЯВЛЕНИЕ (Reveal) ---
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });

        // --- СТАРЫЕ ФУНКЦИИ (Счетчик и прогресс-бар комикса) ---
        panels.forEach((panel, index) => {
            if (scrollPos >= panel.offsetTop && scrollPos < (panel.offsetTop + panel.offsetHeight)) {
                // Обновляем текст (Panel 1 / 8)
                if (counter) counter.innerText = `Panel ${index + 1} / ${totalPanels}`;
                
                // Обновляем красную полоску в шапке
                if (progressBar) {
                    let panelProgress = ((index + 1) / totalPanels) * 100;
                    progressBar.style.width = panelProgress + '%';
                }
            }
        });
    });
});

// 2. ФУНКЦИЯ СКАЧИВАНИЯ (Вне скролла)
function downloadComic() {
    const btn = document.querySelector('.btn-download');
    btn.innerText = "PREPARING...";
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'comic.pdf'; // Файл должен лежать в папке с index.html
        link.download = 'Odds_Against_Life_Comic.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.innerText = "DONE!";
        setTimeout(() => btn.innerText = "DOWNLOAD FULL PDF", 2000);
    }, 1000);
}
