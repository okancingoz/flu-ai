export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
  profilePicture?: string;
}
