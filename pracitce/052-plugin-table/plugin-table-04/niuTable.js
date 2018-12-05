; (function () {
    'user strict';

    window.niuTable = { boot };

    let table, thead, tbody, structure, list;

    /**
     * 启动
     * @param {string} tableSelector 
     * @param {Object} struct 
     * @param {Array} arr 
     */
    function boot(tableSelector, struct, arr) {
        // 在启动函数的时候更新需要又到的变量
        table = document.querySelector(tableSelector);
        thead = table.tHead;
        tbody = table.tBodies[0];
        structure = struct;
        list = arr;

        render();
    }

    /**
     * 总渲染
     */
    function render() {
        rendertHead();
        rendertBody();
    }

    /**
     * 渲染 thead
     * 通过 structure 渲染 header
     */
    function rendertHead() {
        // 初始化 thead 的组装字符串
        let html = '';

        // 循环 structure
        // 以 name 为例
        // 此时 key 为 'name';
        // structure[key] 为 '姓名'
        for (let key in structure) {
            html += `<th>${structure[key]}</th>`;
        }

        // 在 thead 内填充组装好的字符串
        thead.innerHTML = html;
    }

    /**
     * 渲染 tbody
     * 通过 list 渲染 tbody（通过 structure 限制渲染的数量和属性）
     */
    function rendertBody() {
        list.forEach(it => {
            // 给每条数据创建表格元素
            let tr = document.createElement('tr');
            // 初始化 tr 的组装字符串
            let html = '';

            // 通过循环 structure 控制渲染的数量和属性
            // 如果没有响应的属性 则显示 '-'
            for (let key in structure) {
                html += `<td>${it[key] || '-'}</td>`;

                // 在 tr 内填充组装好的字符串
                tr.innerHTML = html;

                // 在 tbody 中追加 tr
                tbody.appendChild(tr);
            }
        });
    }
})();