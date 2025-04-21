import React from "react";
import { Layout, Post } from "../../types";
import GridLayout from "./GridLayout";
import MasonryLayout from "./MasonryLayout";

interface LayoutFactoryProps {
  layout: Layout;
  template: string;
  posts: Post[];
}

const LayoutFactory: React.FC<LayoutFactoryProps> = ({
  layout,
  template,
  posts,
}) => {
  switch (layout.current) {
    case "grid":
      return (
        <GridLayout
          columns={layout.params.grid.columns}
          template={template}
          posts={posts}
        />
      );
    case "masonry":
      return (
        <MasonryLayout
          columns={layout.params.masonry.columns}
          template={template}
          posts={posts}
        />
      );
    default:
      return (
        <GridLayout
          columns={layout.params.grid.columns}
          template={template}
          posts={posts}
        />
      );
  }
};

export default LayoutFactory;
