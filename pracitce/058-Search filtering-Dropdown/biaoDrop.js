; (function () {
    'use strict';

    window.biaoDrop = {
        boot
    };

    /**
     * 启动
     *
     * @param {string} selector - Dropdown 的容器选择器
     * @param {Array} list - 用于渲染的数据
     * @param {Object} config 其他配置项
     */
    function boot(selector, list, config) {
        // 找到 Drop 的容器
        let container = document.querySelector(selector);
        container.$list = list;

        // 准备
        prepare(container);
        render(container, list);
        bindSelect(container, config);
    }

    /**
     * 准备基础洁面
     * @param {*} container
     */
    function prepare(container) {
        // 填充基础 html 结构
        container.innerHTML = `
                                <div class="dropdown">
                                    <div class="filter">
                                        <input type="search">
                                    </div>
                                    <div class="list"></div>
                                </div>
                            `;
        // 把 list(存放数据的元素) 缓存到 container 中（把 list 缓存到 mian 中）
        container._list = container.querySelector('.list');
    }

    /**
     * 渲染 数据
     *
     * @param {string} container
     * @param {Array} list
     */
    function render(container, list) {
        // 选中已缓存的 list 元素
        let el = container._list;
        // 每次渲染前清空
        el.innerHTML = '';
        // 循环每条数据
        // 如 list = [{id:1, name:'whh'}, {id:2, name:'lsd'}, {id:3, name:'zks'}]
        // it 就是其中每一条数据
        list.forEach(it => {
            // 创建包含 it 的元素
            // 添加 类名
            // 得到 <div class="item"> </div>
            let item = document.createElement('div');
            item.classList.add('item');

            // 把每条数据缓存到 item 元素中
            item.$data = it;
            // 填充 item
            item.innerText = it.name;
            // 把填充好的 item 插入到 list 元素中
            el.appendChild(item);
        });
    }

    /**
     * 
     * @param {HTMLElement} container
     * @param {Object} config
     */
    function bindSelect(container, config) {
        // 找到 config
        let onSelect = config.onSelect;

        // 给每个 list 绑定点击事件
        container._list.addEventListener('click', e => {
            // 根据被点击的 list 获取相对应数据
            let data = e.target.$data;

            onSelect && onSelect(data);
        });
    }

})();