// 01 - 获取数据 read()
//      缓存取得的数据到全文变量，方便以后调用
//      获取数据后渲染 render()

// 02 - 绑定提交事件 bindEvents()
//      获取输入框中输入的内容 listTitle
//      通过 create(listTitle) 在数据库中创建一条 list

// 03 - 在数据库中创建一条 list create(row)
//      通过 api(action, row)

// 04 - 渲染 todo-list
//      循环取得的数据，渲染每一条

; (function () {
    'use strict';

    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name="title"]');
    let list = document.getElementById('todo-list');

    let $list;

    boot();

    function boot() {
        read();
        bindEvents();

    }

    /**
     * 获取数据
     */
    function read() {
        api('todo/read', null, data => {
            $list = data.data;
            // 取得数据后渲染
            render();
        });
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;
            // {title: title} ==> {title}
            create({ title });
            form.reset();
        });
    }

    /**
     * 在数据库中创建一条 list
     * @param {Object} row
     */
    function create(row) {
        api('todo/create', row, result => {
            // 创建成功后
            if (result) {
                // 重新获取数据
                read();
            }
        });
    }

    /**
     * 渲染数据
     */
    function render() {
        list.innerHTML = '';
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
                                                        // ↓ 
            item.innerHTML = `
                            <div class="checkbox">
                                <input type="checkbox" ${it.completed ? checked : ''}>
                            </div>
                            <div class="title">
                                ${it.title}
                            </div>
                            <div class="operations">
                                <button class="update">更新</button>
                                <button class="delete">删除</button>
                            </div>
                            `;

            list.appendChild(item);
        });
    }

})();