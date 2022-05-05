import { Avatar, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";

import useDeleteUser from "../../../hooks/useDeleteUser";
import UserForm from "../../UserForm/UserForm";

import "./User.scss";

const User = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const deleteUser = useDeleteUser();

    const editModeHandler = () => {
        if (!isOpen && !isEditMode) {
            setIsOpen(true);
        }

        setIsEditMode((isEditMode) => !isEditMode);
    };

    return (
        <div className={`user ${isOpen && "user--open"}`}>
            <div className="user__display">
                <Avatar
                    className="user__avatar"
                    name={`${data.first_name} ${data.last_name}`}
                    src={data.avatar}
                />
                <div className="user__name">
                    <Text>
                        {data.first_name} {data.last_name}
                    </Text>
                </div>
                <div className="user__buttons">
                    <IconButton
                        icon={<>{isOpen ? "△" : "▽"}</>}
                        onClick={() => setIsOpen((isOpen) => !isOpen)}
                        background={isOpen ? "darksalmon" : ""}
                    />
                    <IconButton
                        icon={<>Edit</>}
                        onClick={editModeHandler}
                        background={isEditMode ? "darksalmon" : ""}
                    />
                    <IconButton
                        icon={<>X</>}
                        onClick={() => deleteUser(data._id)}
                        color="orangered"
                        background="transparent"
                    />
                </div>
            </div>
            <div className="user__form">
                {isOpen && <UserForm isEditMode={isEditMode} user={data} />}
            </div>
        </div>
    );
};

export default User;
