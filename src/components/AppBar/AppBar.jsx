import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

import { sortOptions } from "../../utils/sortOptions";
import UserForm from "../UserForm/UserForm";

import "./AppBar.scss";

const AppBar = ({ searchText, setSearchText, sortBy, setSortBy }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="app-bar">
            <Button onClick={onOpen}>Add New User</Button>
            <Input
                color="#fff"
                width="auto"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search user..."
            />
            <div className="app-bar__select">
                <Text>Sort by:</Text>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    width="auto"
                    color="#fff"
                >
                    {Object.values(sortOptions).map(
                        ({ value, displayedValue }) => (
                            <option
                                key={value}
                                style={{ background: "#333" }}
                                value={value}
                            >
                                {displayedValue}
                            </option>
                        )
                    )}
                </Select>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={30}>
                    <UserForm isEditMode isAddUser onSend={onClose} />
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AppBar;
