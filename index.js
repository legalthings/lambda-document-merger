'use strict'

const DocumentMerger = require('document-merger');
const merger = new DocumentMerger();

exports.handler = (event, context, callback) => {
    let documents = [];

    if (!event || !event instanceof Array) {
        return callback('Context must be an array');
    }

    event.forEach((html) => {
        if (!html instanceof String) {
            return callback('Context array must contain strings');
        }

        documents.push({
            content: html,
            type: 'html'
        });
    });

    const result = merger.merge({
        documents: documents
    });

    callback(null, result);
}
