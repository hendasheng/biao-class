
; (function () {
  'use strict';

  // 验证模块
  let is = {
    // 判断数字
    numeric(value) {
      if (!/^\d+$/.test(value.toString()))
        throw '不是合法的数字';
    },

    // 最小值
    min(value, guide) {
      if (value < guide)
        throw '数字不可小于' + guide;
    },

    // 最大值
    max(value, guide) {
      if (value > guide)
        throw '数字不可大于' + guide;
    },

    // 中间值
    between(value, min, max) {
      if (!this.min(value, min) || !this.max(value, max))
        throw '必须小于' + max + '且大于' + min; Î
    },

    // 正值
    positive(value) {
      if (value <= 0)
        throw '不可小于 0';
    },

    // 负值
    negative(value) {
      if (value >= 0)
        throw '不可大于 0';
    },

    // 最小长度
    minLength(value, guide) {
      if (value.length < guide)
        throw '长度不可小于' + guide;
    },

    // 最大长度
    maxLength(value, guide) {
      if (value.length > guide)
        throw '长度不可大于' + guide;
    },

    // 长度在 min & max 之间
    lengthBetween(value, min, max) {
      if (!this.minLength(value, min) || !this.maxLength(value, max))
        throw '长度需介于' + min + '至' + max + '之间';
    },

    // 字符串以 xx 开头
    startsWith(value, guide) {
      if (!value.startsWith(guide))
        throw '需以"' + guide + '"开头';
    },

    // 字符串以 xx 结束
    endsWith(value, guide) {
      if (!value.endsWith(guide))
        throw '需以"' + guide + '"结尾';
    },

    // 字符串是否包含 xxx
    includes(value, guide) {
      if (!value.includes(guide))
        throw '必须包含"' + guide + '"';
    },

    /**
     * 在数组中
     * @param {mix} value
     * @param {Array} guide
     */
    in(value, guide) {
      if (guide.indexOf(value) === -1)
        throw '必须在' + guide + '之中';
    },

    email(value) {
      let re = /^\w+@\w+\.\w+$/;
      if (!re.test(value))
        throw '邮箱格式有误';
    },

    username(value) {
      let re = /^[a-zA-Z0-9]\w+$/;
      if (!re.test(value))
        throw '用户名不合法';
    },

    phone(value, country = 'zh') {
      let re;
      switch (country) {
        case 'zh':
          re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
          break;
      }
      if (!re.test(value))
        throw '手机号格式有误';
    },

    // 正则匹配
    regex(value, re) {
      if (typeof re == 'string')  // 如果 teg 是字符串
        re = new RegExp(re) // 则转换为正则表达式
      if (!re.test(value))
        throw '格式有误';
    },
  };

  // 暴露接口
  window.valee = {
    validate,
    is,
    applyRule,
    boot,
  };

  /**
   * 通过字符串验证规则
   * @param {*} value input 输入的内容 (input.value) 如 'whh'
   * @param {String} strRule 验证的规则 如： 'numeric|min:4|max:12'
   * @returns
   */
  function validate(value, strRule) {
    return applyRule(value, parseRule(strRule));
  };

  /**
   * 制定要验证的 input 或 form
   * @param {String} selector
   */
  function boot(selector) {
    let el = document.querySelector(selector);
    if (el.nodeName == 'FORM') {
      bindSubmit(el);
      bindFormKeyup(el);
    } else {
      bindInputKeyup(el);
    }
  };

  /**
   * 为 input 绑定键盘事件
   * @param {HTMLElement} input
   */
  function bindInputKeyup(input) {
    input.addEventListener('keyup', e => {
      let errors = validateInput(input);
      showInputError(input, errors);
    });
  }

  /**
   * 绑定键盘事件
   * @param {HTMLFormElement} form
   */
  function bindFormKeyup(form) {
    form.addEventListener('keyup', e => {
      validateInput(input);
    });
  }

  /**
   * 验证单个 input
   * @param {HTMLElement} input
   * @return {Array} 
   */
  function validateInput(input) {
    let rule = input.dataset.rule;
    let value = input.value;
    let errors = validate(value, rule);
    return errors;
  }

  /**
  * 验证表单
  * @param {HTMLFormElement} form
  */
  function validateForm(form) {
    // 找到提交按钮，因为如果表单数据不合法就需要禁用提交按钮
    let submit = form.querySelector('[type=submit]');
    // 选中所有需要验证的input
    let inputs = form.querySelectorAll('[data-rule]');
    // 循环每个input
    inputs.forEach(input => {
      // 验证并拿到错误
      let errors = validateInput(input);

      // 如果验证通过，就解禁提交按钮
      if (!errors.length) {
        submit.disabled = false;
      } else { // 否则
        // 禁用提交按钮
        submit.disabled = true;
      }

      // 显示错误信息
      showInputError(input, errors);
    });
  }

  /**
   * 绑定 form 中的键盘事件
   * @param {HTMLFormElement} form
   */
  function bindFormKeyup(form) {
    // 当任何一项可能发生改变时
    form.addEventListener('keyup', e => {
      // 开始验证
      validateForm(form);
    });
  }

  /**
   * 绑定表单提交事件
   * @param {HTMLFormElement} form
   */
  function bindSubmit(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let inputs = form.querySelectorAll('[data-rule]');
      inputs.forEach(input => {
        let rule = input.dataset.rule;
        let value = input.value;
        let errors = validate(value, rule);

        if (!errors.length) {
          if (input.$errorContainer)
            input.$errorContainer.hidden = true;
          return;
        }

        // 检测包含错误的容器是否存在
        let errorContainerExist = input.nextElementSibling.classList.contains('error');
        // 如果错误容器不存在
        if (!errorContainerExist) {
          // 创建包含错误的 HTML 元素
          let ec = input.$errorContainer = document.createElement('div');
          // 添加 类名
          ec.classList.add('error');
          // 插入到当前 input 的后面
          input.insertAdjacentElement('afterend', ec);
        }

        let html = '';
        errors.forEach(err => {
          html += `<div>${err}</div>`
        });

        input.nextElementSibling.innerHTML = html;
        input.nextElementSibling.hidden = false;
      });

    });
  };

  /**
 * 显示单个input的错误信息
 * @param {HTMLElement} input 输入组件
 * @param {Array} errors 错误信息
 */
  function showInputError(input, errors) {
    // 如果通过了验证（没有错误信息）
    if (!errors.length) {
      // 就隐藏错误信息（可能是前一次验证生成的）
      if (input.$errorContainer)
        input.$errorContainer.hidden = true;
      return;
    }

    // 如果没有错误信息容器
    // <input>
    //    <div class="error"></div>  <== 错误信息容器
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error')) {
      // 就造一个 ==> <div>
      // 然后将其缓存在input元素中，方便下次验证时使用
      let ec = input.$errorContainer = document.createElement('div');
      // 添加error类 ==> <div class="error">
      ec.classList.add('error');
      // 将其添加在input后面（弟弟的位置）
      input.insertAdjacentElement('afterend', ec);
    }

    // 循环errors，生成错误信息
    let html = '';
    errors.forEach(err => {
      html += `<div>${err}</div>`;
    });

    // 替换以前的错误信息
    input.$errorContainer.innerHTML = html;
    // 显示错误信息
    input.$errorContainer.hidden = false;
  }


  /**
   * 批量验证多条规则（一条数据，多种限制）
   * @param {Sring} value 验证的值 如 'whh'
   * @param {Object} rules - 解析好的规则对象 {numeric: true, min: 1, max:12}
   */
  function applyRule(value, rules) {
    // 用于存放错误信息的数组
    let errors = [];
    // 循环规则对象
    for (let key in rules) {
      // 如 {..., max: 12, ...}
      // 此时 key 为 'max'
      //     rules[key] 为 '12'
      // ru 相当于 值
      let ru = rules[key];

      try {
        // is.max(6, 12) - 6 代表 input 中输入的内容
        is[key](value, ru);
      } catch (e) { // 捕获验证错误
        // 推入到存放错误的数组中
        errors.push(e);
      }
    }
    return errors;
  }

  /**
   * 解析规则
   *
   * @param {String} str - 'numeric|min:1|max:12'
   * @returns {Object} rule - 储存已解析规则的对象
   */
  function parseRule(str) {
    // 拆分 str
    // 得到 ["numeric", "min:1", "max:12"]
    let ruleArr = str.split('|');

    // 储存拼装好的规则
    let rule = {};

    // 循环每一条规则
    ruleArr.forEach(it => {
      // 拆分每一条规则，得到：
      // ["numeric"]
      // ["min", "1"]
      // ["max", "12"]
      let itArr = it.split(':');

      // 如 ["max", "12"]
      // 此时 key(键) 为 'max'
      let key = itArr[0];
      // guide(值) 为 '12'
      let guide = itArr[1];

      // 这些规则的值应该是数字类型
      let numRules = ['numeric', 'min', 'max', 'between', 'minLength', 'maxLength'];

      // 如果没有值，如 numeric
      if (!guide) {
        // 则直接通过，因为外部有专门检测如 numeric 、positive ... 的函数
        guide = true;
      } else { // 否则
        // 如果是数字类型的规则，就将其转换成数字类型
        if (numRules.indexOf(key) !== -1)
          guide = parseFloat(guide);
        if (key == 'in')
          guide = guide.split(',');
      }

      // 将解析好的规则存到 rule 中
      // 如 ["max", "12"]
      // rele {..., max: 12, ...}
      rule[key] = guide;
    });

    // 返回解析好的规则
    // rule = {numeric: true, min: "1", max: "12"};
    return rule;
  }



})(); 