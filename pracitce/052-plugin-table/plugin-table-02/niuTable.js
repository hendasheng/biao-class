; (function () {
    'use strict';

    // 暴露插件全局变量
    window.niuTable = { boot };

    let table, tbody, thead, structure, list;

    /**
     * 
     * @param {string} tableSelector 
     * @param {Object} struct 
     * @param {Array} list 
     */
    function boot(tableSelector, struct, arr) {
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
        renderHead();
        renderBody();
    }

    /**
     * 渲染 thead
     * 根据 structure 渲染 thead
     * {
     *      name: '姓名',   ==> |姓名|性别|...|
     *      gender: '性别',     |xxx|xxx|xxx|
     *      ...    
     * }
     */
    function renderHead() {
        // 初始化 th 的组装字符串
        let html = '';

        // 循环 structure 中的每一条
        for (let key in structure) {
            // 以 name: '姓名' 为例
            // 此时 key 为 'name'
            // 意味着 structure[key] 为 '姓名'
            // 意味着最后生成的字符串为 <th>姓名</th>
            html += `<th>${structure[key]}</th>`
        }

        // 在 thead 内填充组装好的字符串
        thead.innerHTML = html;
    }

    /**
     * 渲染 tbody
     * 通过 list 渲染 tbody （通过 structure 限制渲染的数量和属性）
     */
    function renderBody() {
        // 循环 list 数组的每条数据
        // 以用户列表为例 [{王花花...}, {李拴蛋...}]
        // 此时循环的就是每一个用户
        list.forEach(it => {

            // 为每条数据创建表格行
            let tr = document.createElement('tr');

            // 初始化 tr 的准组装字符串
            let html = '';

            // 循环当前用户的属性（控制渲染的数量和属性）
            for (let key in structure) {
                // 以 name: '王花花' 为例
                // 意味着最后生成的字符串为 '<td>王花花</td>' 如果没有相应数据，则显示 '-'
                html += `<td>${it[key] || '-'}</td> `;
            }

            // 在 tr 内填充组装好的字符串
            tr.innerHTML = html;

            // 在 tbody 中追加 tr
            tbody.appendChild(tr);
        });

    }

})();