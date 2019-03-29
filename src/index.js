import React from 'react'
import { render } from 'react-dom'
import App from './App'
import FunctionHandler from './FunctionHandler'

render(
    <FunctionHandler>
        <App/>
    </FunctionHandler>,
    document.getElementById('root')
)