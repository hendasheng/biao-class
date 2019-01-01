; (function () {
    'use strict';

    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name=title]');
    let list = document.getElementById('todo-list');
    let currentId = null;

    // $... 代表数据
    let $list;

    boot();

    function boot() {
        read();
        bindEvents();
    }

    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;

            if (currentId)
                update(currentId, { title });
            else
                create({ title });

        });
    }


    function create(row) {
        api('todo/create', row, r => {
            if (r.success) {
                read();
                form.reset();
            }
        });
    }

    function update(id, row) {
        api('todo/update', { id, ...row }, r => {
            if (r.success) {
                currentId = null;
                read();
                form.reset();
            }
        })
    }

    /**
   * 获取事项列表
   */
    function read() {
        api('todo/read', null, r => {
            $list = r.data;
            render();
        });
    }

    function remove(id) {
        api('todo/delete', { id }, r => {
            read();
        });
    }

    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, r => {
            read();
        });
    }

    function render() {
        list.innerHTML = '';
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                            <div class="checkbox">
                                <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                            </div>
                            <div class="title">
                                ${it.title}
                            </div>
                            <div class="operations">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </div>
                            `;

            let checkbox = item.querySelector('.completed');
            let operations = item.querySelector('.operations');

            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });

            operations.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('delete'))
                    remove(it.id);

                if (target.classList.contains('fill')) {
                    currentId = it.id;
                    input.value = it.title;
                }

            });


            list.appendChild(item);
        });
    }

})();