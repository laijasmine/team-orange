import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var decodeClass = require('./decodecore.js');
var uiClass = require('./ui.js');

class TextDecode extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			input: "",
			classes: []
		}
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput = (event) =>{
		this.setState({
			input: event.target.value,
		});
	}
	handleClick = (event) =>{
		ReactDOM.render(<ResultTable input={this.state.input}/>, document.getElementById('root'));
	}
	render(){
		return (
			<div id="Main">
				<div id="LHSDiv">
					<h1>Degree navigator</h1>
					<textarea placeholder="Paste your result here..." onChange={this.handleInput}/>
					<br/>
					 <button type="button" onClick={this.handleClick}>Visualise</button>
				</div>
			</div>
			);
	}

}

class ResultTable extends React.Component{
	render(){
		return(
			<div id="Result">
				<h1>Degree navigator</h1>
				<p>{this.props.input}</p>
			</div>
			);
	}
}

ReactDOM.render(<TextDecode/>, document.getElementById('root'));


export default TextDecode;