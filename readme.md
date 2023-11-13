# ChatGPT Accessibility Enhancements

ChatGPT Accessibility Enhancements is a Chrome extension designed to improve the ChatGPT user interface for screen reader users.

## Features

- Each ChatGPT response is presented with a heading level 3 for easy location by its heading.
- Announces when GPT begins and finishes generating its response.
- Adds accessible labels to the buttons that appear under ChatGPT's response, including:
  1. Copy Response
  2. Like Response
  3. Dislike Response
  4. Regenerate Response

## Caveats and Limitations

- If ChatGPT takes an unusually long time to finish generating a response, the announcements and button labeling may not be applied.
- When loading a previously saved chat in the ChatGPT web interface, the extension attempts to apply enhancements to existing chat messages and buttons. However, for very large conversation histories or slow-loading conversations, this may not always happen reliably.
- The extension relies on specific attributes of page elements to identify user messages, ChatGPT responses, buttons, and other items. Changes or updates made by OpenAI to the app's structure could disrupt the extension's functioning.
- This initial version is designed to provide helpful enhancements to the basic ChatGPT experience. I haven't tested this in more complex scenarios such as when using the Browse With Bing, DALL-E or Data Analysis features of GPT 4. 

## Future Plans

- Implementation of a user interface for configuring and customizing extension behaviors.
- Options for setting the timeout duration (how long the extension waits for ChatGPT to finish generating a response).
- Verbosity settings to allow users to choose which announcements they want to hear.
- Option to automatically read aloud incoming ChatGPT messages once they're fully generated.
- Custom labeling of the ChatGPT heading and buttons to provide flexibility in ARIA labels.
- Accommodating more use cases like the use of Browse With Bing, DALL-E, Data Analysis or other more advanced uses of ChatGPT not specifically addressed in this initial version.

## Get Involved!

If you're a developer and want to collaborate on this project, please reach out. If you're not a developer but have feedback, suggestions, ideas, or discover bugs with the extension, feel free to leave a comment.

## Installation and Usage

This extension is not yet published on the Chrome Web Store, so you'll need to manually download the files and save them to your computer, preferably in a folder called `ChatGptAccessibilityEnhancementsChromeExtension` or a similar name for easy access. Follow these [instructions](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/) on installing and activating a Chrome extension in developer mode.
