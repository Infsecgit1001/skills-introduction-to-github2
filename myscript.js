// Office Add-in JavaScript code
Office.onReady(function () {
    if (Office.context.mailbox) {
        Office.context.mailbox.item.attachments.addHandlerAsync(
            Office.EventType.AttachmentAdded, 
            onAttachmentAdded
        );
    }
});

function onAttachmentAdded(eventArgs) {
    let attachment = eventArgs.attachment;
    
    // Get attachment details, including MIP label
    Office.context.mailbox.item.getAttachmentsAsync([attachment.id], function (result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
            let attachmentDetails = result.value[0];
            
            // Check for MIP sensitivity labels
            if (attachmentDetails.sensitivityLabel && attachmentDetails.sensitivityLabel.displayName.includes("Confidential")) {
                Office.context.mailbox.item.notificationMessages.addAsync("confidentialWarning", {
                    type: "informationalMessage",
                    message: "Warning: You have attached a file labeled as Confidential! Ensure it's sent securely.",
                    icon: "iconId",
                    persistent: true
                });
            }
        }
    });
}
