import { useInfiniteQuery } from "react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../utils/queryKeys";
import useDebounce from "./useDebounce";
import { baseUrl } from "../axiosInstance/constants";
import { useCustomToast } from "./useCustomToast";

const getUsers = async (url) => {
    const { data } = await axiosInstance.get(url);
    return data;
};

const useUsersWithPagination = (searchText, sortBy) => {
    const debouncedSearchText = useDebounce(searchText);
    const toast = useCustomToast();

    const url = `${baseUrl}/users?search=${debouncedSearchText}&sort=${sortBy}&page=1&limit=10`;

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        [queryKeys.users, debouncedSearchText, sortBy],
        ({ pageParam = url }) => getUsers(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
            onError: (err) => toast({ title: err.message, status: "error" }),
        }
    );

    return { data, fetchNextPage, hasNextPage };
};

export default useUsersWithPagination;
