/*!
 * csv2js: CSV to JavaScript converter (AMD version) - v0.1 - 2013-03-01
 * http://ian.cillay.com/projects/csv2js/
 * 
 * Copyright (c) 2013 Ian Cillay
 * Dual licensed under the MIT and GPL licenses.
 *//** @module csv2js */
define(
    'csv2js',
    [],
    function () {
        var my = this;
        my.delimiter = ",";

        return {
            /**
             * Convert text in CSV format to an array of JavaScript arrays.
             *
             * @param {string} csvText The complete CSV-formatted text as a string.
             * @param {object} options The options to define the delimiter and/or firstRowHasHeaders settings.
             * @return {array} The array of corresponding JavaScript arrays.
             */
            toArray: function(csvText, delimiter) {
                my.delimiter = delimiter || my.delimiter;

                var pattern = new RegExp(
                        "(\\" + my.delimiter + "|\\r?\\n|\\r|^)" +
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        "([^\"\\" + my.delimiter + "\\r\\n]*))",
                        "gi"
                    ),
                    quoted = new RegExp( "\"\"", "g"),
                    data = [[]],
                    matches;

                while (matches = pattern.exec(csvText)) {
                    var matchedDelimiter = matches[1];
                    if (matchedDelimiter.length && (matchedDelimiter != my.delimiter)) {
                        data.push( [] );
                    }
                    data[data.length - 1].push(matches[2] ? matches[2].replace(quoted, "\"") : matches[3]);
                }

                return data;
            },
            /**
             * Convert text in CSV format to an array of JavaScript objects.
             *
             * @param {string} csvText The complete CSV-formatted text as a string.
             * @param {object} options The options to define the delimiter and/or firstRowHasHeaders settings.
             * @return {array} The array of corresponding JavaScript objects.
             */
            toCollection: function(csvText, options) {
                var defaults = {
                        delimiter: ",",
                        firstRowHasHeaders: true,
                        returnJsonString: false
                    },
                    options = options || defaults,
                    data = this.toArray(csvText, options.delimiter || defaults.delimiter),
                    propertyNames = (options.firstRowHasHeaders !== false && defaults.firstRowHasHeaders) 
                        ? data[0] : (function () {
                            var arr = [];
                            for (var i = 0; i < data[0].length; i++) {
                                arr.push([ 'Field' + (i + 1) ]);
                            }
                            return arr;
                        })(),
                    collection = [];

                for (var i = 1; i < data.length; i++) {
                    var item = {};
                    for (var j = 0; j < propertyNames.length; j++) {
                        item[propertyNames[j]] = data[i][j];
                    }
                    collection.push(item);
                }

                return options.returnJsonString === true && typeof JSON === 'object' 
                    ? JSON.stringify(collection) : collection;
            }
        };
    }
);