
// 将函数暴露在全局范围
window.vali = {
    isUsername,
    isEmail,
    isPhone,
    isPassword,
    betweenLength,
    between,
};

/**
 * 验证 用户名
 * @param {string} str 
 * @return {boolean}
 */
function isUsername(str) {
    // 如果长度不再 4 - 22 之间就不合法
    if (!betweenLength(str, 4, 24) || str.includes('辣鸡'))
        return false;
    return true;
}

/**
 * 验证邮箱
 * @param {string} str 
 * @return {boolean}
 */
function isEmail(str) {
    // 如果不包含 “@” 就不合法
    if (!str.includes('@'))
        return false;
    return true;
}

/**
 * 验证电话号码
 * @param {string} str 
 * @return {boolean}
 */
function isPhone(str) {
    // 如果输入长度 ！= 11 并且 ！= 13 并且 ！= 14 或者 不以 “1” 开头，就不合法
    if ((str.length != 11 & str.length != 13 & str.length != 14)
        ||
        !str.startsWith('1')
    )
        return false;
    return true;
}

/**
 * 验证密码
 * @param {string} str 
 * @return {boolean}
 */
function isPassword(str) {
    // 如果 str 不在 6 - 64 之间，就不合法
    if (!betweenLength(str, 6, 64))
        return false;
    return true;
}

/**
 * 判断字符串长度是否在指定范围内
 * @param {string} str 
 * @param {number} min 
 * @param {number} max 
 */
function betweenLength(str, min, max) {
    return between(str.length, min, max);
}

/**
 * 判断数字是否在指定范围内
 * @param {string} num 
 * @param {number} min 
 * @param {number} max 
 */
function between(num, min, max) {
    // 大于等于 最小值 并且 小于等于 最大值
    return num >= min && num <= max;
}