import { useMutation, useQueryClient } from "react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../utils/queryKeys";
import { useCustomToast } from "./useCustomToast";

const addUser = async (user) => await axiosInstance.post("/users", user);

const useAddUser = () => {
    const queryClient = useQueryClient();
    const toast = useCustomToast();

    const { mutate } = useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users);
            toast({title: 'User added successfully', status: 'success'})
        },
        onError: (err) => toast({ title: err.message, status: "error" }),
    });
    return mutate;
};

export default useAddUser;
