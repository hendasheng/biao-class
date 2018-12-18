
window.biaoForm = {
    getData,   // ==> getData: getData
    setData,   // ==> setData: setData
};

/**
    * 获取表单数据 
    * @param {HTMLFormElement} form - 目标表单
    * @retuen {Object} 储存数据的对象
    */
function getData(form) {
    // 创建保存数据的对象
    let data = {};
    // 找到目标表单内所有输入组件，也就是有 name 属性的所有元素（Arrayy）
    let inputs = form.querySelectorAll('[name');
    // 循环所有输入组建，it 就是每一个输入组件
    inputs.forEach(it => {

        // 检测输入组件值的类型
        switch (it.type) {
            // 如果是数字
            case 'number':
                // 就将其转换为数字类型
                data[it.name] = parseFloat(it.value);
                break;

            // 如果是单选框
            case 'radio':
                // 如果没有勾选，则跳过
                if (!it.checked)
                    return;
                // 否则直接存到 data 中
                data[it.name] = it.value;

            // 如果是复选框，那么取到的值一定是数组，

            case 'checkbox':
                // 如果第一次遇到复选框，现将 data 中对应项初始化为空数组
                // 否则后面无法推入选中的值
                if (!Array.isArray(data[it.name]))
                    data[it.name] = [];

                // 如果复选框被勾选
                if (it.checked)
                    // 直接将选中的值推入数组
                    // <input type="checkbox" name="orientation" value="a" checked>
                    // <input type="checkbox" name="orientation" value="b" checked>
                    // data{orientation: [a, b]}
                    data[it.name].push(it.value);
                break;

            // 如果是以下类型
            case 'date':
            case 'time':
            case 'week':
            case 'month':
            case 'datetime':
            case 'datetime-local':
                // 就将其转化为更强大的Date对象
                data[it.name] = it.valueAsDate;
                break;

            // 默认直接取字符串
            default:
                // 以 <input name="age" value="10"> 为例：
                // it.name => age
                // value => 10
                // 最后得出 data{age: 10}
                data[it.name] = it.value;
                break;
        }
    });

    // 返回解析好的纯数据
    return data;
}

/**
 * 通过纯数据填充表单 
 * @param {Object} data
 * @param {HTMLFormElement} form - 目标表单
 */
function setData(data, form) {
    // 循环数据对象中的每一项
    // key 为 data 的键
    // data[key] 为相应的值
    for (let key in data) {
        // 取到每一项的值，方便以后调用
        let val = data[key];
        // 找到相应的输入组件
        let input = form.querySelector(`[name=${key}]`);

        // 判断输入组件类型
        switch (input.type) {
            // 如果是 radio - 单选框
            case 'radio':
                // 选中类型为 radio，name 为当前项的键（key），value 为当前项的值
                // 以 gender: 'female 为例，当 data 循环到 {..., gender: 'female, ...}
                // radio = <input type="radio" name="gender" value="female">
                let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);
                // 如果 radio 存在，则勾选
                radio && (radio.checked = true);
                break;

            // 如果是 checkbox - 复选框
            case 'checkbox':
                // 复选框说明值是数组，如 orientation: ['male', 'female']
                // 循环数组
                val.forEach(it => {
                    // 选中类型为 checkbox，name 为当前项的键（key），value 为当前项的值
                    // 以 orientation: ['male', 'female'] 为例
                    // checkbox = <input type="checkbox" name="orientation" value="male">
                    //                                                      value="female"
                    let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);
                    // 如果 checkbox 存在，则勾选
                    checkbox && (checkbox.checked = true);
                });
                break;

            // 如果是其他类型的输入组件
            default:
                // 直接填写值
                input.value = data[key];
                break;
        }
    };
}