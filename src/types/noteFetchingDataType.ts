export type NoteData = {
  id: string | null | undefined;
  note: string;
  status: string;
  videoId: string | null;
  authorId: string;
  video: {
    url: string | null | undefined;
    title: string | null | undefined;
    channelTitle: string | null | undefined;
  };
};
