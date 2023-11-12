const targetNode = document.querySelector('main');

function replaceDivsWithH3() {
    if (!targetNode) return; // Exit if targetNode is not found

    const divs = targetNode.querySelectorAll('div.font-semibold');

    divs.forEach(div => {
        if (div.textContent.trim() === 'ChatGPT') {
            const h3 = document.createElement('h3');
            h3.className = div.className;
            h3.textContent = div.textContent;
            div.parentNode.replaceChild(h3, div);
        }
    });
}

function addAriaLabelsToButtons() {
    // Select the container of all ChatGPT response items
    const responseContainer = document.querySelector('div.flex.flex-col.text-sm.gizmo\\:pb-9.dark\\:bg-gray-800.gizmo\\:dark\\:bg-transparent');

    if (responseContainer) {
        console.log('Response container');
        console.log(responseContainer);

        // Select the last ChatGPT response item
        const latestResponse = responseContainer.querySelector('div.w-full.text-token-text-primary.border-b.border-black\\/10.gizmo\\:border-0.dark\\:border-gray-900\\/50.gizmo\\:dark\\:border-0.bg-gray-50.gizmo\\:bg-transparent.dark\\:bg-\\[\\#444654\\].gizmo\\:dark\\:bg-transparent:last-child');

        if (latestResponse) {
            console.log('latestResponse');
            console.log(latestResponse);

            // Further query inside latestResponse to find the div containing the buttons
            const buttonDiv = latestResponse.querySelector('div.text-gray-400.flex.self-end.lg\\:self-center.justify-center.gizmo\\:lg\\:justify-start.mt-2.gizmo\\:mt-0.visible.gap-1');

            if (buttonDiv) {
                console.log('Button Div');
                console.log(buttonDiv);

                const buttons = buttonDiv.querySelectorAll('button');
                console.log('Buttons');
                console.log(buttons);
                const labels = ['Copy Response', 'Like Response', 'Dislike Response', 'Regenerate Response'];

                buttons.forEach((button, index) => {
                    if (index < labels.length && !button.hasAttribute('aria-label')) {
                        button.setAttribute('aria-label', labels[index]);
                    }
                });
            }
        }
    }
}

if (targetNode) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                replaceDivsWithH3();
                addAriaLabelsToButtons();
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
    replaceDivsWithH3(); // Run initially for existing elements
    addAriaLabelsToButtons();
} else {
    console.log('Target node (main) not found');
}
