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

if (targetNode) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                replaceDivsWithH3();
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
    replaceDivsWithH3(); // Run initially for existing elements
} else {
    console.log('Target node (main) not found');
}
