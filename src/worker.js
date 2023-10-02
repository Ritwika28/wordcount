    self.onmessage = function(message)
    {
        var txtObj = wordMap(message.data);
        var txt = '';

        for (var i in txtObj)
        {
            txt += `<tr><td>${i}</td><td>${txtObj[i]}</td></tr>`;
        }
        postMessage(txt);
    }

    function wordMap(str) {
            return getWordsByWordBoundaries(str).reduce(function(map, word) {
                map[word] = (map[word] || 0) + 1;
                return map;
            }, {});
    }

    function getWordsByWordBoundaries(str) {
            return extractSubstr(str, /\b[a-z\d]+\b/g);
    }

    function cleanString(str) {
            return str.replace(/[^\w\s]|_/g, '')
                .replace(/\s+/g, ' ')
                .toLowerCase();
    }

    function extractSubstr(str, regexp) {
            return cleanString(str).match(regexp) || [];
    }