function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

function getThemePreference() {
    return localStorage.getItem('theme') || 'light';
}

document.addEventListener('DOMContentLoaded', () => {
    const theme = getThemePreference();
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

document.getElementById('theme-icon').addEventListener('click', () => {
    const currentTheme = getThemePreference();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    saveThemePreference(newTheme);

    if (newTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

document.getElementById('minimize').addEventListener('click', () => {
    window.cloppy.minimize();
});

document.getElementById('close').addEventListener('click', () => {
    window.cloppy.close();
});

document.addEventListener('DOMContentLoaded', () => {
    window.cloppy.onClipboardHistoryUpdate((clipboardHistory) => {
        const historyList = document.getElementById('clipboard-history');
        historyList.innerHTML = '';

        clipboardHistory.forEach(item => {
            const listItem = `
            <li class="list-group-item">
                <div class="content">
                    <p class="text">${item}</p>
                </div>
                <button class="delete-btn" data-text="${item}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </li>
        `;
            historyList.innerHTML += listItem;
        });

        historyList.querySelectorAll('.list-group-item').forEach(item => {
            item.addEventListener('click', () => {
                const text = item.querySelector('.text').textContent;
                window.cloppy.setClipboardText(text);
            });
        });

        historyList.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const textToDelete = button.getAttribute('data-text');
                window.cloppy.removeFromClipboardHistory(textToDelete);
            });
        });
    });
});
