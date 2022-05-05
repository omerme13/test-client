import { Button, Input } from "@chakra-ui/react";
import { useReducer } from "react";

import useAddUser from "../../hooks/useAddUser";
import useUpdateUser from "../../hooks/useUpdateUser";

import "./UserForm.scss";

const getInitialState = (userData) => {
    return {
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        gender: userData.gender || "",
        avatar: userData.avatar || "",
        job: {
            company: "Dansilzoom",
            department: "operations",
            position: "District Optimization Coordinator",
            salary: 19722,
            start_work: "2114-06-19T12:35:48Z",
        },
        contacts: {
            email: "early_ara@outlook.com",
            mobile: "746-773-3636",
        },
        location: {
            city: "Coffey",
            country: "Mexico",
            state: "Washington",
            street: "Manor Drive",
        },
    };
};

const actionTypes = {
    INPUT_TYPE: "INPUT_TYPE",
};

const formReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.INPUT_TYPE:
            return {
                ...state,
                [action.field]: action.payload,
            };

        default:
            return state;
    }
};

const UserForm = ({ isEditMode, user = {}, isAddUser = false, onSend }) => {
    const [formState, dispatch] = useReducer(
        formReducer,
        getInitialState(user)
    );
    const addUser = useAddUser();
    const updateUser = useUpdateUser();

    const handleText = (e) =>
        dispatch({
            type: actionTypes.INPUT_TYPE,
            field: e.target.name,
            payload: e.target.value,
        });

    const isFormValid = () => formState.first_name && formState.last_name;

    const handleSendReq = () => {
        if (onSend) {
            onSend();
        }

        isAddUser
            ? addUser(formState)
            : updateUser({ user: formState, userId: user._id });
    };

    const getInput = (name, value, isRequired) =>
        (isEditMode || value) && (
            <Input
                name={name}
                value={value}
                placeholder={name.split("_").join(" ")}
                onChange={(e) => handleText(e)}
                isRequired={isRequired}
                isReadOnly={!isEditMode}
                variant={isEditMode ? "outline" : "unstyled"}
            />
        );

    return (
        <form className="user-form">
            <div className="user-form__inputs">
                {getInput("first_name", formState.first_name, true)}
                {getInput("last_name", formState.last_name, true)}
                {getInput("gender", formState.gender, false)}
                {getInput("avatar", formState.avatar, false)}
            </div>
            {isEditMode && (
                <Button
                    className="user-form__button"
                    disabled={!isFormValid()}
                    onClick={handleSendReq}
                >
                    {`${isAddUser ? "Add" : "update"} user`}
                </Button>
            )}
        </form>
    );
};

export default UserForm;
