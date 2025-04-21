export interface Layout {
  current: string;
  params: {
    [key: string]: { columns: number; rows: number };
  };
}

export interface AppSettings {
  layout: Layout;
  template: string;
  navigation: string;
}

export interface Post {
  id: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  permalink: string;
  userId: string;
  user?: {
    username: string;
    avatar?: string;
  };
}

export enum NavigationType {
  PAGINATION = "pagination",
  LOAD_MORE = "load-more",
}
