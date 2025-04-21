import React, { useRef } from "react";
import { Post } from "../../types";
import PostCard from "../templates/PostCard";

interface MasonryLayoutProps {
  columns: number;
  posts: Post[];
  template: string;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  columns,
  posts,
  template,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const distributePostsToColumns = () => {
    const columnPosts: Post[][] = Array.from({ length: columns }, () => []);

    posts.forEach((post, index) => {
      const columnIndex = index % columns;
      columnPosts[columnIndex].push(post);
    });

    return columnPosts;
  };

  const columnPosts = distributePostsToColumns();

  return (
    <div
      ref={containerRef}
      className="masonry-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "20px",
      }}
    >
      {columnPosts.map((column, colIndex) => (
        <div key={colIndex} className="masonry-column">
          {column.map((post) => (
            <div
              key={post.id}
              className="masonry-item"
              style={{ marginBottom: "20px" }}
            >
              <PostCard post={post} template={template} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MasonryLayout);
