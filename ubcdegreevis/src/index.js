import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var decodeClass = require('./decodecore.js');

class TextDecode extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			input: "",
			classes: [],
			totalCredits: 0
		}
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput = (event) =>{
		this.setState({
			input: event.target.value,
			classes: decodeClass.processString(event.target.value),
			totalCredits: decodeClass.calculateTotalCredit(event.target.value)
		});
		console.log(this.state);
	}
	handleClick = (event) =>{
		// ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
		ReactDOM.render(<Nothing/>, document.getElementById('root'));
		ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
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


class TotalCredits extends React.Component{
	render(){
		return(
			<div id="Result">
				<progress value={this.props.input} max="120"></progress>
				<p>Total Credits: {this.props.input}/120</p>
			</div>
			);
	}
}

class Nothing extends React.Component{
	render(){
		return(
			<h1>Degree navigator</h1>

			);
	}
}

ReactDOM.render(<TextDecode/>, document.getElementById('root'));


export default TextDecode;