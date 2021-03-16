import a from './a.js'
const b = {
  value: 'b',
  getA() {
    return a.value + ' from a.js'
  }
}

export default b
