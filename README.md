csv2js.js
=========

csv2js.js is a JavaScript library for converting CSV text into JavaScript objects.

  - Designed to work right in the browser
  - Plain JS object and AMD module versions
  - No dependencies

#### toCollection(csvText, options) → {array}

Convert text in CSV format to an array of JavaScript objects.

##### Parameters:

<table class="params"><thead><tr align="left"><th>Name</th><th>Type</th><th class="last">Description</th></tr></thead>
<tbody><tr><td class="name"><code>csvText</code></td><td class="type"><span class="param-type">string</span></td><td class="description last">The complete CSV-formatted text as a string.</td></tr>
<tr><td class="name"><code>options</code></td><td class="type"><span class="param-type">object</span></td><td class="description last">The options to define the delimiter and/or firstRowHasHeaders settings.</td></tr></tbody></table>  

Source:
:   -   csv2js.js, line 51

##### Returns:

The array of corresponding JavaScript arrays.

Type:   array



#### toArray(csvText, options) → {array}

Convert text in CSV format to an array of JavaScript arrays.

##### Parameters:

<table class="params"><thead><tr align="left"><th>Name</th><th>Type</th><th class="last">Description</th></tr></thead>
<tbody><tr><td class="name"><code>csvText</code></td><td class="type"><span class="param-type">string</span></td><td class="description last">The complete CSV-formatted text as a string.</td></tr>
<tr><td class="name"><code>options</code></td><td class="type"><span class="param-type">object</span></td><td class="description last">The options to define the delimiter and/or firstRowHasHeaders settings.</td></tr></tbody></table>  

Source:
:   -   csv2js.js, line 21

##### Returns:

The array of corresponding JavaScript arrays.

Type:   array
