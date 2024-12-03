import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export default function CreatePost() {
    return (
        <div className="grid  gap-2">
            <Card>
                <Textarea placeholder="What's on your mind." />
            </Card>

            <div>
                <Button>Post</Button>
            </div>
        </div>
    )
}
