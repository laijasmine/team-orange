import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress } from 'reactstrap';
var decodeClass = require('./decodecore.js');

class TextDecode extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			input: "",
			classes: [],
			totalCredits: 0,
			generalScience: 0
		}
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput = (event) =>{
		this.setState({
			input: event.target.value,
			classes: decodeClass.processString(event.target.value),
			totalCredits: decodeClass.calculateTotalCredit(event.target.value),
			generalScience: decodeClass.calculateScienceCredit(event.target.value)
		});
		console.log(this.state);
	}
	handleClick = (event) =>{
		// ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
		ReactDOM.render(<Nothing/>, document.getElementById('root'));
		ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
		ReactDOM.render(<GeneralScience input={this.state.generalScience}/>, document.getElementById('scienceCredits'));
	}
	render(){
		return (
			<div id="Main">
				<div id="LHSDiv">
					<h1>Degree navigator</h1>
					<br></br>
					<textarea placeholder="Paste your Exam Result here" onChange={this.handleInput}/>
					<br/>
					 <button type="button" onClick={this.handleClick}>Visualise</button>
				</div>
			</div>
			);
	}

}

class ComputerScience extends React.Component{
	render(){
		return(
			<div>
				<div className="text-center">Cumulative Total Credits: {this.props.input}/120</div>
				<Progress color="info" value={this.props.input}/>
				<br></br>
			</div>
			);
	}
}

class TotalCredits extends React.Component{
	render(){
		return(
			<div>
				<div className="text-center">Cumulative Total Credits: {this.props.input}/120</div>
				<Progress color="info" value={this.props.input}/>
				<br></br>
			</div>
			);
	}
}

class GeneralScience extends React.Component{
	render(){
		return (
			<div>
				<div className="text-center">General Science Requirement: {this.props.input}/72</div>
				<Progress color="info" value={this.props.input}/>
				<br></br>
			</div>
			);
	}
}

class Nothing extends React.Component{
	render(){
		return(
			<h1 className="text-center">Degree navigator</h1>

			);
	}
}

ReactDOM.render(<TextDecode/>, document.getElementById('root'));


export default TextDecode;