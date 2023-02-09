import React, { Component } from 'react'

export default class Percentage extends Component {
	state = {
		i: -5,
	}
	count = () => {
		if (this.state.i === this.props.max) {
			clearInterval(this.interval)
		} else {
			this.setState((prevState) => ({ i: prevState.i + 1 }))
		}
	}

	interval = setInterval(this.count, 30)
	render() {
		return <span>{this.state.i > -1 && this.state.i}</span>
	}
}
