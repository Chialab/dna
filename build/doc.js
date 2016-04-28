'use strict';

const cwd = process.cwd();
const path = require('path');
const generator = require('../node_modules/es6-workflow/lib/gendoc.js').generate;

let files = [
    'dna-attributes-component.next.js',
    'dna-base-component.next.js',
    'dna-component.next.js',
    'dna-config.next.js',
    'dna-events-component.next.js',
    'dna-helper.next.js',
    'dna-mixed-component.next.js',
    'dna-properties-component.next.js',
    'dna-style-component.next.js',
    'dna-template-component.next.js',
].map((f) => path.join(cwd, 'src', f));

generator(files);
