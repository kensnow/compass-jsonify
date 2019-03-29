import React, { Component, useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import styles from './assets/styles.css'
import {withFunctionHandler} from './FunctionHandler'

function App(props) {
    const {toggler, jsonifyData, handleChange, handleSubmit, input, output, toggle, errMsg} = props
    console.log(props)
    const [copySuccess, setCopySuccess] = useState(false)

    return (
        <div>
            <section className="intro-section">
                <h1>Compass JSONify</h1>
                <p>Compass JSONify is a web tool which parses <span className="bold">a single</span> array of comma delimited objects from a JSON file into a MongoDB Compass ready JSON format.</p>
                <p>Simply paste your JSON object text into the first field, and click submit to run.  Once parsed, copy the text and paste it into a .json file using your text editor of choice.</p>
            </section>
            <section>
            {toggle ? <button className='button submit' onClick={toggler}><span> Got it!</span></button> : <button className='button secondary' onClick={toggler}><span>Show example</span></button>}
            </section>
            {toggle ? 
            <section className="example-section">
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
                    <br/>{'{"id":12345,"name":"Pemi Loop"}'}
                    <br/>{'{"id":12346,"name":"Grandeur Peak"}'}
                </code>
            </pre>
            </section>
            : 
            <>     
            <section className='form-section'>
                <form onSubmit={handleSubmit}>
                    <button className='button submit'>Submit</button>
                    <textarea name='input' onChange={handleChange} className='input-box' placeholder='Enter JSON data here...' />  
                </form>
            </section>
            <section>
            {output ? 
                <>
                <section>
                    <CopyToClipboard text={output} onCopy={() => setCopySuccess(!copySuccess)}>
                        {copySuccess ?  <button className='button submit'>Copy Successful!</button> :<button className='button secondary'>Copy to clipboard</button>}
                    </CopyToClipboard>
                    <pre>
                        <code>
                            {output}  
                        </code>
                    </pre>
                </section>
                <section className="usage-details">
                    <h4>To use:  </h4>
                    <p>Copy the above formatted object data, and paste it into a text editor.  Save the file as 'filename'.json where 'filename' is the filename of your choosing, to best describe the data collection.</p>
                    <p>
                    In MongoDB Compass, create a new database and then a new collection, or create a new collection in an existing database.</p> 
                    <p> In the new collection, select 'collection' from the menu, and 'import collection' from the dropdown
                    </p>
                    <p>Select JSON for file type, and then 'Browse' to the file you just created.</p>
                    <p>Enjoy your populated database!</p>
                </section>
                </>
                
            : errMsg ? <h4 className="error">{errMsg}</h4> : null}
            </section>
            </>
            }
            <footer>
            <p>Compass JSONify useful for importing an existing database or api response object into MongoDB.  Most JSON object arrays are commaa delimited, however MongoDB Compass needs the JSON Object to be newline delimited.</p>
            <p>Compass JSONify is not realted or affiliated with Compass or MongoDB, just a tool I wish I had for importing a database from a JSON Object file into Compass when practicing with MongoDB and Compass!</p>
            </footer>

        </div>
    )
}

export default withFunctionHandler(App)


