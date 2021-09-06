export interface StarsInt {
  serverName: string;
  serverID: string;
  users: [StarsUserInt];
}

export interface StarsUserInt {
  userID: string;
  userTag: string;
  avatar: string;
  stars: number;
}
