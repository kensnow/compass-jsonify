import React, { Component , createContext} from 'react'
import styles from './assets/styles.css'
export const {Consumer, Provider} = createContext()

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            input:'',
            output:'',
            toggle: false,
            errMsg:''
        }
    }

    toggler = () => {
        this.setState(ps => ({
            toggle: !ps.toggle
        }))
    }

    jsonifyData = () => {
        try{
            this.setState({output:''})
            const inputObject = JSON.parse(this.state.input)
            const [key] = Object.keys(inputObject)
            const newObj = inputObject[key].reduce((acc, cur)=> { return acc + JSON.stringify(cur) + '\n'},'')
            this.setState({
                output:newObj
            })
        }
        catch{
            this.setState({
                errMsg:'Error parsing object, please make sure syntax is correct!'
            })
        }

    }

    handleChange = (e) => {
        const {name, value} = e.target
        if (this.state.input.length < 10000){
            this.setState(ps => ({
                    ...ps.input,
                    [name]:value
            }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.jsonifyData()
        
    }

    render() {
        const value = {
            toggler: this.toggler,
            jsonifyData: this.jsonifyData,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            ...this.state
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>            
        )
    }
}

export const withFunctionHandler = C => props => (
    <Consumer>
        {containerProps => <C {...containerProps} {...props}/>}
    </Consumer>
)

