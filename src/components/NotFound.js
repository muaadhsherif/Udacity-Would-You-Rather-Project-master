import { Link } from 'react-router-dom'

const NotFound = () => {
	localStorage.lastLocation = ''
	return (
		<div>
			<h2>404 - Page Not Found!</h2>
			<h1>
				<Link to='/'>Go Home</Link>
			</h1>
		</div>
	)
}

export default NotFound
