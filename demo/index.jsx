import React from 'react'
import ReactDOM from 'react-dom'

// TypoRhythm
import rhythm from '../rhythm'

let styles = rhythm({
  typo: '47',
  padding: `0.5x 1x`,
  marginBottom: '1x'
})

console.log(styles)

class Demo extends React.Component {
  render() {
    return <h1 style={ styles } >Hello World</h1>
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'))
