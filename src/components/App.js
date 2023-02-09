import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '../styles/App.css'
import Intro from './Intro'
import Home from './Home'
import NotFound from './NotFound'
import Question from './Question'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'

const App = (props) => {
	window.location.pathname === '/'
		? (localStorage.lastLocation = '')
		: (localStorage.lastLocation = window.location.pathname)

	return (
		<BrowserRouter>
			<Route
				render={() => {
					if (!props.userId) {
						return (
							<>
								<Route exact path='/' component={Intro} />
								<Redirect to='/' />
							</>
						)
					} else {
						return (
							<Switch>
								<Route exact path='/' component={Intro} />
								<Route exact path='/home' component={Home} />
								<Route
									exact
									path='/questions/:quesId'
									component={Question}
								/>
								<Route exact path='/add' component={AddQuestion} />
								<Route
									exact
									path='/leaderboard'
									component={Leaderboard}
								/>
								<Route component={NotFound} />
							</Switch>
						)
					}
				}}
			/>
		</BrowserRouter>
	)
}
const mapStateToProps = (state) => ({
	userId: state.currentUserId,
})

export default connect(mapStateToProps)(App)
