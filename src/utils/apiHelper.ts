/**
 * 将对象转换为x-www-form-urlencoded格式
 * @param data
 */
export function objectToForm(data: any) {
  let ret = ''
  for (const it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret.substring(0, ret.length - 1)
}
