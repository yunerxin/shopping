const customFilter = {
   //保留两位小数
   tofix(val) {
    if(val) {
      return Number(val).toFixed(2)
    } else {
      return ''
    }
  },
  // 获取钱的整数位（返回值类型为字符串型，有正负值，如：1234.56---1234）
  getRoundNumber(value) {
    let transformVal = Number(value).toFixed(3);
    let realVal = transformVal.substring(0, transformVal.length - 4)
    let result = ''
    while (realVal.length > 3) {
      result = ',' + realVal.slice(-3) + result;
      realVal = realVal.slice(0, realVal.length - 3);
    }
    if (realVal) {
      result = realVal + result
    }
    return result
  },
  // 获取整数位的钱（无正负值，如：1234.56---1234）
  getRoundNumberWithoutFlag(value) {
    let transformVal = Number(value).toFixed(3);
    let realVal = transformVal.substring(0, transformVal.length - 3)
    return Number(Math.abs(realVal))
  },
  // 获取钱的小数位（如:1234.56---56）
  getDecimalNumber(value) {
    let transformVal = Number(value).toFixed(3);
    let realVal = transformVal.substring(transformVal.length - 4, transformVal.length - 1)
    return realVal
  },
  // 获取钱的整数位（返回值类型为字符串型,如：1,232）
  getCurrencyRoundPart(value) {
    if (!value) {
      value = 0
    }
    let transformVal = Number(Math.abs(value)).toFixed(3);
    let realVal = transformVal.substring(0, transformVal.length - 4)
    let result = ''
    while (realVal.length > 3) {
      result = ',' + realVal.slice(-3) + result;
      realVal = realVal.slice(0, realVal.length - 3);
    }
    if (realVal) {
      result = realVal + result
    }
    return result
  },
  // 获取钱的千分位带两位小数点（返回结果如：1,234.00）
  getCurrency(value) {
    if (!value) {
      value = 0
    }
    let transformVal = Number(Math.abs(value)).toFixed(3);
    let decVal = transformVal.substring(transformVal.length - 4, transformVal.length - 1)
    let realVal = transformVal.substring(0, transformVal.length - 4)
    let result = ''
    while (realVal.length > 3) {
      result = ',' + realVal.slice(-3) + result;
      realVal = realVal.slice(0, realVal.length - 3);
    }
    if (realVal) {
      result = realVal + result
    }
    return result + decVal
  },
  // 获取钱的数值型（返回值类型为number,返回值带两位小数如：1234.00）
  getNumericCurrency(value) {
    let transformVal = Number(Math.abs(value)).toFixed(3);
    let realVal = transformVal.substring(0, transformVal.length - 1)
    return Number(realVal)
  },
  // 获取钱的数值型的整数位（返回值类型为number,1234.00----1234）
  getNumericCurrencyRoundPart(value) {
    let transformVal = Number(Math.abs(value)).toFixed(3);
    let realVal = transformVal.substring(0, transformVal.length - 4)
    return Number(realVal)
  },
  // 获取钱的正负值（123---（+123）；-123---（-123））
  getCurrencyFlag(value) {
    let transformVal = Number(value).toFixed(3);
    // let realVal = transformVal.substring(0, transformVal.length - 3)
    return Number(transformVal) >= 0 ? 'plus-icon' : 'minus-icon'
  },
  hidePhone(tel) {
    let first = tel.substring(0,3)
    let last = tel.substring(tel.length-4,tel.length)
    return first + '****' + last
  },
 
}
export default customFilter;
