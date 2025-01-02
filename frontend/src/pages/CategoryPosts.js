import Post from "../components/Post";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import Link for routing

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);  // Keep it as category with lowercase 'c'
    const { id } = useParams();

    const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:8000/api/posts/category/${id}`);
        setPosts(response.data);
    }

    const fetchCategory = async () => {
        const response = await axios.get(`http://localhost:8000/api/categories/${id}`);
        setCategory(response.data);
    }

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, []);  

    if (!category){
        return <p>Loading....</p>
    }

    return (
        <>
            <main>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-8">
                            {category && <h1 className="mb-4">{category.name}</h1>} 
                            
                            {posts.map(post => (
                                <div key={post._id} className="card mb-4">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-3">
                                            <img className="img-fluid h-100 card-img-top" src={post.image || "https://via.placeholder.com/800x400"} alt="..." />
                                        </div>
                                        <div className="card-body col-md-8">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.content.substring(0, 100)}...</p>
                                            <Link to={`/posts/${post._id}`} className="btn btn-primary">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
