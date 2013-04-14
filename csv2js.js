/*!
 * csv2js: CSV to JavaScript converter (AMD version) - v0.1 - 2013-03-01
 * http://ian.cillay.com/projects/csv2js/
 * 
 * Copyright (c) 2013 Ian Cillay
 * Dual licensed under the MIT and GPL licenses.
 */
 /** @module csv2js */
var csv2js = (function () {
    var _delimiter = ",",
        _load = function (url, callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function () {
                callback(this.responseText);
            };
            xmlhttp.open('GET', url, false);
            xmlhttp.setRequestHeader('Accept', 'text/csv,text/plain,application/octet-stream');
            xmlhttp.send();
        };

    return {
        /**
        * Loads data from a URL (HTTP GET only) and returns it as an array of array of string.
        *
        * @param {string} url The URL to load (from same domain or CORS-enabled server).
        * @param {function} callback The method to call to send the results.
        * @param {object} options The options to define the delimiter and/or firstRowHasHeaders settings.
        */
        loadArray: function (url, callback, options) {
            var my = this;
            _load(url, function (responseText) {
                callback(my.toArray(responseText, options));
            });
        },
        /**
        * Loads data from a URL (HTTP GET only) and returns it as an array of objects.
        *
        * @param {string} url The URL to load (from same domain or CORS-enabled server).
        * @param {function} callback The method to call to send the results.
        * @param {object} options The options to define the delimiter and/or firstRowHasHeaders settings.
        */
        loadCollection: function (url, callback, options) {
            var my = this;
            _load(url, function (responseText) {
                callback(my.toCollection(responseText, options));
            });
        },
        /**
        * Convert text in CSV format to an array of JavaScript arrays.
        *
        * @param {string} csvText The complete CSV-formatted text as a string.
        * @param {object} options The options to define the delimiter and/or firstRowHasHeaders settings.
        * @return {array} The array of corresponding JavaScript arrays.
        */
        toArray: function (csvText, delimiter) {
            _delimiter = delimiter || _delimiter;

            var pattern = new RegExp(
                    "(\\" + _delimiter + "|\\r?\\n|\\r|^)" +
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    "([^\"\\" + _delimiter + "\\r\\n]*))",
                    "gi"
                ),
                quoted = new RegExp("\"\"", "g"),
                data = [[]],
                matches;

            while (Boolean(matches = pattern.exec(csvText))) {
                var matchedDelimiter = matches[1];
                if (matchedDelimiter.length && (matchedDelimiter != _delimiter)) {
                    data.push([]);
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
        toCollection: function (csvText, options) {
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
                            arr.push(['Field' + (i + 1)]);
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
})();