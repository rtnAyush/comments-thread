import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import moment from "moment"

export default function PostCard({ post }: { post: any }) {
    return (
        <Card>
            <CardHeader>
                <div className="text-gray-400 text-sm">
                    {moment(post.createdAt).format('DD-MM-YYYY hh:mm:ss a')}
                </div>
                <div className="text-lg">{post.content}</div>
            </CardHeader>
            <CardContent className="flex gap-2 text-gray-500">
                <Button variant='outline'>
                    Show Comments ({post.comments.length})
                </Button>
                <Button variant='outline'>
                    Replay
                </Button>
            </CardContent>
        </Card>

    )
}
