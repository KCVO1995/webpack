const cssLoader = (code) => {
    return `
      const str = ${JSON.stringify(code)}
      module.exports str
    `
}

module.exports = cssLoader
