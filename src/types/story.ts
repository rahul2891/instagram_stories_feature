export interface Story {
  id: number;
  imageUrl: string;
}

export interface UserStories {
  userId: number;
  username: string;
  stories: Story[];
}
