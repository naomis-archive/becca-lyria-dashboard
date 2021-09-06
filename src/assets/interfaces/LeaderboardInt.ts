export interface LeaderboardInt {
  serverID: string;
  serverName: string;
  users: [LeaderboardUserInt];
}

export interface LeaderboardUserInt {
  userID: string;
  userTag: string;
  avatar: string;
  level: number;
  points: number;
  lastSeen: string;
  cooldown: number;
}
