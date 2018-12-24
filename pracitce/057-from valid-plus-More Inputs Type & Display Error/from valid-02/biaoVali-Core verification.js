
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
    regex(value, reg) {
      if (typeof reg == 'string')  // 如果 teg 是字符串
        re = new RegExp(re) // 则转换为正则表达式
      return re.test(value);
    },
  };




})(); 