const days = {
  mon: 1,
  tue: 2,
  wed: 4,
  thu: 8,
  fri: 16,
  sat: 32,
  sun: 64
}

function isBitSet(value, index) {
  return (value & (1 << index)) !== 0
}

export function fromNumber(number) {
  return Object.keys(days).reduce((obj, key, index) => {
    obj[key] = isBitSet(number, index)
    return obj
  }, {})
}

export function toNumber(values) {
  return Object.entries(values).reduce((sum, [key, value]) => {
    return sum + (value ? days[key] : 0)
  }, 0)
}
