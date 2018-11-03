chrome.runtime.onMessage.addListener(assignTextToAreas);
 
function assignTextToAreas(message){
    newText = message.updateTextTo;
    if(typeof newText === 'string'){
        replace(newText, 'butt');
    }
}
 
 
    function replace(find, replace){
    var elements = document.getElementsByTagName('*');
 
    var find1 = new RegExp(find, "gi")
 
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
 
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
 
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(find1, replace);
 
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
 
    }
}