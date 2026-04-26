document.addEventListener('DOMContentLoaded', () => {
    
    const riskFill = document.getElementById('riskFill');
    const vignette = document.querySelector('.vignette');
    const body = document.body;

    // --- ЛОГИКА СКРОЛЛА ---
    window.addEventListener('scroll', () => {
        // Вычисляем процент прокрутки страницы
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // 1. Обновляем Риск-метр
        if (riskFill) {
            riskFill.style.height = scrollPercent + '%';
        }

        // 2. Усиливаем виньетку (Туннельное зрение)
        // Чем больше скролл, тем больше тень
        const intensity = 150 + (scrollPercent * 1.5);
        vignette.style.boxShadow = `inset 0 0 ${intensity}px rgba(0, 0, 0, 0.95)`;

        // 3. Эффект тряски при риске > 85%
        if (scrollPercent > 85) {
            body.classList.add('shake-active');
        } else {
            body.classList.remove('shake-active');
        }

        // 4. Плавное появление элементов (Reveal)
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    });
});

// --- ФУНКЦИЯ СКАЧИВАНИЯ ---
function downloadComic() {
    // Для демонстрации создаем имитацию подготовки файла
    const btn = document.querySelector('.btn-download');
    btn.innerText = "PREPARING FILE...";
    
    setTimeout(() => {
        // Создаем ссылку на скачивание (замени 'comic.pdf' на имя своего файла)
        const link = document.createElement('a');
        link.href = 'comic.pdf'; 
        link.download = 'Odds_Against_Life_Full.pdf';
        
        // Временно добавляем в документ и нажимаем
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.innerText = "DOWNLOAD STARTED";
        setTimeout(() => btn.innerText = "DOWNLOAD FULL PDF", 2000);
    }, 1500);
}
