import { useMutation, useQueryClient } from "react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../utils/queryKeys";
import { useCustomToast } from "./useCustomToast";

const deleteUser = async (userId) =>
    await axiosInstance.delete(`/users/${userId}`);

const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const toast = useCustomToast();
    
    const { mutate } = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users);
            toast({ title: "User deleted successfully", status: "success" });
        },
        onError: (err) => toast({ title: err.message, status: "error" }),
    });
    
    return mutate;
};

export default useDeleteUser;
