import b from './b.js'
const a = {
  value: 'a',
  getB() {
    return b.value + ' from b.js'
  }
}

export default a
