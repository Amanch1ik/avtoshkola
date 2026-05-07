// Активный пункт меню
document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) link.classList.add('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // Счётчики в stats-bar
    animateCounters();

    // Форма записи
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!enrollForm.checkValidity()) { enrollForm.classList.add('was-validated'); return; }
            document.getElementById('formSuccess').style.display = 'block';
            enrollForm.reset();
            enrollForm.classList.remove('was-validated');
            setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 4000);
        });
    }

    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            window.location.href = 'cabinet.html';
        });
    }

    // Форма регистрации
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!regForm.checkValidity()) { regForm.classList.add('was-validated'); return; }
            window.location.href = 'cabinet.html';
        });
    }

    // Переключение разделов личного кабинета
    document.querySelectorAll('.sidebar-menu .list-group-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-menu .list-group-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const tab = item.dataset.tab;
            document.querySelectorAll('.cabinet-section').forEach(s => s.style.display = 'none');
            const target = document.getElementById('tab-' + tab);
            if (target) target.style.display = 'block';
        });
    });

    // Фильтр расписания
    const schedFilter = document.getElementById('instructorFilter');
    if (schedFilter) {
        schedFilter.addEventListener('change', filterSchedule);
    }
});

function animateCounters() {
    document.querySelectorAll('.num[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (el.dataset.suffix || '');
            if (current >= target) clearInterval(timer);
        }, 20);
    });
}

function filterSchedule() {
    const val = document.getElementById('instructorFilter').value;
    document.querySelectorAll('tr[data-instructor]').forEach(row => {
        row.style.display = (!val || row.dataset.instructor === val) ? '' : 'none';
    });
}
