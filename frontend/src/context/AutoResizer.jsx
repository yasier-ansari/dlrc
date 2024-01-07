import { useEffect } from "react";
const useAutosizeTextArea = (textAreaRef
    , value) => {
    useEffect(() => {
        const textCurrent = textAreaRef?.current
        if (textCurrent !== null && textCurrent !== undefined) {
            textCurrent.style.height = "auto";
            const scrollHeight = textCurrent.scrollHeight
            textAreaRef.current.style.height = `${scrollHeight}px`
            console.log("text height ", textCurrent.style.height)
        }
    }, [textAreaRef, value]);
};

export default useAutosizeTextArea;