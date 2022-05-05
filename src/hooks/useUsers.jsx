import { useQuery } from "react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../utils/queryKeys";
import { useCustomToast } from "./useCustomToast";
import useDebounce from "./useDebounce";

const getUsers = async (searchText, sortBy) => {
    const { data } = await axiosInstance.get(
        `/users?search=${searchText}&sort=${sortBy}`
    );
    return data.data;
};

const useUsers = (searchText, sortBy) => {
    const debouncedSearchText = useDebounce(searchText);
    const toast = useCustomToast();

    const { data: users = [] } = useQuery(
        [queryKeys.users, debouncedSearchText, sortBy],
        () => getUsers(searchText, sortBy),
        {
            onError: (err) => toast({ title: err.message, status: "error" }),
        }
    );

    return users;
};

export default useUsers;
