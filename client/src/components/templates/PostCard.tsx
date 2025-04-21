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
    <div 
      className={`group flex md:flex-col flex-row p-4 border border-gray-300 rounded-lg bg-white shadow-sm h-full overflow-hidden relative 
        transition-transform ${isHoverTemplate ? 'hover:translate-y-[-4px] hover:shadow-md cursor-pointer pb-16' : ''}`}
    >
      <div className="mb-3">
        <span className="font-bold truncate block">{post.user?.username || "User"}</span>
      </div>
      <div className="flex-grow mb-4">
        <p className="overflow-hidden leading-6">{post.caption}</p>
      </div>
      <div className={`${isHoverTemplate ? 'absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-4' : 'mt-auto'}`}>
        <div className="flex flex-col justify-between gap-4 text-sm md:gap-2">
          <div className="flex flex-row gap-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <div className="flex flex-row items-center">
              <HeartIcon className="h-4 w-4 mr-1 text-gray-500" />
              {post.likes}
            </div>
            <div className="flex flex-row items-center">
              <ChatBubbleLeftIcon className="h-4 w-4 mr-1 text-gray-500" />
              {post.comments}
            </div>
          </div>
          <div className={`flex flex-row items-center min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}>
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