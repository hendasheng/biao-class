// 01 - 获取数据 read
//      并保存数据到全文变量 - $list


// 02 - 绑定提交事件 bindEvents
//      取得输入的值，也就是清单标题
//      在 数据库 中创建一条新的数据 - create

// 03 - 在 数据库 中创建一条新数据
//      创建后重新获取数据

// 04 - 渲染 list
//      循环取得的数据填充 list
//  
//      如果点击 复选框 ...
//          setCompleted()
//      如果点击 删除      
//          remove()
//      如果点击 更新
//          update()


; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let todoInput = todoForm.querySelector('[name="title"]');
    let todoList = document.getElementById('todo-list');
    let notifyDate = todoForm.querySelector('[name=notifyDate]');
    let notifyTime = todoForm.querySelector('[name=notifyTime]');
    let todoDesc = todoForm.querySelector('[name=desc]');
    console.log(todoDesc);

    
    let catForm = document.getElementById('cat-form');
    let catInput = catForm.querySelector('[name=name]');
    let catList = document.getElementById('cat-list')
    let addCat = document.getElementById('add-cat');

    // 用于保存 read 获取的数据
    let $todoList;
    let $catList;

    // 用于在 update 中记录 id
    let $updatingTodoId = null;
    let $updatingCatId = null;
    let $currentCatId = null;


    boot();

    function boot() {
        readTodo();
        readCat();
        bindEvents();
    }



    /**
     * 事件集合
     */
    function bindEvents() {
        bindTodoSubmit();
        bindToggleCatForm();
        bindClickCatForm();
        bingCatSubmit();
    }

    /**
     * 打开或关闭 分类 的 form
     */
    function bindToggleCatForm() {
        addCat.addEventListener('click', e => {
            setCatFormVisible(true);
        });
    }

    /**
     * 当左侧分类的 form 被点击时
     */
    function bindClickCatForm() {
        catForm.addEventListener('click', e => {
            let target = e.target;
            if (target.classList.contains('cancel')) {
                setCatFormVisible(false);
            }
        });
    }

    /**
     * 分类 提交事件
     */
    function bingCatSubmit() {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            let name = catInput.value;
            if ($updatingCatId)
                updateCat({ id: $updatingCatId, name })
            else
                createCat({ name });

        })
    }

    /**
     * todo 提交事件
     */
    function bindTodoSubmit() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            // 获取输入的内容
            let title = todoInput.value;
            // 如果有 currentId - 代表 更新
            if ($updatingTodoId)
                updateTodo({ id: $updatingTodoId, title });
            else // 否则创建
                createTodo({ title });
        });
    }

    /**
     * 设置分类中 form 和 add 可见性
     * 两者永远是相反的状态
     * @param {boolean} [visible=true]
     */
    function setCatFormVisible(visible = true) {
        catForm.hidden = !visible;
        addCat.hidden = !catForm.hidden;
        if (!catForm.hidden) {
            catInput.focus();
        }
    }

    /**
     * 获取数据
     */
    function readTodo(params) {
        params = params || {};

        params.where = {
            and: {
                cat_id: $currentCatId,
            },
        };

        api('todo/read', params, data => {
            $todoList = data.data || [];
            renderTodo();
        })
    }

    /**
     * 在 数据库 中创建一条 list
     * @param {*} row
     */
    function createTodo(row) {
        row.cat_id = $currentCatId;
        api('todo/create', row, result => {
            readTodo();
            // 创建后清空输入框
            todoForm.reset();
        })
    }

    /**
     * 渲染 list
     */
    function renderTodo() {
        todoList.innerHTML = '';
        $todoList.forEach(it => {
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


            let completed = item.querySelector('.completed');
            let operations = item.querySelector('.operations');

            // 当 复选框 发生变化时 - 勾选 / 取消勾选
            completed.addEventListener('change', e => {
                setCompleted(it.id, completed.checked);
            })

            // 当点击 更新 / 删除 时
            operations.addEventListener('click', e => {
                let target = e.target;

                // 如果是 删除
                if (target.classList.contains('delete'))
                    removeTodo(it.id);

                // 如果是 更新
                if (target.classList.contains('fill')) {
                    // 点击更新时设置 currentId，bindEvents 通过是否有 currentId 判断执行 update 或 create
                    $updatingTodoId = it.id;
                    // 在输入框中填充这条 list 的 title
                    todoInput.value = it.title;
                    todoInput.focus();
                }
            })

            // 组装好的 item 插入到 list 中
            todoList.appendChild(item);
        });
    }

    /**
     * 设置 checked
     * 
     * @param {Number} id
     * @param {Boolean} completed
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, resule => {
            readTodo();
        })
    }

    /**
     * 删除 list
     *
     * @param {Number} id - 删除当前 id 项
     */
    function removeTodo(id) {
        api('todo/delete', { id }, result => {
            readTodo();
        })
    }

    /**
     * 更新 list
     *
     * @param {Object} row - row 中包含 id / title
     */
    function updateTodo(row) {
        api('todo/update', row, result => {
            $updatingTodoId = null;
            readTodo();
            todoForm.reset();
        });
    }


    /**
     * Cat - 获取数据
     */
    function readCat() {
        api('cat/read', null, data => {
            $catList = data.data || [];
            $catList.unshift({
                id: null,
                name: '默认',
            });
            renderCat();
            highLightCurrentCat();
        })
    }

    /**
    * Cat - 在 数据库 中创建一条 list
    * @param {*} row
    */
    function createCat(row) {
        api('cat/create', row, result => {
            readCat();
            // 创建后清空输入框
            catForm.reset();
        })
    }


    /**
    * Cat - 渲染 list
    */
    function renderCat() {
        catList.innerHTML = '';
        if (!$catList)
            return;
        $catList.forEach(it => {
            let item = document.createElement('div');
            item.$id = it.id;
            // console.log(it.$id);
            item.classList.add('item');

            item.innerHTML = `
                            <span class="name">${it.name}</span>
                            <span class="operations">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </span>
                            `;

            // 组装好的 item 插入到 list 中
            catList.appendChild(item);

            item.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('delete'))
                    removeCat(it.id);

                if (target.classList.contains('fill')) {
                    $updatingCatId = it.id;
                    setCatFormVisible(true);
                    catInput.value = it.name;
                }

                if (target.classList.contains('name')) {
                    $currentCatId = it.id;
                    highLightCurrentCat();
                    readTodo();
                }
            })

            setCatFormVisible(false);
        });
    }

    /**
     * Cat - 删除 list
     *
     * @param {Number} id - 删除当前 id 项
     */
    function removeCat(id) {
        api('cat/delete', { id }, result => {
            readCat();
        })
    }

    /**
    * Cat - 更新 list
    *
    * @param {Object} row - row 中包含 id / title
    */
    function updateCat(row) {
        api('cat/update', row, result => {
            $updatingCatId = null;
            readCat();
            catForm.reset();
        });
    }

    function highLightCurrentCat() {
        let items = catList.children;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.$id == $currentCatId)
                it.classList.add('active');
            else
                it.classList.remove('active');
        }
    }



})();