; (function () {
    'use strict';

    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    let $list;


    boot();
    function boot() {
        read();
        bindEvents();
    }


    /**
     * 绑定表单提交事件
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            // 取得 输入框 中输入的内容
            let title = input.value;

            // submit 后清空输入框
            form.reset();

            create({ title });
        });
    }


    /**
     * 创建一条 list
     *
     * @param {Object} {row}
     */
    function create(row) {
        api('todo/create', row, result => {
            if (result.success) {
                read();
            }
        });
    }

    /**
     * 获取事项列表
     */
    function read() {
        api('todo/read', null, response => {
            $list = response.data;
            render();
        });
    }

    /**
     * 设置是否完成
     * @param {Number} id
     * @param {Boolean} completed
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, r => {
            read();
        })
    }

    /**
     * 渲染 todo-list
     */
    function render() {
        // 清空 todo-list
        list.innerHTML = '';
        // 
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                        <div class="checkbox">
                            <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                        </div>

                        <div class="title">${it.title}</div>

                        <div class="operations">
                            <button>更新</button>
                            <button>删除</button>
                        </div>
                        `;

            item._completed = item.querySelector('.completed');
            item._completed.addEventListener('change', e => {
                setCompleted(it.id, item._completed.checked);
            })
            
            list.appendChild(item);
        });
    }

})();