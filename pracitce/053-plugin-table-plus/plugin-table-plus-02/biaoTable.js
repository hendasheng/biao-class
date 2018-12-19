; (function () {
    'user strict';

    // 将 boot 暴露在全局
    window.biaoTable = { boot };

    let table, tHead, tBody, struct, list, operations;

    /**
     * 
     * @param {String} tableSelector
     * @param {Object} structure
     * @param {Array} arr
     * @param {Object} ops
     */
    function boot(tableSelector, structure, arr, ops) {
        table = document.querySelector(tableSelector);
        tHead = table.querySelector('thead');
        tBody = table.querySelector('tbody');
        struct = structure;
        list = arr;
        operations = ops;

        render();
    }

    function render() {
        renderHead();
        renderBody();
    }

    function renderHead() {
        let html = '';
        for (let key in struct) {
            html += `<th>${struct[key]}</th>`;
        };


        // 如果有 operations
        if (operations)
            // 就在 html 中添加 “操作” 按钮
            html += '<th>操作</th>';

        tHead.innerHTML = html;
    }

    function renderBody() {
        list.forEach((it, index) => {
            let tr = document.createElement('tr');
            let html = '';
            for (let key in struct) {
                html += `<td>${it[key] || '-'}</td>`;
            }

            // 如果有 operations - 自定义功能
            if (operations) {
                let btnHtml = '';
                // 则循环 operation 数组，因为数组内有可能是多项功能
                for (let action in operations) {
                    // 每个功能都是一个按钮
                    // 以 Deletr:function() {...} 为例
                    //                          ↓Delete   ↓ Delete   
                    btnHtml += `<button class="${action}">${action}</button>`;
                }
                // 把组装好的按钮填充到 html 中
                html += `<td>${btnHtml}</td>`;
            }

            // 把组装好的 html 填充到 tr 中
            tr.innerHTML = html;

            if (operations) {
                for (let key in operations) {
                    tr.querySelector('.' + key).addEventListener('click', e => {
                        operations[key](tr, index);
                    });
                }
            }

            tBody.appendChild(tr);
        });
    }

})();