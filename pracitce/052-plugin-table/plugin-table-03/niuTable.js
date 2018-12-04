; (function () {
    'use strict';

    // 暴露插件全局变量
    window.niuTable = { boot };

    let table, thead, tbody, structure, list;

    /**
     * 启动
     * @param {string} tableSelector 
     * @param {Object} struct 
     * @param {Array} arr 
     */
    function boot(tableSelector, struct, arr) {
        // 启动功能时更新所有变量
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
     * 填充 thead
     * 根据 structutre 渲染 thead
     */
    function renderHead() {
        // 初始化 thead 的组装字符串
        let html = '';

        // 循环 structure 
        for (let key in structure)
            // 以 name 为例
            // 此时 key 为 'name'
            // 则表示 structure[key] 为 '姓名'
            html += `<th>${structure[key]}</th>`;

        // 在 thead 内填充组装好的字符串
        thead.innerHTML = html;
    }

    /**
     * 渲染 body
     */
    function renderBody() {
        
        // 循环 list（数组）中的每一条数据
        // it 代表每一个用户 [{王花花...}, {李拴蛋...}]
        list.forEach(it => {
            // 为每条数据创建表格行
            let tr = document.createElement('tr');
            
            // 初始化 tr 的组装字符串
            let html = '';

            // 循环当前用户的属性（控制循环的数量和属性）
            for(let key in structure)
                // 以 name 为例
                // 此时 it[key] 为 '王花花'
                // structure 中没有的属性显示 '-'
                html += `<td>${it[key] || '-'}</td>`;

                // 在 tr 内填充组装好的字符串
                tr.innerHTML = html;

                // 把 tr 追加到 tbody 中
                tbody.appendChild(tr);
        });
    }

})();