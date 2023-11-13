// In order to alert the user that GPT has finished generating it's message and label the buttons below that finished message, we use an observer to monitor the message div.
// This constant says when to give up and disconnect the instance of the observer for that message div if GPT is taking a while to finish.
const MAX_WAIT_TIME = 60000;

function isChatMessage(node) {
    return node.classList && node.classList.contains("w-full") && node.classList.contains("text-token-text-primary");
}

function isUserMessage(node) {
    return isChatMessage(node) && node.querySelector('div.font-semibold') && node.querySelector('div.font-semibold').textContent.trim() === 'You';
}

function isChatGptMessage(node) {
    return isChatMessage(node) && node.querySelector('div.font-semibold') && node.querySelector('div.font-semibold').textContent.trim() === 'ChatGPT';
}

function responseIsFinished(node) {
    return node.querySelector('button[aria-label="Regenerate Response"]') !== null;
}

function replaceChatGptDivWithH3(node) {
    // Query for all matching div elements within the provided node
    const chatGPTDivs = node.querySelectorAll('div.font-semibold');

    // Iterate through the matching divs
    chatGPTDivs.forEach((chatGPTDiv) => {
        if (chatGPTDiv.textContent.trim() === 'ChatGPT') {
            const h3 = document.createElement('h3');
            h3.className = chatGPTDiv.className;
            h3.textContent = chatGPTDiv.textContent;
            chatGPTDiv.parentNode.replaceChild(h3, chatGPTDiv);
            console.log('Replaced ChatGPT div with h3.');
        }
    });
}

function addAriaLabelsToButtons(node) {
    // Query for all matching button containers within the provided node
    const buttonDivs = node.querySelectorAll('div.text-gray-400.flex.self-end.lg\\:self-center.justify-center.gizmo\\:lg\\:justify-start.mt-2.gizmo\\:mt-0.visible.gap-1');

    // Iterate through the matching button containers
    buttonDivs.forEach((buttonDiv) => {
        console.log('Buttons container found.');
        const buttons = buttonDiv.querySelectorAll('button');
        const labels = ['Copy Response', 'Like Response', 'Dislike Response', 'Regenerate Response'];

        buttons.forEach((button, index) => {
            if (index < labels.length && !button.hasAttribute('aria-label')) {
                button.setAttribute('aria-label', labels[index]);
            }
        });
        console.log('Buttons updated with ARIA labels.');
    });
}

let responseAnnounced = false;
let secondaryObserverIsActive = false;

function announceMessage(message) {
    liveRegion.textContent = message;
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 100);
    console.log(`Announced message '${message}'`);
}

function announceResponseFinished() {
    announceMessage('Response is finished.');
    responseAnnounced = true;
    console.log('Announced text and set responseAnnounced to true.');
}

function observeChatGptNode(node) {
    const secondaryObserver = new MutationObserver((mutations, obs) => {
        console.log('Secondary observer triggered.');
        addAriaLabelsToButtons(node);
        if (responseIsFinished(node)) {
            console.log('Response is finished.');
            announceResponseFinished();
            obs.disconnect();
            secondaryObserverIsActive = false;
        } else {
            console.log('Response not finished.');
        }
    });

    secondaryObserver.observe(node, { childList: true, subtree: true });
    secondaryObserverIsActive = true;
    console.log(`Observing ChatGPT message with class = '${node.classList.value}'`);

    // Set a timeout to disconnect the observer if the maximum wait time is exceeded
    setTimeout(() => {
        if (secondaryObserverIsActive) {
            secondaryObserver.disconnect();
            secondaryObserverIsActive = false;

            announceMessage('The wait time for ChatGPT to finish responding has been reached.');
            responseAnnounced = true;
            console.log('Timeout for ChatGPT message observer was reached. Disconnecting observer.');
        }
    }, MAX_WAIT_TIME);
}

// Add a live region for announcements
const liveRegion = document.createElement('div');
liveRegion.setAttribute('role', 'status');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.style.position = 'absolute';
liveRegion.style.width = '1px';
liveRegion.style.height = '1px';
liveRegion.style.margin = '-1px';
liveRegion.style.padding = '0';
liveRegion.style.overflow = 'hidden';
liveRegion.style.clip = 'rect(0, 0, 0, 0)';
liveRegion.style.whiteSpace = 'nowrap';
liveRegion.style.border = '0';
document.body.appendChild(liveRegion);
console.log('Created live region and added it to the document model.');

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (isChatGptMessage(node)) {
                announceMessage('ChatGpt is generating a response. Please stand by.');
                console.log('Received ChatGPT message.');
                replaceChatGptDivWithH3(node);
                observeChatGptNode(node);
            } else if (isUserMessage(node)) {
                console.log('User\'s message was sent.');
                responseAnnounced = false;
                console.log('Set responseAnnounced to false.');
            }
        });
    });
});

const targetNode = document.querySelector('main');

const config = { childList: true, subtree: true };

if (targetNode) {
    // Attempt to apply accessibility enhancements to any existing items if the user might have loaded a previous chat session.
    // Give it a few moments to load up.
    setTimeout(() => {
        replaceChatGptDivWithH3(targetNode);
        addAriaLabelsToButtons(targetNode);
    }, 2000);

    console.log('Target node for observation acquired. Beginning observation.');
    observer.observe(targetNode, config);
} else {
    console.log('Target node not found');
}
