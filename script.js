document.addEventListener('DOMContentLoaded', () => {
    const aiToggle = document.getElementById('ai-toggle');
    const images = document.querySelectorAll('.panel img');
    const riskFill = document.getElementById('riskFill');
    const counter = document.getElementById('panel-counter');
    const progressBar = document.getElementById('progress-bar');
    const panels = document.querySelectorAll('.panel');

    // --- 1. ТВОЯ ЛОГИКА СКРОЛЛА (Риск, Счетчик, Тряска) ---
    window.addEventListener('scroll', () => {
        // Вычисляем общий процент прокрутки всей страницы
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;

        // Обновляем Риск-метр
        if (riskFill) {
            riskFill.style.height = scrollPercent + '%';
        }

        // Обновляем счетчик панелей и верхний прогресс-бар
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            
            // Появление панелей (плавный вход)
            if (rect.top < window.innerHeight - 100) {
                panel.classList.add('active');
            }

            // Обновление цифр (Panel 1/8)
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (counter) counter.innerText = `Panel ${index + 1} / 8`;
                if (progressBar) progressBar.style.width = ((index + 1) / 8 * 100) + '%';
            }

            // Эффект глитча на картинках, если риск выше 75%
            const img = panel.querySelector('img');
            if (img) {
                if (scrollPercent > 75) {
                    img.classList.add('glitch-mode');
                } else {
                    img.classList.remove('glitch-mode');
                }
            }
        });

        // Тряска экрана (если риск выше 90%)
        if (scrollPercent > 90) {
            document.body.style.animation = "shake 0.2s infinite";
        } else {
            document.body.style.animation = "none";
        }
    });

    // --- 2. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ AI MODE ---
    if (aiToggle) {
        aiToggle.addEventListener('change', () => {
            images.forEach(img => {
                let currentSrc = img.getAttribute('src');
                
                if (aiToggle.checked) {
                    // Включаем ИИ: меняем .jpg на _ai.jpg
                    if (!currentSrc.includes('_ai.jpg')) {
                        img.setAttribute('src', currentSrc.replace('.jpg', '_ai.jpg'));
                    }
                } else {
                    // Выключаем ИИ: возвращаем оригинал
                    img.setAttribute('src', currentSrc.replace('_ai.jpg', '.jpg'));
                }
            });
        });
    }
});

// --- 3. ФУНКЦИЯ ОПРОСА (Вынесена из DOMContentLoaded) ---
function handleSurvey(answer) {
    const thanksMsg = document.getElementById('survey-thanks');
    const surveyBtns = document.querySelector('.survey-btns');
    
    if (surveyBtns) surveyBtns.style.display = 'none';
    if (thanksMsg) thanksMsg.style.display = 'block';
    
    console.log("User feedback choice:", answer);
}
