import React from "react";
import { Post } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

interface PostCardProps {
  post: Post;
  template?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, template = "basic" }) => {
  const isHoverTemplate = template === "hover";

  return (
    <div className={`post-card ${isHoverTemplate ? "hover-card" : ""}`}>
      <div className="card-header">
        <span className="username">{post.user?.username || "User"}</span>
      </div>
      <div className="card-content">
        <p className="post-text">{post.caption}</p>
      </div>
      <div className="card-footer">
        <div className="stats-container">
          <div className="likes-comments-container flex flex-row gap-4">
            <div className="stat-item likes flex flex-row items-center">
              <HeartIcon className="h-4 w-4 mr-1 text-gray-500" />
              {post.likes}
            </div>
            <div className="stat-item comments flex flex-row items-center">
              <ChatBubbleLeftIcon className="h-4 w-4 mr-1 text-gray-500" />
              {post.comments}
            </div>
          </div>
          <div className="stat-item date flex flex-row items-center ml-auto">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
            {formatDate(post.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostCard, (prevProps, nextProps) => {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.caption === nextProps.post.caption &&
    prevProps.post.likes === nextProps.post.likes &&
    prevProps.post.comments === nextProps.post.comments &&
    prevProps.template === nextProps.template
  );
});
