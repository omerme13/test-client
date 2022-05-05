import { useCustomToast } from "./useCustomToast";

export const useQueryError = () => {
    const toast = useCustomToast();

    const queryErrorToast = (error) => {
        const title =
            typeof error === "string" ? error : "error connecting to server";
        toast({ title, status: "error" });
    };

    return queryErrorToast;
};
