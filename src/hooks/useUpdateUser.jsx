import { useMutation, useQueryClient } from "react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../utils/queryKeys";
import { useCustomToast } from "./useCustomToast";

const updateUser = async ({ user, userId }) =>
    await axiosInstance.put(`/users/${userId}`, user);

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const toast = useCustomToast();
    
    const { mutate } = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users);
            toast({ title: "User updated successfully", status: "success" });
        },
        onError: (err) => toast({ title: err.message, status: "error" }),
    });
    return mutate;
};

export default useUpdateUser;
