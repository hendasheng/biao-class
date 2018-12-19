; (function () {
    'user strict';

    // 将 boot 暴露在全局
    window.biaoTable = { boot };

    let table, thead, tbody, struct, arr, operations;

    /**
     * 启动渲染表格
     *
     * @param {String} tableSelector
     * @param {Object} structure
     * @param {Array} list
     */
    function boot(tableSelector, structure, list, ops) {
        table = document.querySelector(tableSelector);
        thead = table.querySelector('thead');
        tbody = table.querySelector('tbody');
        struct = structure;
        arr = list;
        operations = ops;

        render();
    }

    function render() {
        renderHead();
        renderBody();
    }

    /**
     * 渲染 thead
     */
    function renderHead() {
        let html = '';
        // 循环表格结构中的每一项
        // 以 oid: '订单号' 为例
        // 此时 key 为 ‘oid’，struct[key] 为 '订单号'
        for(let key in struct) {
            // <td>订单号</td>
            html += `<td>${struct[key]}</td>`;
        }

        // 如果传入 operations
        // 渲染 thead 时追加 “操作” 
        if(operations) {
            html += `<td>操作</td>`;
        }
        
        // 将组装好的字符串填充到 thead 中
        thead.innerHTML = html; 
    }

    /**
     * 渲染 tbody
     */
    function renderBody() {
        // 循环数据中的每一项
        arr.forEach(it => {
            // 初始化 tr 的组装字符串
            let html = '';
            // 创建表格行
            let tr = document.createElement('tr');
            // 循环结构中的每一项，通过结构中的 key 控制显示内容和数量
            // 以 {oid: '002', project: '手工耳机包', totalCost: '260'} 为例
            for(let key in struct) {
                // <td>002</td>
                html += `<td>${it[key]}</td>`;
            }

            // 如果传入 operations
            if(operations) {
                // 创建按钮 html 结构
                let btn = '';
                // 循环 operations 中的每一项 action（功能）
                for(let key in operations) {
                    // 以 Delete(tr, i) {...} 为例
                    // <button>Delete</button>
                    btn += `<button>${key}</button>`;
                }
                // 把组装好的 btn 插入到表单中
                html += `<th>${btn}</th>`;
            }
            
            // 将组装好的字符串填充到 tr 中
            tr.innerHTML = html;

            // 将 tr 追加到 tbody 中
            tbody.appendChild(tr);
        });
    }

})();