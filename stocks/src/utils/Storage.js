class Storage {
  static getSymbols () {
    return JSON.parse(localStorage.getItem('symbols')) || []
  }

  static setSymbols (symbols) {
    localStorage.setItem('symbols', JSON.stringify(symbols))
  }

  static addSymbol (symbol) {
    let symbols = Storage.getSymbols()
    if (!symbols.includes(symbol)) {
      Storage.setSymbols(symbols.concat(symbol))
    }
  }

  static removeSymbol (index) {
    let symbols = Storage.getSymbols()
    symbols.splice(index, 1)
    Storage.setSymbols(symbols)
  }
}

export default Storage
