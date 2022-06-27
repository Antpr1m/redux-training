import React from "react";
import { connect } from "react-redux";
import { createPost } from '../redux/postsReducer'
import { showALert } from '../redux/appReducer'
import Alert from "./Alert";

class PostForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: ''
		}
	}

	//Функция-обработчик для отправки формы
	submitHandler = (e) => {
		e.preventDefault()
		const { title } = this.state


		if (!title.trim()) {
			return (
				this.props.showALert('Напишите название поста ') //отправка текста alert в state
			)
		}

		//Создание объекта нового поста
		const newPost = {
			title, id: Date.now().toString()
		}
		this.props.createPost(newPost) //Отправка(dispatch) поста в state для его изменения
		this.setState({ title: "" }) //Очитка формы
	}


	//Функция для изменения поля title в локальном state
	changeInputHendler = (e) => {
		this.setState(prev => ({
			...prev, ...{
				[e.target.name]: e.target.value
			}
		}))
	}


	render() {
		return (
			<form onSubmit={this.submitHandler}>

				{this.props.alert && <Alert alert={this.props.alert} />}

				<div className="mb-3">
					<label for="title" className="form-label">Post title</label>
					<input type="text" className="form-control"
						id="title" value={this.state.title} name='title'
						onChange={this.changeInputHendler} />
				</div>
				<button className="btn btn-success" type="submit">New post</button>
			</form>
		)
	}
}

const mapStateToProps = (state) => ({ alert: state.app.alert })


export default connect(mapStateToProps, { createPost, showALert })(PostForm)