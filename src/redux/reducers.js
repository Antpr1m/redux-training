import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { postsReducer } from './postsReducer'



export const reducers = combineReducers({
	posts: postsReducer,
	app: appReducer
})