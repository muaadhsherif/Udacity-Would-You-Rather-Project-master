import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answered from './Answered'
import UnAnswered from './Unanswered'
import '../styles/Home.css'
import Nav from './Nav.js'
import { _getQuestions } from '../_DATA'

class Home extends Component {
	state = {
		answered: localStorage.answered || 'unanswered',
	}

	toggleQues = (e) => {
		document.querySelector('.active').classList.remove('active')
		e.target.classList.add('active')
		this.setState({ answered: e.target.id })
		localStorage.answered = e.target.id
	}

	render() {
		const questionsUI = this.props.questions ? (
			this.state.answered === 'answered' ? (
				<Answered />
			) : (
				this.state.answered === 'unanswered' && <UnAnswered />
			)
		) : (
			<h1 className='loading'>loading...</h1>
		)

		return (
			<>
				{<Nav />}
				<div className='toggle_ques'>
					<button
						className={
							(this.state.answered === 'answered' ? 'active ' : '') +
							'color2 bold'
						}
						id='answered'
						onClick={(e) => this.toggleQues(e)}
					>
						Answered Questions
					</button>
					<button
						className={
							(this.state.answered === 'unanswered' ? 'active ' : '') +
							'color2 bold'
						}
						id='unanswered'
						onClick={(e) => this.toggleQues(e)}
					>
						Unanswered Questions
					</button>
				</div>
				{questionsUI}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUserId,
		questions: state.questions,
		userName: state.users[state.currentUserId].name,
		userAvatarURL: state.users[state.currentUserId].avatarURL,
	}
}

const mapDispatchToProps = (dispatch) => ({
	getQuestions: _getQuestions().then((questions) =>
		dispatch({
			type: 'GET_QUESTIONS',
			questions,
		}),
	),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
