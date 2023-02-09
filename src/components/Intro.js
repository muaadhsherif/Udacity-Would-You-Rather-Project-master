import { connect } from 'react-redux'
import { _getUsers, _getQuestions } from '../_DATA'
import '../styles/Intro.css'
import { Link } from 'react-router-dom'

const Intro = (props) => {
	const usersUI = props.users ? (
		Object.entries(props.users).map(([id, user]) => (
			<div className='user color2' key={id}>
				<img
					className='user_avatar color4'
					src={user.avatarURL}
					alt={user.name + "profile's photo"}
				/>
				<p>{user.name}</p>
				<Link to={localStorage.lastLocation || './home'}>
					<button onClick={() => props.logIn(id)} className='color3'>
						Log In
					</button>
				</Link>
			</div>
		))
	) : (
		<h1 className='loading'>Loading...</h1>
	)

	return (
		<div>
			<h1>Please Log In</h1>
			<div className='container'>{usersUI}</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	getInitUsers: _getUsers().then((users) =>
		dispatch({
			type: 'GET_INIT_USERS',
			users,
		}),
	),

	logIn: (currentUserId) =>
		dispatch({
			type: 'LOGIN',
			currentUserId,
		}),

	getQuestions: _getQuestions().then((questions) =>
		dispatch({
			type: 'GET_QUESTIONS',
			questions,
		}),
	),
})

const mapStateToProps = (state) => ({
	users: state.users,
})

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
