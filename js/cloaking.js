// Функция определения бота
function isBot(userAgent) {
    const botPatterns = [
        /bot\b/i,
        /crawler\b/i,
        /spider\b/i,
        /googlebot\b/i,
        /yandexbot\b/i,
        /facebook\b/i,
        /adsbot\b/i,
        /mediapartners\b/i
    ];
    
    // Проверяем наличие JavaScript
    if (typeof window === 'undefined') {
        return true;
    }
    
    // Проверяем наличие современных возможностей браузера
    if (!window.localStorage || !window.sessionStorage) {
        return true;
    }
    
    return botPatterns.some(pattern => pattern.test(userAgent));
}

// Функция определения рекламной сети
function isAdNetwork(referrer) {
    const adNetworks = [
        'google.com',
        'facebook.com',
        'yandex.ru',
        'bing.com'
    ];
    
    return adNetworks.some(network => referrer.includes(network));
}

// Функция определения типа посетителя
function determineVisitorType() {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    
    if (isBot(userAgent)) {
        return 'bot';
    }
    
    if (isAdNetwork(referrer)) {
        return 'ad_network';
    }
    
    return 'real_user';
}

// Функция показа контента для определенного типа посетителя
function showContentForVisitor(visitorType) {
    // Скрываем все версии контента
    document.querySelectorAll('.content-version').forEach(el => {
        el.style.display = 'none';
    });
    
    // Показываем нужную версию
    const targetContent = document.querySelector(`.content-${visitorType}`);
    if (targetContent) {
        targetContent.style.display = 'block';
    }
}

// Функция безопасного редиректа
function safeRedirect(url) {
    // Добавляем случайную задержку
    const delay = Math.random() * 1000 + 500;
    
    // Создаем промежуточную страницу
    const intermediatePage = document.createElement('div');
    intermediatePage.innerHTML = `
        <div class="loading" style="text-align: center; padding: 2rem;">
            <h2>Загрузка...</h2>
            <p>Пожалуйста, подождите</p>
        </div>
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(intermediatePage);
    
    // Выполняем редирект через промежуточную страницу
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

// Функция проверки поведения пользователя
function checkUserBehavior() {
    let mouseMovements = 0;
    let clicks = 0;
    let lastMoveTime = Date.now();
    
    document.addEventListener('mousemove', () => {
        mouseMovements++;
        lastMoveTime = Date.now();
    });
    
    document.addEventListener('click', () => {
        clicks++;
    });
    
    // Проверяем поведение только если прошло достаточно времени
    setTimeout(() => {
        const timeSinceLastMove = Date.now() - lastMoveTime;
        // Если пользователь ведет себя как бот и прошло достаточно времени
        if (mouseMovements < 10 && clicks < 2 && timeSinceLastMove > 5000) {
            showContentForVisitor('bot');
        }
    }, 5000);
}

// Функция для тестирования разных версий
function testVersion(version) {
    console.log(`Тестирование версии: ${version}`);
    showContentForVisitor(version);
}

// Функция для получения параметров из URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем параметр test_version в URL
    const testVersion = getUrlParameter('test_version');
    
    if (testVersion && ['bot', 'ad_network', 'real_user'].includes(testVersion)) {
        console.log(`Тестирование версии через URL: ${testVersion}`);
        showContentForVisitor(testVersion);
    } else {
        const visitorType = determineVisitorType();
        showContentForVisitor(visitorType);
        checkUserBehavior();
    }
    
    // Добавляем панель тестирования
    addTestButtons();
    
    // Выводим информацию о текущем определении
    console.log('User Agent:', navigator.userAgent);
    console.log('Referrer:', document.referrer);
    console.log('Определенный тип посетителя:', visitorType);
});
/*
// Обновляем функцию addTestButtons для работы с URL
function addTestButtons() {
    const testPanel = document.createElement('div');
    testPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px;
        border-radius: 5px;
        z-index: 9999;
    `;
    
    const versions = ['bot', 'ad_network', 'real_user'];
    versions.forEach(version => {
        const button = document.createElement('button');
        button.textContent = `Тест: ${version}`;
        button.style.cssText = `
            margin: 5px;
            padding: 5px 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        button.onclick = () => {
            // Обновляем URL с новым параметром
            const url = new URL(window.location.href);
            url.searchParams.set('test_version', version);
            window.history.pushState({}, '', url);
            testVersion(version);
        };
        testPanel.appendChild(button);
    });
    
    document.body.appendChild(testPanel);
} */