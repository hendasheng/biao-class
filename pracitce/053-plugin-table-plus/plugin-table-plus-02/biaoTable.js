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

        if (operations)
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

            if (operations) {
                let btnHtml = '';
                for (let action in operations) {
                    btnHtml += `<button class="${action}">${action}</button>`;
                }
                html += `<td>${btnHtml}</td>`;
            }

            tr.innerHTML = html;

            if (operations) {
                for (let key in operations) {
                    tr.querySelector('.'+ key).addEventListener('click', e => {
                        operations[key](tr, index);
                    });
                }
            }

            tBody.appendChild(tr);
        });
    }

})();