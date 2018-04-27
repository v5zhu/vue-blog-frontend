export default {

    /**
     */

    /* 是否是公司邮箱*/
    isWscnEmail(str) {
        const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@sonnx\.com$/i;
        return reg.test(str.trim());
    },

    /* 是否是手机号码*/
    validPhone(str) {
        const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/i;
        return reg.test(str.trim());
    },

    /* 合法uri*/
    validateURL(textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
    },

    /* 小写字母*/
   validateLowerCase(str) {
        const reg = /^[a-z]+$/;
        return reg.test(str);
    },

    /* 大写字母*/
    validateUpperCase(str) {
        const reg = /^[A-Z]+$/;
        return reg.test(str);
    },

    /* 大小写字母*/
    validatAlphabets(str) {
        const reg = /^[A-Za-z]+$/;
        return reg.test(str);
    },

    oneOf(value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    },
}



