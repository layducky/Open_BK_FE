export class UserEntity {
  id?: string;
  name?: string;
  email: string;
  role?: string;
  createdAt: string;
  image: string;
  phoneNumber: string;
  biography: string;

  constructor(data: Partial<UserEntity>) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.email = data.email || "";
    this.role = data.role || "";
    this.createdAt = data.createdAt
      ? new Date(data.createdAt).toLocaleString("de-DE")
      : "-";
    this.image = data.image || "";
    this.phoneNumber = data.phoneNumber || "";
    this.biography = data.biography || "";
  }
}
