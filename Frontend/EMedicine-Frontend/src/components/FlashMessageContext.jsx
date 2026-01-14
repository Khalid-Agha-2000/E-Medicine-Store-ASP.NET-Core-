import { createContext, useContext, useState } from "react";
import FlashMessage from "./FlashMessage";

const FlashMessageContext = createContext();

export function FlashMessageProvider({ children }) {
    const [flashMessage, setFlashMessage] = useState(null);

    return (
        <FlashMessageContext.Provider value={{ setFlashMessage }}>
            <FlashMessage 
                message={flashMessage?.message} 
                type={flashMessage?.type} 
                onClose={() => setFlashMessage(null)} 
            />
            {children}
        </FlashMessageContext.Provider>
    );
}

export function useFlashMessage() {
    return useContext(FlashMessageContext);
}