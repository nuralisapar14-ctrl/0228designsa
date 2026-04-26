window.addEventListener('scroll', () => {
    // Находим все панели комикса
    const panels = document.querySelectorAll('.panel');
    
    // Определяем позицию скролла (центр экрана)
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    // Всего 8 страниц
    const total = 8; 

    // Цикл проверки для каждой панели
    panels.forEach((panel, index) => {
        // Условие: если центр экрана находится в пределах этой панели
        if (scrollPos >= panel.offsetTop && scrollPos < (panel.offsetTop + panel.offsetHeight)) {
            
            // 1. Обновляем текст счетчика
            const counter = document.getElementById('panel-counter');
            if (counter) {
                counter.innerText = `Panel ${index + 1} / ${total}`;
            }
            
            // 2. Высчитываем ширину полоски (алгоритм прогресса)
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                let progressPercentage = ((index + 1) / total) * 100;
                progressBar.style.width = progressPercentage + '%';
            }
        }
    });
});
