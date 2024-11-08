import * as React from "react";
export interface MessageDialogProps {
    message: string;
    isError: boolean;
    onClose?: () => void;
}
export declare const MessageDialog: React.FC<MessageDialogProps>;
