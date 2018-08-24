# chrome-crucible-fisheye-options
A Chrome extension for Atlassian Crucible &amp; Fisheye that allows changing your font size and line height for comfier code reviewing.

## Additional Changes
* Attachment images are responsive to screen width.

# How to use

1. Change the `HOST_URL` in **background.js** to some domain like: `crucible.mydomain.com`.
2. Specify `content_scripts` match pattern(s) in **manifest.json** to match your URLs like:

```
...
"content_scripts": [
  {
    "matches": ["https://crucible.mydomain.com/*"],
    "js": ["content.js"]
  }
]
...
```

3. Save your changes and load this using the **Load unpacked** extension option in Chrome.
