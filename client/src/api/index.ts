import { AppSettings, Post } from "../types";

const API_URL = "http://localhost:4000";

export const fetchSettings = async (): Promise<AppSettings> => {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) {
    throw new Error(`Can't load settings`);
  }
  return response.json();
};

export const fetchPosts = async (
  page: number,
  limit: number,
): Promise<{ posts: Post[]; total: number }> => {
  const response = await fetch(
    `${API_URL}/posts?_page=${page}&_limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(`Can't load posts`);
  }

  const total = response.headers.get("X-Total-Count");
  const posts = await response.json();

  const postsWithUserInfo = await Promise.all(
    posts.map(async (post: Post) => {
      try {
        const userResponse = await fetch(`${API_URL}/users/${post.userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          return {
            ...post,
            user: {
              username: userData.username,
              avatar: userData.avatar,
            },
          };
        }
        return { ...post, user: { username: "Unknown user" } };
      } catch {
        return { ...post, user: { username: "Unknown user" } };
      }
    }),
  );

  return {
    posts: postsWithUserInfo,
    total: total ? parseInt(total, 10) : 0,
  };
};
