import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress,
		 Tooltip,
		 Button,
		 Collapse,
		 Card,
		 CardBody } from 'reactstrap';
var decodeClass = require('./decodecore.js');

class TextDecode extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			input: `
CHEM 111	112	 		2018W	1	BSC	2			W
CPSC 213	102	 		2018W	1	BSC	2			W
MATH 200	101	 		2018W	1	BSC	2			W
CPSC 221	203	 		2018W	2	BSC	2			
MATH 221	205	 		2018W	2	BSC	2			
PSYC 102	006	 		2018W	2	BSC	2			
STAT 251	201	 		2018W	2	BSC	2			
PHYS 101	203	87	A	2017W	2	BSC	1	3.0	72	
MATH 105	205	80	A-	2017W	2	BSC	1	3.0	66	
ENGL 112	04N	76	B+	2017W	2	BSC	1	3.0	71	
CPSC 210	201	86	A	2017W	2	BSC	1	4.0	72	
SCIE 113	113	76	B+	2017W	1	BSC	1	3.0	75	
PHYS 100	102	91	A+	2017W	1	BSC	1	3.0	78	
MATH 184	102	84	A-	2017W	1	BSC	1	4.0	66	
CPSC 121	101	80	A-	2017W	1	BSC	1	4.0	80	
CPSC 110	103	85	A	2017W	1	BSC	1	4.0	80\n	`,
			classes: [ 'PHYS 101','MATH 105','ENGL 112','CPSC 210','SCIE 113','PHYS 100','MATH 184','CPSC 121','CPSC 110' ],
			inProgressClasses: ['CPSC 221', 'MATH 221', 'PSYC 102', 'STAT 251'],
			degreeTitle: "BSc, Major Computer Science",
			totalCredits: 43,
			generalScience: 38,
			lowerLevel: 28,
			upperLevel: 0,
		}
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput = (event) =>{
		this.setState({
			input: event.target.value,
			classes: decodeClass.processString(event.target.value),
			inProgressClasses: decodeClass.processInProgressClasses(event.target.value),
			degreeTitle: "BSc, Major Computer Science",
			totalCredits: decodeClass.calculateTotalCredit(event.target.value),
			generalScience: decodeClass.calculateScienceCredit(event.target.value),
			lowerLevel: decodeClass.calculateLowerLevelCredit(event.target.value),
			upperLevel: decodeClass.calculateUpperLevelCredit(event.target.value)
		});
		console.log(this.state);
	}
	handleClick = (event) =>{
		// ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
		ReactDOM.render(<Nothing/>, document.getElementById('root'));
		ReactDOM.render(<DegreeTitle input={this.state.degreeTitle}/>, document.getElementById('degreeTitle'));
		ReactDOM.render(<TotalCredits input={this.state.totalCredits}/>, document.getElementById('totalCredits'));
		ReactDOM.render(<GeneralScience input={this.state.generalScience}/>, document.getElementById('scienceCredits'));
		ReactDOM.render(<LowerLevel input={this.state.lowerLevel}/>, document.getElementById('lowerLevelCredits'));
		ReactDOM.render(<UpperLevel input={this.state.upperLevel}/>, document.getElementById('upperLevelCredits'));
	}
	render(){
		return (
			<div id="Main">
				<div id="LHSDiv">
					<h1>Degree navigator</h1>
					<br></br>
					<textarea placeholder="Paste your Exam Result here" onChange={this.handleInput} required/>
					<br/>
					 <button type="button" onClick={this.handleClick}>Visualise</button>
				</div>
			</div>
			);
	}

}

class LowerLevel extends React.Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
      	tooltipOpen: false
    	};
	}
	toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
	render(){
		return(
			<div>
				<div className="text-center" id="TooltipExample2">Lower Level Requirements:  28/41</div>
				<Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample2" toggle={this.toggle}>
          		These are all your first year and second year level courses. Click on Details for Detailed description.
       			</Tooltip>
				<Progress color="info" value={this.props.input}/>
				<br></br>
				<LowerLevelInfo/>
			</div>
			);
	}
}

class UpperLevel extends React.Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
      	tooltipOpen: false
    	};
	}
	toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
	render(){
		return(
			<div>
				<div className="text-center" id="TooltipExample">Upper Level Requirements: {this.props.input}/48</div>
				<Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
          		These are all your 300/400-level courses. 
       			</Tooltip>
				<div>
				<Progress multi>
					<Progress bar color="info" value="0"></Progress>
					<Progress bar color="warning" value="0"></Progress>
				</Progress>
				</div>
				<br></br>
				<UpperLevelInfo/>
			</div>
			);
	}
}

class UpperLevelInfo extends React.Component{
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render(){
  	return (
  		<div>
  			<Button color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Detailed Breakdown</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </div>
      );
  }
}

class TotalCredits extends React.Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
      	tooltipOpen: false
    	};
	}
	toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
	render(){
		return(
			<div>
				<div className="text-center" id="TooltipExample4">
        		Cumulative Total Credits: {this.props.input}/120</div>
        		<div>
        		<Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample4" toggle={this.toggle}>
          		These are all of your courses. 
       			</Tooltip>
        		<Progress multi>
					<Progress bar color="info" value="31">Completed</Progress>
					<Progress bar color="warning" value="13">In Progress</Progress>
				</Progress>
				</div>
				<br></br>
				<TotalCreditsInfo/>
			</div>
			);
	}
}

class TotalCreditsInfo extends React.Component{
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Detailed Breakdown</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            	<CommunicationInfo/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

class CommunicationInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      	tooltipOpen: false
    	};
	}

	toggle() {
		this.setState({
		  tooltipOpen: !this.state.tooltipOpen
		});
  	}

	render(){
		return (
			<div>
				<div className="text-left" >Communications Requirement: 6/6</div>
				<Progress multi>
					<Progress bar color="success" value="6" max="6">6 Completed</Progress>
					<Progress bar color="warning" value="0" max="0"></Progress>
				</Progress>
				<br></br>
			</div>
			);
	}
}

class LowerLevelInfo extends React.Component{
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Detailed Breakdown</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}



class GeneralScience extends React.Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
      	tooltipOpen: false
    	};
	}
	toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
	render(){
		return (
			<div>
				<div className="text-center" id="TooltipExample3">General Science Requirement: {this.props.input}/72</div>
				<Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample3" toggle={this.toggle}>
          		These are all your science classes. Any classes in the Faculty of Science counts towards your total.
       			</Tooltip>
				<Progress multi>
					<Progress bar color="info" value="28">28 Completed</Progress>
					<Progress bar color="warning" value="10">10</Progress>
				</Progress>
				<br></br>
				<GeneralScienceInfo/>
			</div>
			);
	}
}

class GeneralScienceInfo extends React.Component{
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Detailed Breakdown</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

class DegreeTitle extends React.Component{
	render(){
		return(
			<div>
				<h5 className="text-center">Degree Title: {this.props.input}</h5>
				<h6 className="text-center">2 requirements met out of 7</h6>
			</div>
			)
	}
}

class Nothing extends React.Component{
	render(){
		return(
			<h1 className="text-center">Degree Navigator</h1>

			);
	}
}

ReactDOM.render(<TextDecode/>, document.getElementById('root'));


export default TextDecode;