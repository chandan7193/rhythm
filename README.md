# Rhythm
JavaScript Inline Styles Toolbox

Resources:
- [React: CSS in JS by vjeux](https://speakerdeck.com/vjeux/react-css-in-js)
- [Colin Megill - Inline Styles are About to Kill CSS](https://www.youtube.com/watch?v=NoaxsCi13yQ)


```sh
$ npm install rhythm
```

Install babel and plugin for ES6 decorators
```sh
npm install babel-preset-es2015 babel-preset-stage-0 babel-plugin-transform-decorators-legacy
```

`.babelrc` configuration
```json
{
  "presets": [
    "es2015",
    "stage-0"
  ]
}
```

## Example
```js
import React from 'react'
import ReactDOM from 'react-dom'

// Rhythm
import rhythm from 'rhythm'

let styles = rhythm({
  typo: '47',
  padding: `0.5x 1x`,
  marginBottom: '1x'
})

class Demo extends React.Component {
  render() {
    return <h1 style={ styles } >Hello World</h1>
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'))
```
```js
{
  fontSize:"2.9375em",
  lineHeight:"1.0212765957446808",
  marginBottom:"1.5em",
  padding:"0.75em 1.5em"
}
```

## Todo

- [ ] Document API's
- [ ] More tests
