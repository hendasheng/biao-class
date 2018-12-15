; (function () {
    'use strict';

    let form = document.getElementById('search-form');
    let input = form.querySelector('[name=keyword')
    let userList = document.getElementById('user-list');
    let limit = 10;

    boot();

    function boot() {
        bindEvents();
    }

    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let keyword = input.value;
            search(keyword);
        });
    }

    function search(keyword) {
        let http = new XMLHttpRequest();
        http.open('get', `https://api.github.com/search/users?q=${keyword}&per_page=${limit}`);
        http.send();
        http.addEventListener('load', () => {
            let json = http.responseText;
            let data = JSON.parse(json);
            biaoPage.boot({
                selector: '#page-container',
                limit,
                amount: data.total_count,
                onChange(page) {
                    limit = page;
                    search(keyword);
                }
            });
            render(data);
        });
    }

    function render(data) {
        userList.innerHTML = '';
        data.items.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <div class="avatar">
                    <img src="${it.avatar_url}" alt="">
                </div>
                <div class="detail">
                    <strong>${it.login}</strong>
                    <div><a href="${it.html_url}" target="_blank">${it.html_url}</a></div>
                </div>
                `;
            userList.appendChild(item);
        });
    }

})();