import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Answered = (props) => {
	return Object.entries(props.questions)
		.filter(
			([id, ques]) =>
				ques.optionOne.votes.includes(props.userId) ||
				ques.optionTwo.votes.includes(props.userId),
		)
		.map(([id, ques]) => (
			<div className='q_container' key={id}>
				<div className='author'>
					<img
						className='user_avatar color4'
						src={props.users[ques.authorId].avatarURL}
						alt={ques.author + "profile's photo"}
					/>
					<span className='color5'>{props.users[ques.authorId].name}</span>
				</div>
				<div className='question color3'>
					<span className='would_you_rather'>Would You Rather . . .</span>
					<div
						className='option'
						data-chosen={
							ques.optionOne.votes.includes(props.userId) && 'yes'
						}
					>
						A. <span className='opt_text'>{ques.optionOne.text}.</span>
					</div>
					<div
						className='option'
						data-chosen={
							ques.optionTwo.votes.includes(props.userId) && 'yes'
						}
					>
						B. <span className='opt_text'>{ques.optionTwo.text}.</span>
					</div>
					<Link
						onClick={() => props.sendQuesState('answered')}
						to={'/questions/' + id}
					>
						View Vote
					</Link>
				</div>
			</div>
		))
}

const mapStateToProps = (state) => ({
	userId: state.currentUserId,
	questions: state.questions,
	users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
	sendQuesState: (currentQuesState) =>
		dispatch({
			type: 'QUES_STATE',
			currentQuesState,
		}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Answered)
