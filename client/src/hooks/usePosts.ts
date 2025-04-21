import { useState, useEffect, useCallback } from "react";
import { Post, NavigationType } from "../types";
import { fetchPosts } from "../api";
import { useSettings } from "./useSettings";

export const usePosts = () => {
  const { settings } = useSettings();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const getItemsPerLoad = useCallback(() => {
    if (!settings) return 10;
    const currentLayout = settings.layout.current;
    const { columns, rows } = settings.layout.params[currentLayout];
    return columns * rows;
  }, [settings]);

  const itemsPerLoad = getItemsPerLoad();
  const totalPages = Math.ceil(totalItems / itemsPerLoad);
  const hasMore = currentPage < totalPages;
  const loadPosts = useCallback(
    async (page: number, append: boolean = false) => {
      if (!settings) return;

      try {
        setIsLoading(true);
        setError(null);
        const { posts: newPosts, total } = await fetchPosts(page, itemsPerLoad);
        setPosts((prev) => (append ? [...prev, ...newPosts] : newPosts));
        setTotalItems(total);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [settings, itemsPerLoad],
  );

  useEffect(() => {
    if (settings) {
      loadPosts(1, false);
    }
  }, [settings, loadPosts]);

  const loadMore = async () => {
    if (hasMore && !isLoading) {
      await loadPosts(
        currentPage + 1,
        settings?.navigation === NavigationType.LOAD_MORE,
      );
    }
  };

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      await loadPosts(page, false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    goToPage,
  };
};
