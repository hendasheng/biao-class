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
     *
     * 提交后获取 搜索关键字
     * 如果获取关键字，则传到 搜索函数中
     * 如果没有关键字，则直接返回
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
     * 通过关键字搜索
     * 
     * 通过 API 拿到数据
     * 取得数据后，解析并传给 渲染函数 
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
    }


    /**
     * 渲染数据
     * 循环每条数据，填充到 HTML 结构中
     *
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
                                        <img src="${it.avatar_url}">
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