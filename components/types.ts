export type User = {
  id: string;
  name: string;
  email: string;
};
// Create type freind which is User but has Status
export type Friend = User & {
  status: [number, string];
};
