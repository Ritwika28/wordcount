import { parentPort, workerData } from 'worker_threads';

interface StringMap { [key: string]: number; }
function wordMap(str: string) {
            return getWordsByWordBoundaries(str).reduce(function(map: StringMap, word: string) {
                map[word] = (map[word] || 0) + 1;
                return map;
            }, {});
}

function getWordsByWordBoundaries(str: string) {
            return extractSubstr(str, /\b[a-z\d]+\b/g);
}

function cleanString(str: string) {
            return str.replace(/[^\w\s]|_/g, '')
                .replace(/\s+/g, ' ')
                .toLowerCase();
}

function extractSubstr(str: string, regexp: RegExp) {
            return cleanString(str).match(regexp) || [];
}
 
parentPort?.postMessage(
            wordMap(workerData.value)
);