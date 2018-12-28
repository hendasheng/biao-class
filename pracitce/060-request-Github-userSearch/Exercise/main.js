; (function () {
    'use strict';

    let form = document.getElementById('search-form');
    let input = form.querySelector('[name=keyword]');
    let userList = document.getElementById('user-list');

    boot();

    function boot() {
        bindEvents();
    }

    /**
     * 绑定 提交事件
     * 当 form 提交时
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            // 找到 搜索框中的关键字
            let keyword = input.value;
            // 启动搜索函数，传入找到的关键词
            search(keyword);
        });
    }

    /**
     * 搜索
     * @param {String} keyword
     */
    function search(keyword) {
        // 提取数据
        let http = new XMLHttpRequest();
        http.open('get', `https://api.github.com/search/users?q=${keyword}`);
        http.send();

        http.addEventListener('load', () => {
            let data = JSON.parse(http.responseText);
            // 找到数据后执行 渲染函数，传入找到的数据
            render(data);
        })
    }


    /**
     * 根据传回的数据渲染页面
     * @param {Array} data - 异步请求拿回的数据
     */
    function render(data) {
        // 每次渲染前清空用户列表
        userList.innerHTML = '';

        // 循环数据中的每一条 - 每一条代表每一个用户信息
        data.items.forEach(it => {
            // 创建包含用户信息的 html 元素
            let item = document.createElement('div');
            // 添加类名
            item.classList.add('item');
            // 填充内容
            item.innerHTML = `
                        <div class="avatar">
                            <a href=${it.html_url}>
                                <img src=${it.avatar_url}>
                            </a>
                        </div>
                        <div class="desc">
                            <div class="username">
                                <a href=${it.html_url}>${it.login}</a>
                            </div>
                            <div class="html_url">
                                <a href=${it.html_url}>${it.html_url}</a>
                            </div>
                        </div>
                        
                   
                    `;

            // 将填充好的 item 插入到 userList 中
            userList.appendChild(item);
        });
    }

})();