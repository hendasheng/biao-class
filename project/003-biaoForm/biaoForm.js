
window.biaoForm = {
    getData,   // ==> getData: getData
    setData,   // ==> setData: setData
};

/**
    * 解析表单数据
    * @param {HTMLFormElement} form - 目标表单
    * @return {Object}
    */
function getData(form) {
    let data = {};
    let inputs = form.querySelectorAll('[name');
    inputs.forEach(it => {
        data[it.name] = it.value;
    });
    return data;
}

/**
 * 通过纯数据填充表单
 * @param {Object} data > 储存数据的对象
 * @param {HTMLFormElement} form > 目标表单
 */
function setData(data, form) {
    for (let key in data) {
        let val = data[key];
        let input = form.querySelector(`[name=${key}]`);

        switch (input.type) {
            case 'radio':
                let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);
                if (radio)
                    radio.checked = true;
                break;

            case 'checkbox':
                val.forEach(it => {
                    let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);
                    if (checkbox)
                        checkbox.checked = true;
                });
                break;

            default:
                input.value = data[key];
        }

    }
}