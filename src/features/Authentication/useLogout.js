import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logoutUser } from "../../Services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["authStatus"], null);
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });

      toast.success("Logged out successfully!");

      // Delay navigation to let React rerender
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return { logout, isPending };
}
