/**
 * keyValue 转json
 * keyValueToJson
 * @param {Object} keyValue
 * @param {string} value key名称
 * @param {string} text value名称
 * @returns {Object}
 * **/
export function keyValueToJson(keyValue, value, text) {
  const obj = Object.assign({}, keyValue);
  obj.value = [];
  const newObj = [];
  let index = 0;

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (prop != 'value') {
        let getVal;
        if (value && text) {
          getVal = {[value]: prop, [text]: obj[prop]};
        } else {
          getVal = {key: prop, value: obj[prop]};
        }
        newObj[index++] = getVal;
      }
    }
  }
  return newObj;
}

export default keyValueToJson;
