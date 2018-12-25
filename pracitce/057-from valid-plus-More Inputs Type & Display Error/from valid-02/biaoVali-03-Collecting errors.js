
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
    validate(value, strRule) {
      return applyRule(value, parseRule(strRule));
    },
    is,
    applyRule,
  }


  /**
   * 应用规则
   *
   * @param {Sring} value
   * @param {Object} rules - 解析好的规则对象 {numeric: true, min: 1, max:12}
   */
  function applyRule(value, rules) {
    // 默认为合法
    let errors = [];
    // 循环规则对象
    for (let key in rules) {
      // 如 {..., max: 12, ...}
      // 此时 key 为 'max', rules[key] 为 '12'
      let ru = rules[key];

      try {
        is[key](value, ru);
      } catch (e) {
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

      // 讲解析好的规则存到 rule 中
      // 如 ["max", "12"]
      // rele {..., max: 12, ...}
      rule[key] = guide;
      console.log(rule);
    });

    // 返回解析好的规则
    // rule = {numeric: true, min: "1", max: "12"};
    return rule;
  }



})(); 