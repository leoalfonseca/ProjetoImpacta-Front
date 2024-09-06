export type UserProps = {
  id: string;
  email: string;
  name: string;
  password?: string;
  username: string;
};

export type AuthProps = {
  username: string;
  password: string;
};
