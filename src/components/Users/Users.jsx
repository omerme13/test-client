import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import useUsersWithPagination from "../../hooks/useUsersWithPagination";
import User from "./User/User";

import "./Users.scss";

const Users = ({ searchText, sortBy }) => {
    const { data, fetchNextPage, hasNextPage } = useUsersWithPagination(
        searchText,
        sortBy
    );

    return (
        <div className="users">
            {data && (
                <InfiniteScroll
                    className="users__container"
                    loadMore={fetchNextPage}
                    hasMore={hasNextPage}
                >
                    {data.pages.map((page) => {
                        return page.data.map((user) => (
                            <User key={user._id} data={user} />
                        ));
                    })}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Users;
