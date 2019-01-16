; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let todoInput = todoForm.querySelector('[name=title]');
    let todoList = document.getElementById('todo-list');

    let addCat = document.getElementById('add-cat');
    let catForm = document.getElementById('cat-form');
    let catInput = catForm.querySelector('[name=name]');
    let catBtnGroup = catForm.querySelector('.btn-group');
    let catList = document.getElementById('cat-list');


    // 在 readTodo 中，把取到的数据存到 $list 全文变量中，方便以后调用
    let $todoList;

    // 在 readCat 中，把取到的数据存到 $list 全文变量中，方便以后调用
    let $catList;

    // 用于判断 todo 是 更新 还是 创建
    let $updateTodoId = null;

    // 用于判断 cat 是 更新 还是 创建
    let $updateCatId = null;

    // 当前 cat id，用于确定 高亮 和 分类下的 todolist
    let $currentCatId = null;


    boot();
    function boot() {
        readTodo();
        bindEvents();
        readCat();
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
     * todo 提交事件
     */
    function bindTodoSubmit() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = todoInput.value;
            // 如果 currentId 存在，则执行 更新
            if ($updateTodoId)
                updateTodo({ id: $updateTodoId, title });
            // 否则为执行 创建
            else
                createTodo({ title });
        })
    }

    /**
     * cat - 提交事件
     */
    function bindCatSubmit() {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            let name = catInput.value;
            if ($updateCatId)
                updateCat({ id: $updateCatId, name });
            else
                createCat({ name });
        })
    }

    /**
     * cat - slider 添加分类按钮
     * 打开 catForm
     */
    function bindToggleCatForm() {
        addCat.addEventListener('click', e => {
            catForm.hidden = !(addCat.hidden = true);
        })

    }

    /**
     * cat - 关闭 catForm
     */
    function bindClickCatForm() {
        catBtnGroup.addEventListener('click', e => {
            let target = e.target;
            if (target.classList.contains('cancel')) {
                catForm.hidden = !(addCat.hidden = false);
                catForm.reset();
            }
        })
    }

    /**
    * todo - 获取数据
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
     * todo - 创建一条 item
     * @param {Object} row 
     */
    function createTodo(row) {
        row.cat_id = $currentCatId;
        api('todo/create', row, result => {
            readTodo();
        });
    }

    /**
     * todo - 渲染 list
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
            let checkbox = item.querySelector('.completed');
            let operation = item.querySelector('.operation');

            // 如果 checkbox 状态有更新，则在服务器中设置 checkbox
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            })

            // 如果点击的是 更新 或者 删除
            operation.addEventListener('click', e => {
                let target = e.target;
                // 如果点击的是 更新
                if (target.classList.contains('fill')) {
                    // 把当前 title 传入到输入框内
                    todoInput.value = it.title;
                    // 设置 currrentId 为当前 Id，create 中则会判断此时为更新
                    $updateTodoId = it.id;
                }

                // 如果点击的是 删除
                if (target.classList.contains('delete'))
                    removeTodo(it.id);
            })

            // 组装好的 item 插入到 list 中
            todoList.appendChild(item);
        });
    }

    /**
    * todo - 删除一条 item
    * @param {Number} id 
    */
    function removeTodo(id) {
        api('todo/delete', { id }, result => {
            if (result)
                readTodo();
        })
    }

    /**
     * todo - 更新 item
     * @param {Object} row 
     */
    function updateTodo(row) {
        api('todo/update', row, result => {
            $updateTodoId = null;
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

    // 左侧
    /**
     * cat - 获取数据
     */
    function readCat() {
        api('cat/read', null, result => {
            $catList = result.data;
            $catList.unshift({
                id: null,
                name: '默认',
            });
            renderCat();
            catForm.reset();
            catForm.hidden = !(addCat.hidden = false);
            highLightCurrentCat();
        });
    }

    /**
     * cat - 创建一条 item
     * @param {Object} row 
     */
    function createCat(row) {
        api('cat/create', row, result => {
            readCat();
        });
    }

    /**
     * cat - 渲染 list
     */
    function renderCat() {
        catList.innerHTML = '';
        $catList.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('cat-item');
            // 把 id 储存到 item 自身，方便在外部调用
            item.$id = it.id;
            item.innerHTML = `
                            <span class="name">${it.name}</span>
                            <div class="operation">
                                <button class="fill">编辑</button>
                                <button class="delete">删除</button>
                            </div>
                            `;

            // 当 item 被点击的时候
            item.addEventListener('click', e => {
                let target = e.target;

                if (target.classList.contains('delete'))
                    removeCat(it.id);

                if (target.classList.contains('fill')) {
                    catForm.hidden = !(addCat.hidden = true);
                    catInput.value = it.name;
                    $updateCatId = it.id;
                    return;
                }
                // 设置 $currentCatId 为当前 id，用于设置高亮
                $currentCatId = it.id;
                highLightCurrentCat();

                readTodo();

            });
            catList.appendChild(item);
        })
    }

    /**
     * cat - 删除一条 item
     * @param {Number} id 
     */
    function removeCat(id) {
        api('cat/delete', { id }, result => {
            readCat();
        })
    }

    /**
     * cat - 更新一条 item
     * @param {Object} row 
     */
    function updateCat(row) {
        api('cat/update', row, result => {
            $updateCatId = null;
            readCat();
            catForm.hidden = !(addCat.hidden = false);
        })
    }

    /**
     * cat - item 高亮
     */
    function highLightCurrentCat() {
        let items = catList.children;
        // 循环所有 item
        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            // item 被点击时 $currentCatId 才存在
            // 当前 id 和 $currentCatId 相等时设置高亮
            if (it.$id == $currentCatId)
                it.classList.add('active');
            else
                it.classList.remove('active');
        }
    }

})()