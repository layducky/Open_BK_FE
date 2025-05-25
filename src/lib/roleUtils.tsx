import { UserEntity } from "@/domain/user.entity";

export const roleString = ((role: UserEntity["role"]) => {
  switch (role) {
    case "COLLAB":
      return "Collaborator";
    case "LEARNER":
      return "Learner";
    case "ADMIN":
      return "Admin";
    default:
      return "Undefined Role";
  }
});
