window.vali = {
    isUsername,
    isEmail,
    isPhone,
    isPassword,
    betweenLength,
    between,
};

/**
     *  验证用户名
     *  如果 str 不在
     *
     */
function isUsername(str) {
    if (!betweenLength(str, 4, 24) || str.includes('辣鸡'))
        return false;
    return true;
}

function isEmail(str) {
    if (!str.includes('@'))
        return false;
    return true;
}

/**
 *  验证电话号
 *  如果 str（输入长度） 不在合法范围内
 *  或者 不是以 ”1“ 开头
 */
function isPhone(str) {
    if ((str.length != 11 & str.length != 13 & str.length != 14)
        ||
        !str.startsWith('1')
    )
        return false;
    return true;
}

function isPassword(str) {
    if (!betweenLength(str, 6, 64))
        return false;
    return true;
}

function betweenLength(str, min, max) {
    return between(str.length, min, max);
}

function between(num, min, max) {
    return num >= min && num <= max;
}