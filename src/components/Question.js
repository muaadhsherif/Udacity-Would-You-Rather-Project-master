import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnAnsweredQuestion from './UnAnsweredQuestion'
import Nav from './Nav.js'
const Question = (props) => {
	return props.quesState === 'answered' ? (
		<>
			<Nav />
			<AnsweredQuestion quesId={props.match.params.quesId} />
		</>
	) : (
		<>
			<Nav />
			<UnAnsweredQuestion quesId={props.match.params.quesId} />
		</>
	)
}
const mapStateToProps = (state) => ({
	userId: state.currentUserId,
	questions: state.questions,
	quesState: state.currentQuestState,
})
export default connect(mapStateToProps)(Question)
