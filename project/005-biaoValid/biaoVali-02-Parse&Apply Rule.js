
; (function () {
  'use strict';

  let is = {
    // 判断数字
    numeric(value) {
      return !isNaN(parseFloat(value));
    },

    // 最小值
    min(value, guide) {
      if (!this.numeric(value)) // 如果不是数字，则跳过
        return false;
      return value >= guide;
    },

    // 最大值
    max(value, guide) {
      if (!this.numeric(value))
        return false;
      return value <= guide;
    },

    // 中间值
    between(value, min, max) {
      return this.min(value, min) && this.max(value, max);
    },

    // 正值
    positive(value) {
      if (!this.numeric(value))
        return false;
      return value > 0;
    },

    // 负值
    negative(value) {
      if (!this.numeric(value))
        return false;
      return value < 0;
    },

    // 最小长度
    minLength(value, guide) {
      return value.length >= guide;
    },

    // 最大长度
    maxLength(value, guide) {
      return value.length <= guide;
    },

    // 长度在 min & max 之间
    lengthBetween(value, min, max) {
      return this.minLength(value, min) && this.maxLength(value, max);
    },

    // 字符串以 xx 开头
    startsWith(value, guide) {
      return value.startsWith(guide);
    },

    // 字符串以 xx 结束
    endsWith(value, guide) {
      return value.endsWith(guide);
    },

    // 字符串是否包含 xxx
    includes(value, guide) {
      return value.includes(guide);
    },

    /**
     * 在数组中
     * @param {mix} value
     * @param {Array} guide
     */
    in(value, guide) {
      return guide.indexOf(value) !== -1;
    },

    email(value) {
      let re = /^\w+@\w+\.\w+$/;
      return re.test(value);
    },

    username(value) {
      let re = /^[a-zA-Z0-9]\w+$/;
      return re.test(value);
    },

    phone(value, country = 'zh') {
      let re;
      switch (country) {
        case 'zh':
          re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
          break;
      }
      return re.test(value);  // 
    },

    // 正则匹配
    regex(value, re) {
      if (typeof re == 'string')  // 如果 teg 是字符串
        re = new RegExp(re) // 则转换为正则表达式
      return re.test(value);
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
    let valid = true;
    // 循环规则对象
    for (let key in rules) {
      // 如 {..., max: 12, ...}
      // 此时 key 为 'max', rules[key] 为 '12'
      let ru = rules[key];
      // 此时 is[key], 就相当于 is.max();
      let result = is[key](value, ru);

      // 如果存在不合法的结果，验证结果为 false
      if (!result)
        valid = false;
    }
    return valid;
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