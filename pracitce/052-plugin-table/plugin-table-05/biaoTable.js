; (function () {
    'user strict';

    window.biaoTable = { boot };

    // 定义后面需要用到的变量
    let table, tHead, tBody, structure, list;

    /**
     * 启动表格渲染
     * @param {String} tableSelector
     * @param {Object} struct
     * @param {Array} users
     */
    function boot(tableSelector, struct, arr) {
        // 取得所有全文变量
        table = document.querySelector(tableSelector);
        tHead = table.querySelector('thead');
        tBody = table.querySelector('tbody');
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
     */
    function renderHead() {
        // 初始化组装字符串
        let html = '';

        // 循环 structure 中的每一条
        for (let key in structure) {
            // 以 name: '姓名' 为例
            // 此时 key 为 'name'
            // structure[key] 为 ‘姓名’（name 的值）
            // 最后生成的字符串为 <th>姓名</th>
            html += `<th>${structure[key]}</th>`;
        };
        // 在 thead 中填充组装好的字符串
        tHead.innerHTML = html;
    }

    /**
     * 渲染 tbody
     * 使用 list 渲染 tbody（通过 structure 控制渲染的数量和属性
     */
    function renderBody() {
        // 循环每一条用户数据
        list.forEach(it => {
            // 创建表格行，后面用来填充数据
            let tr = document.createElement('tr');
            // 初始化组装字符串
            let html = '';
            // 循环当前用户数据的 structure
            // 以 {name: '李拴蛋', gender: '男', score: '12',} 为例
            for (let key in structure) {
                // 此时 it[key] 为 ‘李拴蛋/男/12’
                // 如果当前数据中没有相应的 key 则显示 ‘-’；
                html += `<td>${it[key] || '-'}</td>`;

                // 在 tr 中填充组装好的字符串
                tr.innerHTML = html;
                // 将 tr 追加到 tbody 中
                tBody.appendChild(tr);
            }
        });
    }

})();