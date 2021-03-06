'use strict';

module.exports = to;

const CAST_PRIMITIVES = {
  number: v => {
    if (v == null) {
      return v;
    }
    const res = Number(v).valueOf();
    if (Number.isNaN(res)) {
      throw new Error(`Could not cast "${v}" to number`);
    }
    return res
  },
  string: v => {
    if (v == null) {
      return v;
    }
    if (v.toString === Object.prototype.toString) {
      throw new Error(`Could not cast "${v}" to string`);
    }
    return v.toString();
  },
  boolean: v => {
    if (v == null) {
      return v;
    }
    const str = v.toString();
    if (str === '1' || str === 'true' || str === 'yes') {
      return true;
    }
    if (str === '0' || str === 'false' || str === 'no') {
      return false;
    }
    throw new Error(`Could not cast "${v}" to boolean`);
  }
}

function to(v, type) {
  if (typeof type === 'string') {
    if (!CAST_PRIMITIVES[type]) {
      throw new Error(`"${type}" is not a valid primitive type`);
    }
    if (v == null) {
      return
    }
    if (typeof v === type) {
      return v;
    }
    return CAST_PRIMITIVES[type](v);
  }

  if (v == null) {
    return v;
  }
  if (!(v instanceof type)) {
    return new type(v);
  }
  return v;
}
