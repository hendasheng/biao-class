; (function () {
    'use strict';

    let form = document.getElementById('search-form');
    let searchInput = form.querySelector('[name=keyword]');
    let userList = document.getElementById('user-list');

    boot();
    function boot() {
        bindEvents();
    }


    /**
     * 绑定提交事件
     * 当 form 提交时，启动 搜索
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let keyword = searchInput.value;
            if (keyword)
                search(keyword);
            else
                return;
        });
    };


    /**
     * 根据 keyword 搜索
     * 通过 API 获取数据，把取得的数据传给 渲染函数
     * @param {String} keyword
     */
    function search(keyword) {
        let http = new XMLHttpRequest();
        http.open('get', `https://api.github.com/search/users?q=${keyword}`);
        http.send();

        http.addEventListener('load', () => {
            let data = JSON.parse(http.responseText);
            render(data);
        });
    };

    /**
     * 渲染 userList
     * 循环每条数据，并插入到 HTML 结构中
     * @param {Array} data
     */
    function render(data) {
        userList.innerHTML = '';
        data.items.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                            <div class="avatar">
                                <a href="${it.html_url}">
                                    <img src="${it.avatar_url}" alt="">
                                </a>
                            </div>
                            <div class="desc">
                                <div class="username">
                                    <a href="${it.html_url}">${it.login}</a>
                                </div>
                                <div class="html_url">
                                    <a href="${it.html_url}">${it.html_url}</a>
                                </div>
                            </div>
                            `;
            userList.appendChild(item);
        });
    }

})();