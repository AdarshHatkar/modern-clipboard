

function fallbackCopyTextToClipboard(text: string) {
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        document.body.removeChild(textArea);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
}


export const copyTextToClipboard = (text: string) => {
    const clipboard = navigator.clipboard;

    if (!clipboard?.writeText) {
        fallbackCopyTextToClipboard(text);
        return;
    }

    clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
    }).catch((err) => {
        console.error('Async: Could not copy text: ', err);
        fallbackCopyTextToClipboard(text);
    });
};
