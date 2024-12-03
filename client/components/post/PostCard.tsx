"use client"
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import moment from "moment"
import refetchByTag from '@/lib/actions'

export default function PostCard({ post }: { post: any }) {
    const [showComments, setShowComments] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState<string | null>(null);

    const handleShowComments = async () => {
        // If comments are already being shown, just toggle
        if (showComments) {
            setShowComments(false);
            return;
        }

        // Fetch comments
        setCommentsLoading(true);
        setCommentsError(null);
        setReplyMode(false);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comments/${post._id}`, {
                method: 'GET',
                cache: 'no-cache',
                next: {
                    tags: ["fetchComments"]
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch comments');
            }

            const fetchedComments = await response.json();

            setComments(fetchedComments);
            setShowComments(true);
        } catch (error) {
            setCommentsError(error instanceof Error ? error.message : 'Something went wrong while fetching comments');
        } finally {
            setCommentsLoading(false);
        }
    };

    const handleReplyClick = () => {
        setReplyMode(!replyMode);
        setShowComments(false);
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!replyContent.trim()) {
            setError('Reply content cannot be empty');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parentId: post._id,
                    content: replyContent.trim()
                }),
                cache: 'no-cache'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add comment');
            }

            const newComment = await response.json();

            // Reset reply state
            setReplyContent('');
            setReplyMode(false);

            // Refetch comments to show the new comment
            if (showComments) {
                await handleShowComments();
            }

            refetchByTag("fetchPosts");
            refetchByTag("fetchComments");
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="text-gray-400 text-sm">
                    {moment(post.createdAt).format('DD-MM-YYYY hh:mm:ss a')}
                </div>
                <div className="text-lg">{post.content}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex gap-2 text-gray-500">
                    <Button
                        variant='outline'
                        onClick={handleShowComments}
                        disabled={commentsLoading}
                    >
                        {commentsLoading
                            ? 'Loading...'
                            : `${showComments ? "Showing" : "Show"} Comments (${post.comments?.length || 0})`
                        }
                    </Button>
                    <Button
                        variant='outline'
                        onClick={handleReplyClick}
                    >
                        {replyMode ? 'Cancel' : 'Reply'}
                    </Button>
                </div>

                {/* Reply Section */}
                {replyMode && (
                    <form onSubmit={handleReplySubmit} className="mt-2">
                        <Textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            disabled={isLoading}
                            className="mb-2"
                        />
                        {error && (
                            <div className="text-red-500 text-sm mb-2">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            disabled={isLoading || !replyContent.trim()}
                        >
                            {isLoading ? 'Sending...' : 'Send Reply'}
                        </Button>
                    </form>
                )}

                {/* Comments Section */}
                {showComments && (
                    <div className="mt-2 space-y-2">
                        {commentsError && (
                            <div className="text-red-500 text-sm">
                                {commentsError}
                            </div>
                        )}

                        {!commentsLoading && comments.length === 0 ? (
                            <div className="text-gray-500 text-sm">
                                No comments yet
                            </div>
                        ) : commentsLoading ? (
                            <div className="text-gray-500 text-sm">
                                Loading comments...
                            </div>
                        ) : (
                            comments?.map((comment: any) => (
                                <PostCard key={comment._id} post={comment} />
                            ))
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}