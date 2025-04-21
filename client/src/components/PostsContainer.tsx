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
    <div className="posts-container">
      <div className="posts-header">
        <h2 className="posts-title">Posts</h2>
        <div className="posts-meta">
          {isLoadingPosts && (
            <span className="loading-indicator">Loading...</span>
          )}
        </div>
      </div>

      {isLoadingPosts && posts.length === 0 ? (
        <Loading />
      ) : posts.length > 0 ? (
        <>
          <div className="posts-grid-wrapper">
            <LayoutFactory
              layout={settings.layout}
              template={settings.template}
              posts={posts}
            />
          </div>

          <div className="posts-navigation">
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
        <div className="posts-empty">
          <p>No posts</p>
        </div>
      )}
    </div>
  );
};

export default PostsContainer;
