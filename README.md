Legal Things - Document merger
==================

With the document merger library, you can combine the contents of multiple documents.
**Currently only HTML is supported.**

## Requirements

- [Node.js (ES6)](https://nodejs.org) >= 5.0.0

## Installation

The library can be installed using npm.

    npm install document-merger

## How it works
The library exposes a single function with which you can merge documents together.
The documents are merged together by a `glue`, which can be custom defined and defaults to pagebreaks.
The results of the merged documents is a html file which contains a `body` tag that has the body of the combined documents in it.
The `head` is inherited from the first file.

```javascript
const DocumentMerger = require('document-merger');
const merger = new DocumentMerger();
let options = {
    documents: [
        {
            content: `
                <html>
                  <head>
                    <base href="http://example.com/cdn">
                  </head>
                  <body>
                    <p>This is the first document</p>
                  </body>
                </html>
            `,
            type: 'html'
        },
        {
            content: `
                <html>
                  <head>This will be ignored, since only the first head is used</head>
                  <body>
                    <p>This is the second document</p>
                    <b>It ends here</b>
                  </body>
                </html>
            `,
            type: 'html'
        }
    ],
    glue: '<div class="pagebreak"></div>' // default
};

console.log(merger.merge(options));
/* 
output:
<html>
  <head>
    <base href="http://example.com/cdn">
  </head>
  <body>
    <p>This is the first document</p>
    <div class="pagebreak"></div>
    <p>This is the second document</p>
    <b>It ends here</b>
  </body>
</html>
*/
```
