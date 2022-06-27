//import axios from "axios"
import { hideLoader, showALert, showLoader } from "./appReducer"
import { CREATE_POST } from "./types"
import { FETCH_POST } from "./types"


const initialState = {
	posts: [],
	fetchedPosts: []
}

export const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST:
			return { ...state, posts: state.posts.concat(action.payload) } //1 способ
		//return {...state, posts: [...state.posts, action.payload]} - 2 способ
		default: return state
		case FETCH_POST:
			return { ...state, fetchedPosts: action.payload }
	}
}

export const createPost = (post) => ({ type: CREATE_POST, payload: post })

// Thunk-creator с запросом на сервак с использованием нативного метода fetch
export const fetchPost = () => async (dispatch) => {
	try {
		dispatch(showLoader())
		const response = await fetch('https://jsonplaceholder.typicode.com/posts')
		const json = await response.json()
		dispatch({ type: FETCH_POST, payload: json }) //отправка в редьюсер
		dispatch(hideLoader())
	} catch (error) {
		dispatch(showALert('Что-то пошло не так '))
		dispatch(hideLoader())
	}

}