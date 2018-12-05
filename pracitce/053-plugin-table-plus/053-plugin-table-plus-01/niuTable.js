; (function () {
    'user strict';

    // 将 boot 暴露在全局
    window.niuTable = { boot };

    let table, thead, tbody, structure, list, operations;

    /**
     * 
     * @param {string} tableSelector 
     * @param {Object} struct 
     * @param {Array} arr 
     * @param {Object} ops 
     */
    function boot(tableSelector, struct, arr, ops) {
        // 启动函数时更新需要用到的变量
        table = document.querySelector(tableSelector);
        thead = table.tHead;
        tbody = table.tBodies[0];

        structure = struct;
        list = arr;
        operations = ops;

        render();
    }

    function render() {
        rendertHead();
        rendertBody();
    }

    /**
     * 通过 structure 渲染 thead
     */
    function rendertHead() {
        // 初始化 th 组装字符串
        let html = '';

        // 循环 struct 对象，以 name 为例
        // 此时 kty 为 'name'
        // structure[key] 则为 '姓名'
        for (let key in structure)
            html += `<th>${structure[key]}</th>`;

        // 如果有 operations
        if (operations)
            html += `<th>操作</th>`;

        // 在 thead 内填充拼装好的 th 字符串
        thead.innerHTML = html;
    }

    /**
     * 通过 list 渲染 tbody
     * 通过 structure 控制渲染数量
     */
    function rendertBody() {
        list.forEach((it, i) => {
            // 为每条数据创建表格元素
            let tr = document.createElement('tr');

            // 初始化 tr 组装字符串
            let html = '';

            // 通过循环 structure 控制渲染数量和属性
            // 没有相对应的属性则显示 '-'
            for (let key in structure) {
                html += `<td>${it[key] || '-'}</td>`;
            }

            // 如果有 operations
            if (operations) {
                let btnHtml = '';
                for (let key in operations) {
                    btnHtml += `<button class="${key}">${key}</button>`;
                };
                html += `<td>${btnHtml}</td>`;
            }

            // 在 tr 内填充拼装好的 td 字符串
            tr.innerHTML = html;

            if (operations) {
                for (let key in operations) {
                    tr
                        .querySelector('.' + key)
                        .addEventListener('click', () => {
                            operations[key](tr, i);
                        });
                }
            }

            // 将 tr 追加到 tbody 中
            tbody.appendChild(tr);
        });
    }



})();