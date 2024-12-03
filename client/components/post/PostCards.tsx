import React from 'react'
import PostCard from './PostCard';
import CreatePost from './CreatePost';

export default async function PostCards() {
    const posts = await getPosts() as any;

    if (posts?.error) {
        return
    }

    async function getPosts() {
        try {
            const posts = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/view", {
                cache: "no-cache",
                next: {
                    tags: ["fetchPosts"]
                }
            });

            if (!posts.ok) {
                return { error: true, message: "Something went wrong" };
            }
            return { error: false, data: await posts.json() };
        } catch (error) {
            return { error: true, message: "Nothing found" };
        }
    }
    return (
        <div className='container grid gap-5'>
            <CreatePost />
            {
                posts?.data?.map((post: any) => (
                    <PostCard post={post} key={post._id} />
                ))
            }
        </div>
    )
}
