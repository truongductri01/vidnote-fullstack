export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  searchable: boolean;
  avatarUrl: string;
  notesId: string[];
};

export type NewUserSignUp = {
  firstName: string;
  lastName: string;
  searchable: boolean;
  avatarUrl: string;
};
