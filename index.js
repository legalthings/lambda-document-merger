'use strict'

const DocumentMerger = require('document-merger');
const merger = new DocumentMerger();

exports.handler = (event, context, callback) => {
    let documents = [];

    if (!event || !event instanceof Object || !event instanceof Array) {
        return callback('Payload must be an object or an array of html strings');
    }

    const html = event.documents || event;

    html.forEach((html) => {
        if (!html instanceof String) {
            return callback('Payload html array must contain strings');
        }

        documents.push({
            content: html,
            type: 'html'
        });
    });

    const options = {
        documents: documents
    };

    if (event instanceof Object) {
        delete event.documents;
        Object.assign(options, event);
    }

    const result = merger.merge(options);

    callback(null, result);
}
