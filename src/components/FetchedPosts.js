import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../redux/postsReducer";
import FetchPost from "./FetchPost";
import Loader from "./Loader";


const FetchedPosts = () => {

	const dispatch = useDispatch()
	const fetchedPosts = useSelector(state => state.posts.fetchedPosts)
	const loading = useSelector(state => state.app.loading)

	if (loading) {
		return <Loader />
	}

	if (!fetchedPosts.length) {
		return <button onClick={() => { dispatch(fetchPost()) }} className="btn btn-primary">Download posts</button>
	}

	return fetchedPosts.map(post => <FetchPost post={post} key={post.id} />)
}

export default FetchedPosts;
