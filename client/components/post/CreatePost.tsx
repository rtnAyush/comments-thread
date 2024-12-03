"use client";
import React, { useState } from 'react'
import { Card, CardHeader } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import refetchByTag from '@/lib/actions';

export default function CreatePost() {
    const [postContent, setPostContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createPost() {
        // Validate post content
        if (!postContent.trim()) {
            setError('Post content cannot be empty');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: postContent.trim()
                }),
                cache: "no-cache"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
            }

            const newPost = await response.json();

            // Reset the form after successful post
            setPostContent('');

            refetchByTag("fetchPosts");

            return { error: false, data: newPost };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return { error: true, message: error instanceof Error ? error.message : 'Something went wrong' };
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost();
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-2">
            <Card>
                <Textarea
                    placeholder="What's on your mind."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    disabled={isLoading}
                />
            </Card>

            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div>
                <Button
                    type="submit"
                    disabled={isLoading || !postContent.trim()}
                >
                    {isLoading ? 'Posting...' : 'Post'}
                </Button>
            </div>
        </form>
    )
}