export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Localized = {
  title: string;
  description: string;
};

export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
};

export type ContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: {};
  projection: string;
};

export type Status = {
  uploadStatus: string;
  privacyStatus: string;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
};

export type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  status: Status;
  statistics: Statistics;
};

export type VideoListResponse = {
  kind: string;
  etag: string;
  items: Video[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
