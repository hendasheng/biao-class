
window.valid = {
    isUsername,
    isEmail,
    isPhone,
    isPassword,
}

/**
 * 验证用户名
 * @param {string} str
 * @return {boolean}
 */
function isUsername(str) {
    // 如果 str 不在 6-24 之间，就不合法
    if (!betweenLength(str, 6, 24))
        return false;
    return true;
}

/**
 * 验证邮箱
 * @param {string} str 
 */
function isEmail(str) {
    // 如果不包含 “@” ,就不合法
    if (!str.includes('@'))
        return false;
    return true;
}

/**
 * 判断电话号码
 * @param {string} str 
 */
function isPhone(str) {
    if ((str.length != 11 & str.length != 13 & str.length != 14)
        ||
        !str.startsWith('1')
    )
        return false;
    return true;
}

/**
 * 判断密码长度
 * @param {string} str 
 */
function isPassword(str) {
    if (!betweenLength(str, 6, 60))
        return false;
    return true;
}


/**
 * 判断数字是否在指定范围内
 * @param {string} num 
 * @param {number} min 
 * @param {number} max 
 */
function between(num, min, max) {
    // 大于最小值 并且 小于最大值
    return num >= min && num <= max;
}

/**
 * 判断字符串长度是否在指定范围内
 * @param {string} str 
 * @param {number} min 
 * @param {number} max 
 */
function betweenLength(str, min, max) {
    return between(str.length, min, max)
}