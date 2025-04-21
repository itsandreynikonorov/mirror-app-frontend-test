import React, { useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { useSettings } from "../hooks/useSettings";
import LayoutFactory from "./layout/LayoutFactory";
import NavigationFactory from "./navigation/NavigationFactory";
import Loading from "./ui/Loading";
import ErrorMessage from "./ui/ErrorMessage";

const PostsContainer: React.FC = () => {
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const {
    posts,
    isLoading: isLoadingPosts,
    error,
    currentPage,
    totalPages,
    goToPage,
    loadMore,
  } = usePosts();

  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
    },
    [goToPage],
  );

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  if (isLoadingSettings) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!settings) {
    return <ErrorMessage message="Can't load settings" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold m-0">Posts</h2>
        <div>
          {isLoadingPosts && (
            <span className="text-sm text-gray-500">Loading...</span>
          )}
        </div>
      </div>

      {isLoadingPosts && posts.length === 0 ? (
        <Loading />
      ) : posts.length > 0 ? (
        <>
          <div className="mb-8">
            <LayoutFactory
              layout={settings.layout}
              template={settings.template}
              posts={posts}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <NavigationFactory
              navigation={settings.navigation}
              currentPage={currentPage}
              totalPages={totalPages}
              isLoading={isLoadingPosts}
              onPageChange={handlePageChange}
              onLoadMore={handleLoadMore}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No posts</p>
        </div>
      )}
    </div>
  );
};

export default PostsContainer;
