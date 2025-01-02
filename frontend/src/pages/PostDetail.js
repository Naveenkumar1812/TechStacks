import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function PostDetail (){
        const [Post, setPost] =  useState(null);
        const { id } =  useParams();

        const fetchPost = async() => {
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/${id}`)
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post', error)
            }
        }
        useEffect(() =>{
            fetchPost();
        }, []) 

        if (!Post) {
            return <p>Loading....</p>
        }

        const formattedDate = Intl.DateTimeFormat('en-US' ,{
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(Post.createdAt))

    return     <main class="container my-4">
    <div class="row">
        <article class="col-lg-8">
            <h2 class="blog-post-title">{Post.title}</h2>
            <p class="blog-post-meta"> {formattedDate} by <a href="#">{Post.author}</a></p>

            <img class="mb-3 img-fluid" src={Post.image} alt="" />
          
            <div class="blog-post-content">
                <p>{Post.content}</p>
            </div>
        </article>

       
    </div>
</main>
}