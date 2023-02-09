import Nav from './Nav.js'
import '../styles/Leaderboard.css'
import { connect } from 'react-redux'
import { _getUsers } from '../_DATA'

const Leaderboard = (props) => {
	const { currentUserId, users } = props

	let usersWithScore = Object.entries(users).map(([id, user]) => ({
		...user,
		quesNum: user.questions.length,
		answersNum: Object.entries(user.answers).length,
		score: user.questions.length + Object.entries(user.answers).length,
	}))

	let sortedUsers = usersWithScore.sort(
		(a, b) => b.quesNum + b.answersNum - (a.quesNum + a.answersNum),
	)

	return (
		<>
			<Nav />
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Photo</th>
						<th>Questions</th>
						<th>Answers</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{sortedUsers.map((user, ind) => (
						<tr
							key={user.id}
							className={user.id === currentUserId ? 'current_user' : ''}
						>
							<th>{ind + 1}</th>
							<td>{user.name}</td>
							<td>
								<img
									src={user.avatarURL}
									alt='user_photo'
									className='table_user_avatar'
								/>
							</td>
							<td>{user.quesNum}</td>
							<td>{user.answersNum}</td>
							<td>{user.score}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

const mapStateToProps = (state) => ({
	currentUserId: state.currentUserId,
	users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
	getUsers: _getUsers().then((users) =>
		dispatch({
			type: 'GET_INIT_USERS',
			users,
		}),
	),
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
