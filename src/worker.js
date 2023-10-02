    self.onmessage = function(message)
    {
        var txtObj = message.data;
        var txt = '';
        for (var i in txtObj)
        {
            txt += `<tr><td>${i}</td><td>${txtObj[i]}</td></tr>`;
        }
        postMessage(txt);
    }