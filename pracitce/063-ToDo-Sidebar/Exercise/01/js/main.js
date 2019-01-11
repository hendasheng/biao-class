; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let todoInput = todoForm.querySelector('[name=title]');
    let todoList = document.getElementById('todo-list');

    let catForm = document.getElementById('cat-form');
    let catInput = catForm.querySelector('[name=name]');
    let catList = document.getElementById('cat-list');
    let addCat = document.getElementById('add-cat');
    let catBtnGroup = catForm.querySelector('.btn-group');


    // 用于储存 Todo 数据，方便以后调用
    let $todoList;

    // 用于储存 Cat 数据，方便以后调用
    let $catList;

    // 用于判断 Todo - item 是 更新 还是 创建
    let $updatingTodoId = null;

    // 用于判断 Cat - item 是 更新 还是 创建
    let $updatingCatId = null;

    // 用于区别分类的 id
    // 点击侧栏中 item 时，当前 item 的 id
    let $currentCatId = null;

    boot();
    function boot() {
        readTodo();
        readCat();
        bindEvents();
    }

    /**
     *  Todo 部分
     */

    /**
     * 从服务器获取数据 - Todo
     */
    function readTodo(params) {
        params = params || {};
        params.where = {
            and: {
                cat_id: $currentCatId,
            },
        };
        api('todo/read', params, result => {
            // 把取到的数据存到全文变量中
            $todoList = result.data || [];
            renderTodo();
            todoForm.reset();
        })
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        bindTodoSubmit();
        bindToggleCatForm();
        bindClickCatForm();
        bindCatSubmit();
    }

    /**
     * 绑定 todo 提交事件
     */
    function bindTodoSubmit() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = todoInput.value;
            // 当 更新 时， currentId 会被替换成相应的 id，如果有 currentId 说明此时应该执行 更新
            if ($updatingTodoId)
                updateTodo({ id: $updatingTodoId, title })
            // 如果没有 currentId 则执行 创建
            else
                createTodo({ title });
        })
    }

    /**
     * 在服务器中创建一条 item - Todo
     * @param {Object} row 
     */
    function createTodo(row) {
        row.cat_id = $currentCatId;
        api('todo/create', row, result => {
            readTodo();
        })
    }

    /**
     * 渲染 list - Todo
     */
    function renderTodo() {
        todoList.innerHTML = '';
        $todoList.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                                <div>
                                    <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                                </div>
                                <div class="title">${it.title}</div>
                                <div class="operation">
                                    <button class="fill">更新</button>
                                    <button class="delete">删除</button>
                                </div>
                                `;


            let operation = item.querySelector('.operation');
            let checkbox = item.querySelector('.completed');

            // 当 checkbox 更新时，通过 setCompleted 设置 checkbox 状态
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });

            operation.addEventListener('click', e => {
                let target = e.target;
                // 当点击 更新 时
                if (target.classList.contains('fill')) {
                    // 把 输入框 中的内容替换成当前 title
                    todoInput.value = it.title;
                    // currentId 设置为当前 id，creat 中会根据 currentId 判断此时为 更新
                    $updatingTodoId = it.id;
                }

                if (target.classList.contains('delete'))
                    removeTodo(it.id);
            });

            // 把组装好的 item 插入到 list 中
            todoList.appendChild(item);
        });
    }

    /**
     * 删除一条 item - Todo
     * @param {Number} id 
     */
    function removeTodo(id) {
        api('todo/delete', { id }, result => {
            if (result)
                readTodo();
        })
    }

    /**
     * 更新题条 item - Todo
     * @param {Object} row 
     */
    function updateTodo(row) {
        api('todo/update', row, result => {
            // 执行更新时，currentId 设置为 null，不然 create 会一直认为是 更新
            $updatingTodoId = null;
            if (result)
                readTodo();
        })
    }

    /**
     * 设置 checkbox
     * @param {Number} id 
     * @param {Boolean} completed 
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                readTodo();
        })
    }


    /**
     *  Cat 部分
     */


    /**
     * catForm 中的点击事件（确定/取消）
     */
    function bindClickCatForm() {
        catBtnGroup.addEventListener('click', e => {
            // e.preventDefault();
            let target = e.target;
            // 如果点击 确定
            // if (target.classList.contains('sure'))
            //     console.log('Yes');

            // 如果点击取消
            if (target.classList.contains('cancel')) {
                // catForm.hidden = true;
                // addCat.hidden = false;
                catForm.hidden = !(addCat.hidden = false);
            }
        })
    }

    /**
     * 打开 或 关闭 catForm
     */
    function bindToggleCatForm() {
        addCat.addEventListener('click', e => {
            // catForm.hidden = false;
            // addCat.hidden = true;
            catForm.hidden = !(addCat.hidden = true);
        })
    }


    /**
     * 从服务器获取数据 - Cat
     */
    function readCat() {
        api('cat/read', null, result => {
            // 把取到的数据存到全文变量中
            $catList = result.data || [];
            renderCat();
            // 取到数据后隐藏 form，显示 addCat - Btn
            catForm.hidden = !(addCat.hidden = false);
            catForm.reset();
        })
    }


    /**
     * 绑定 catForm 的提交事件
     */
    function bindCatSubmit() {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            let name = catInput.value;
            if ($updatingCatId)
                updateCat({ id: $updatingCatId, name });
            else
                createCat({ name })
        })
    }


    /**
     * 在服务器中创建一条 item - Cat
     * @param {Object} row 
     */
    function createCat(row) {
        api('cat/create', row, result => {
            readCat();
        })
    }

    /**
     * 渲染 list - Cat
     */
    function renderCat() {
        catList.innerHTML = '';
        $catList.forEach(it => {
            let item = document.createElement('div');
            item.$id = it.id;
            item.classList.add('cat-item');
            item.innerHTML = `
                                <span class="name">${it.name}</span>
                                <div class="operation">
                                    <button class="fill">编辑</button>
                                    <button class="delete">删除</button>
                                </div>
                                `;


            item.addEventListener('click', e => {
                let target = e.target;
                // 当点击 更新 时
                if (target.classList.contains('fill')) {
                    catForm.hidden = !(addCat.hidden = true);
                    // 把 输入框 中的内容替换成当前 title
                    catInput.value = it.name;
                    // $updatingCatId 设置为当前 id，creat 中会根据 currentId 判断此时为 更新
                    $updatingCatId = it.id;
                }

                if (target.classList.contains('delete'))
                    removeCat(it.id);

                // if (target.classList.contains('name')) {
                $currentCatId = it.id

                highlightCurrentCat();
                readTodo();
                // }
            });

            // 把组装好的 item 插入到 list 中
            catList.appendChild(item);
        });
    }

    /**
     * 删除一条 item - Cat
     * @param {Number} id 
     */
    function removeCat(id) {
        api('cat/delete', { id }, result => {
            if (result)
                readCat();
        })
    }

    /**
     * 更新题条 item - Cat
     * @param {Object} row 
     */
    function updateCat(row) {
        api('cat/update', row, result => {
            // 执行更新时，currentId 设置为 null，不然 create 会一直认为是 更新
            $updatingCatId = null;
            if (result)
                readCat();
        })
    }

    function highlightCurrentCat() {
        let items = catList.children;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.$id == $currentCatId)
                it.classList.add('active');
            else
                it.classList.remove('active');
        }
    }

})()