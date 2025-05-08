// Анимация появления блоков при прокрутке
function onVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(onVisible, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    // Анимация для отзывов и статистики
    document.querySelectorAll('[data-animate], .review').forEach(el => {
        observer.observe(el);
    });

    // Анимированная статистика
    document.querySelectorAll('.stat-value[data-animate]').forEach(el => {
        const target = +el.getAttribute('data-animate');
        let current = 0;
        let step = Math.max(1, Math.floor(target / 60));
        function animate() {
            if (current < target) {
                current += step;
                if (current > target) current = target;
                el.textContent = current.toLocaleString('ru-RU');
                requestAnimationFrame(animate);
            } else {
                el.textContent = target.toLocaleString('ru-RU');
            }
        }
        // Запуск анимации только когда элемент видим
        const statObs = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                animate();
                obs.unobserve(el);
            }
        }, { threshold: 0.5 });
        statObs.observe(el);
    });
}); 