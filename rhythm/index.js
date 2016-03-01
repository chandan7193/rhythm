



// Rhythm
export class Rhythm {
  constructor(fontsize, baseline) {
    this.fontsize = fontsize || 16
    this.baseline = baseline || 24
  }

  em(val) {
    return val / this.fontsize + 'em'
  }

  rem(val) {
    return val / this.fontsize + 'rem'
  }

  base(val) {
    return this.em(val * this.baseline)
  }

  fontSize(val) {
    let result = this.em(val)
    this.fontsize = val
    return result
  }

  lineHeight(val) {
    let remaining = val % this.baseline
    let nextBase = this.baseline + (val - remaining)
    let result = (remaining > 0) ? (nextBase / val) : 1
    return result.toString()
  }

  typo(val) {
    return {
      fontSize: this.em(val),
      lineHeight: this.lineHeight(val)
    }
  }

  handleRelatives(str) {
    const RELREG = /\b\d+(?:\.\d+)?(?:x|xx)\b/g
    // Calculates `x` or `xx` units into relative units
    let newStr = str.replace(RELREG, (m) => {
      let [ num, unit ] = m.split(/(x+)/)
      // Relative `x` is calculate to baseline (e.g `0.25x` `0.375em`)
      if (unit === 'x') return this.base(num)
      // Relative Precise `xx` is calculate to ems (e.g. `2xx` `0.125em`)
      if (unit === 'xx') return this.em(num)
    })
    return newStr
  }

  handleAxis(property, args) {
    const AXISES = ['Vertical', 'Horizontal']
    const SIDES = ['Top', 'Right', 'Bottom', 'Left']
    const AXISREG = /(\w+)?(vertical|horizontal)/i

    const results = {}

    let [,prop,axis] = property.match(AXISREG)

    for (let i=0; i < AXISES.length; i++) {

      if(axis === AXISES[i]) {
        let propX = prop + SIDES[i]
        let PropY = prop + SIDES[i+2]

        let [argX, argY] = args.split(/,(?:\s)?/)

        results[propX] = argX
        results[PropY] = argY ? argY : argX
      }
    }
    return results
  }

  handleDeclaration(property, args) {
    const AXISREG = /(\w+)?(vertical|horizontal)/i

    if(property.match(AXISREG)) {
      return this.handleAxis(property, args)
    } else {
      return {[property]: args}
    }
  }

  render(apis) {
    const results = {}
    // store initial fontsize
    let initialContext = this.fontsize

    for (let api in apis) {
      let result
      let property = api
      let args = this.handleRelatives(apis[api])

      if (this.constructor.prototype.hasOwnProperty(api)) {
        result = this[property](args)
      } else {
        result = this.handleDeclaration(property, args)
      }

      Object.assign(results, result)
    }

    // restore fontsize to initial context
    this.fontsize = initialContext
    // return results
    return results
  }
}


export var rhythm = new Rhythm

export default function(apis) {
  return rhythm.render(apis)
}
