import { logout } from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";


export const LogoutButton = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      sessionStorage.removeItem("userID");
      sessionStorage.removeItem("accessToken");
      window.location.reload();
      router.push("/");
    },
    onError: (error: any) => {
      alert(error.response?.data.message || error.message);
    },
  });
  return (
    <button className="flex items-center gap-2" onClick={() => mutate()}>
      <div className="flex flex-col">
        <IoLogOutOutline className="self-stretch my-auto text-3xl" />
        Logout
      </div>
    </button>
  )
}
