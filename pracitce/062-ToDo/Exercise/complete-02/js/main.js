; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    let $list;

    let currentId = null;

    boot();

    function boot() {
        read();
        bindEvents();
    }

    function read() {
        api('todo/read', null, result => {
            $list = result.data;
            render();
        })
    }

    function bindEvents() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;
            if (currentId)
                update({ id: currentId, title });
            else
                create({ title });
        })
    }

    function create(row) {
        api('todo/create', row, result => {
            if (result)
                read();
            todoForm.reset();
        })
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
                        <div class="title">${it.title}</div>
                        <div class="operation">
                            <button class="fill">更新</button>
                            <button class="delete">删除</button>
                        </div>
                        `;

            let checkbox = item.querySelector('.completed');
            let operation = item.querySelector('.operation');

            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            })

            operation.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('fill')) {
                    input.value = it.title;
                    currentId = it.id;
                }
                if (target.classList.contains('delete'))
                    remove(it.id);
            })


            list.appendChild(item);
        });
    }

    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                read();
        })
    }

    function remove(id) {
        api('todo/delete', { id }, result => {
            if (result)
                read();
        })
    }

    function update(row) {
        api('todo/update', row, result => {
            currentId = null;
            if (result)
                read();
            todoForm.reset();
        })
    }

})()