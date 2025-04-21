import React from "react";
import { Post } from "../../types";
import PostCard from "../templates/PostCard";

interface GridLayoutProps {
  columns: number;
  posts: Post[];
  template: string;
}

const GridLayout: React.FC<GridLayoutProps> = ({ columns, posts }) => {
  return (
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "20px",
        gridAutoRows: "1fr",
      }}
    >
      {posts.map((post) => (
        <div key={post.id} className="grid-item" style={{ minWidth: 0 }}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(GridLayout);