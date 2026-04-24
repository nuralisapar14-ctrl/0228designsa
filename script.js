// Функция для отслеживания скролла и обновления счетчика
window.addEventListener('scroll', () => {
    // Получаем все элементы с классом 'panel'
    const panels = document.querySelectorAll('.panel');
    
    // Определяем текущую позицию скролла (центр экрана)
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    const totalPanels = 8; // У нас 8 страниц

    // ЦИКЛ (Loop): перебираем все панели
    panels.forEach((panel, index) => {
        // УСЛОВИЕ (Condition): если текущая позиция внутри этой панели
        if (scrollPosition >= panel.offsetTop && scrollPosition < (panel.offsetTop + panel.offsetHeight)) {
            
            // 1. Обновляем текст счетчика (Panel X / 8)
            document.getElementById('panel-counter').innerText = `Panel ${index + 1} / ${totalPanels}`;
            
            // 2. Обновляем полоску прогресса (Математический алгоритм)
            let progress = ((index + 1) / totalPanels) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
        }
    });
});
