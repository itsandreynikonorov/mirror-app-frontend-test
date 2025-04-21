import React from "react";

interface LoadMoreProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  currentPage,
  totalPages,
  isLoading,
  onLoadMore,
}) => {
  const hasMore = currentPage < totalPages;

  return (
    <div className="flex justify-center mt-6">
      {hasMore ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      ) : (
        <p className="text-gray-500">No more posts</p>
      )}
    </div>
  );
};

export default React.memo(LoadMore);