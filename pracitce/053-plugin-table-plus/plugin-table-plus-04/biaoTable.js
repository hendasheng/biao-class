; (function () {
    'user strict';

    // 将 boot 暴露在全局
    window.biaoTable = { boot };

    let table, thead, tbody, struct, arr, operations;

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
        rendertHead();
        rendertBody();
    }

    /**
     * 渲染 thead
     */
    function rendertHead() {
        // 初始化组装字符串
        let html = '';
        // 循环结构对象
        for (let key in struct) {
            // 以 oid: '订单号' 为例
            // key 为 'odi', struct[key] 为 '订单号'
            // html += <td>订单号</td>
            html += `<td>${struct[key]}</td>`;
        }

        // 如果传入 operations (功能)
        if (operations) {
            // 在组装字符串中再添加一个表头项
            html += `<td>操作</td>`;
        }
        // 在 thead 中填充组装好的字符串
        thead.innerHTML = html;
    }

    /**
     * 渲染 tbody
     */
    function rendertBody() {
        // 循环数据中的每一条
        arr.forEach((it, i) => {
            // 创建表格行
            let tr = document.createElement('tr');
            // 初始化组装字符串
            let html = '';
            // 循环结构对象
            // 通过结构对象中的 key 控制 tbody 的渲染内容
            for (let key in struct) {
                // 以 arr[... {oid: '001', ...} ...] 为例
                // 此时 key 为 'oid'
                // it[key] 为 '001'
                // html += <td>001</td>
                html += `<td>${it[key]}</td>`;
                // 在 tr 中填充组装好的字符串
                tr.innerHTML = html;
            }

            // 如果有 operations
            if(operations) {
                // 就依据 operations 的键生成 button 的 html 结果
                let btn = '';
                // 循环 operations
                // 以 Delete(tr, i) {...} 为例
                for(let key in operations) {
                    // btn += <button class=Delete>Delete</button>
                    btn += `<button class="${key}">${key}</button>`;
                }
                // 将 button 填充到 html 中
                html += `<th>${btn}</th>`;
            }
            // 在 tr 中追加组装好的字符串
            tr.innerHTML = html;

            // 如果有 operations
            if(operations) {
                // 给每个功能按钮绑定点击事件
                for(let key in operations) {
                    tr.querySelector('.' + key).addEventListener('click', e => {
                        // 此时 operations[key] 就代表 function() {}  
                        // 后面的括号作为函数触发，并将其所在的行和索引值返回
                        operations[key](tr, i);
                    });
                }
            }
            // 将 tr 插入到 tbody 中
            tbody.appendChild(tr);
        });
    }


})();