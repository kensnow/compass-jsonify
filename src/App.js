import React, { Component, setState } from 'react'

import styles from './assets/styles.css'


export default class App extends Component {
    constructor(){
        super()
        this.state = {
            input:'',
            output:'',
            toggle: false
        }
    }

    toggle = () => {
        this.setState(ps => ({
            toggle: !ps.toggle
        }))
    }

    jsonifyData = () => {
        const inputObject = JSON.parse(this.state.input)
        const [key] = Object.keys(inputObject)

        console.log(inputObject[key])
        const newObj = inputObject[key].reduce((acc, cur)=> { return acc + JSON.stringify(cur) + '\n'},'')
        console.log(newObj)
        this.setState({
            output:newObj
        })
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
        return (

            <div>
                <h1>Compass JSONify</h1>
                <p>Compass JSONify is a web tool which parses an array of comma delimited objects in a JSON file into a JSON format ready to be imported into the MongoDB Compass tool. Simply paste your JSON object text into the first field, and click submit to run.</p>
                <button onClick={this.toggle}>{this.state.toggle ? 'Got it!' : 'See an example?'}</button>
                {this.state.toggle ? 
                <>
                <pre>
                    <h3>From this:</h3>
                    <code>
                        {'{'}
                        <br/>&nbsp;&nbsp;{'"trails": ['}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'"id":12345,'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'"name":"Pemi Loop"'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'},'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'"id":12346,'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'"name":"Grandeur Peak"'}
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                        <br/>&nbsp;&nbsp;{']'}
                        <br/>{'}'}
                    </code>
                </pre>       
                <pre>
                    <h3>To this:</h3>
                    <code>    
                        <br/>{'{'}
                        <br/>&nbsp;&nbsp;{'"id":12345,'}
                        <br/>&nbsp;&nbsp;{'"name":"Pemi Loop"'}
                        <br/>{'}'}
                        <br/>{'{'}
                        <br/>&nbsp;&nbsp;{'"id":12346,'}
                        <br/>&nbsp;&nbsp;{'"name":"Grandeur Peak"'}
                        <br/>{'}'}
                    </code>
                </pre>
                </>
                : 
                <>     
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <button className='button submit-button'>Submit</button>
                        <textarea name='input' onChange={this.handleChange} className='input-box' placeholder='Enter JSON data here...' />
                            
                       
                    </form>
                </section>
                <section>
                {this.state.output ? 
                    <pre>
                        <code>
                          {this.state.output}  
                        </code>
                    </pre>
                : null}
 
                </section>
                </>
                }
                
                
                <footer>
                <p>Compass JSONify is not realted or affiliated with Compass or MongoDB, just a tool I wish I had for importing a database from a JSON Object file into Compass when practicing with MongoDB and Compass!</p>
                </footer>
    
            </div>
            
        )
    }
}
