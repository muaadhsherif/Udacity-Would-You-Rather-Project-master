import { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/UnansweredQuestion.css'
import { _saveQuestionAnswer } from '../_DATA'
import { Redirect } from 'react-router-dom'

class UnAnsweredQuestion extends Component {
	state = { voted: false }
	render() {
		let chosenOptionId = 'optionOne'
		const { quesId, userId, questions, users } = this.props
		const ques = questions[quesId]
		return this.state.voted === true ? (
			<Redirect to='/home' />
		) : (
			<div className='unAnsweredQ'>
				<div className='q_container'>
					<div className='author'>
						<img
							className='user_avatar color4'
							src={users[ques.authorId].avatarURL}
							alt={ques.author + "profile's photo"}
						/>
						<span className='color5'>{users[ques.authorId].name}</span>
					</div>
					<div className='question color3'>
						<span className='would_you_rather'>
							Would You Rather . . .
						</span>
						<div className='option'>
							<input
								defaultChecked
								type='radio'
								name='quest_chosen'
								onClick={(e) =>
									(chosenOptionId =
										e.target.attributes['data-opt-id'].value)
								}
								data-opt-id='optionOne'
							/>
							A. <span className='opt_text'>{ques.optionOne.text}.</span>
						</div>
						<div className='option'>
							<input
								type='radio'
								name='quest_chosen'
								onClick={(e) =>
									(chosenOptionId =
										e.target.attributes['data-opt-id'].value)
								}
								data-opt-id='optionTwo'
							/>
							B. <span className='opt_text'>{ques.optionTwo.text}.</span>
						</div>
					</div>
				</div>
				{
					<button
						className='submit_btn'
						onClick={() => {
							_saveQuestionAnswer(userId, quesId, chosenOptionId)

							this.setState(() => ({
								voted: true,
							}))
						}}
					>
						Submit
					</button>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userId: state.currentUserId,
	questions: state.questions,
	users: state.users,
})

export default connect(mapStateToProps)(UnAnsweredQuestion)
