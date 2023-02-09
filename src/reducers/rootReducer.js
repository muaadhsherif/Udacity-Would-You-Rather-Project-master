/* const initState = {
	users: [],
}
 */
const rootReducer = (state, action) => {
	switch (action.type) {
		case 'GET_INIT_USERS':
			return { ...state, users: action.users, questions: null }

		case 'LOGIN':
			return { ...state, currentUserId: action.currentUserId }

		case 'GET_QUESTIONS':
			return { ...state, questions: action.questions }

		case 'QUES_STATE':
			return { ...state, currentQuestState: action.currentQuesState }

		default:
			return { ...state }
	}
}

export default rootReducer
