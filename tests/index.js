import assert from 'assert'

import {rhythm} from '../rhythm'

describe('Rhythm', function() {

  describe('em()', function () {
    it('should calculate pixels to ems', function () {
      assert.equal(rhythm.em(16), '1em')
      assert.equal(rhythm.em(35), '2.1875em')
    })
  })

  describe('rem()', function () {
    it('should calculate pixels to rems', function () {
      assert.equal(rhythm.rem(16), '1rem')
      assert.equal(rhythm.rem(35), '2.1875rem')
    })
  })

  describe('base()', function () {
    it('should calculate pixels to base', function () {
      assert.equal(rhythm.base(1), '1.5em')
      assert.equal(rhythm.base(3), '4.5em')
    })
  })

  describe('handleRelatives()', function () {
    it('should calculate Relative units "x"', function () {
      // Relative
      assert.equal(rhythm.handleRelatives('1x'), '1.5em', )
      assert.equal(rhythm.handleRelatives('3x'), '4.5em')
      assert.equal(rhythm.handleRelatives('1x 2x'), '1.5em 3em')
    })
    it('should calculate Relative Precise units "xx"', function () {
      assert.equal(rhythm.handleRelatives('10xx'), '0.625em', )
      assert.equal(rhythm.handleRelatives('30xx'), '1.875em')
      assert.equal(rhythm.handleRelatives('10xx 20xx'), '0.625em 1.25em')
    })
  })

  describe('fontSize()', function () {
    it('should calculate fontSize', function () {
      assert.equal(rhythm.fontSize(16), '1em')
      assert.equal(rhythm.fontSize(35), '2.1875em')
    })
  })

  describe('lineHeight()', function () {
    it('should calculate lineHeight for fontSize', function () {
      assert.equal(rhythm.lineHeight(16), '1.5')
      assert.equal(rhythm.lineHeight(35), '1.3714285714285714')
    })
  })

  describe('render()', function () {
    let {
      fontSize,
      lineHeight,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    } = rhythm.render({
      typo: '16',
      padding: '1x',
      paddingVertical: '2x,3x',
      paddingHorizontal: '4x, 5x'
    })

    describe('fontSize', function () {
      it('should output fontSize', function () {
        assert.equal(fontSize, '1em')
      })
    })

    describe('lineHeight', function () {
      it('should output lineHeight', function () {
        assert.equal(lineHeight, '1.5')
      })
    })

    describe('padding', function () {
      it('should output padding', function () {
        assert.equal(padding, '1.5em')
      })
    })

    describe('paddingTop', function () {
      it('should output padding top', function () {
        assert.equal(paddingTop, '3em')
      })
    })

    describe('paddingVertical', function () {
      it('should output padding top', function () {
        assert.equal(paddingTop, '3em')
      })
      it('should output padding bottom', function () {
        assert.equal(paddingBottom, '4.5em')
      })
    })

    describe('paddingHorizontal', function () {
      it('should output padding right', function () {
        assert.equal(paddingRight, '6em')
      })
      it('should output padding left', function () {
        assert.equal(paddingLeft, '7.5em')
      })
    })
  })

})
