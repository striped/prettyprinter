var KOT = (function (module) {
    function getContent(element) {
        if (element.textContent) {
            return element.textContent.trim();
        }
        if (element.innerText) {
            return element.innerText;
        }
        return element.innerHTML;
    }

    function lookup(classes) {
        for (var i = 0; i < classes.length; i++) {
            if (module.lexer[classes[i]]) {
                return module.lexer[classes[i]];
            }
        }
        return new module.Lexer([]);
    }

    function decorate(element) {

        function classify(clazz) {
            var line = document.createElement('span');
            line.className = clazz;
            return line;
        }

        function divide(clazz) {
            return document.createElement('br');
        }

        function elementFactory(text, clazz) {
            if (clazz) {
                var result = classify(clazz);
                result.appendChild(document.createTextNode(text));
                return result;
            }
            return document.createTextNode(text);
        }

        var i, nodes,
            line = classify('line'),
            lexer = lookup(element.className.split(/\s+/)).parse(getContent(element));

        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
        while (lexer.hasNext()) {
            nodes = lexer.next().toHTML(elementFactory);

            line.appendChild(nodes[0]);
            for (i = 1; i < nodes.length; i++) {
                element.appendChild(line);
                element.appendChild(divide());
                line = classify('line');
                line.appendChild(nodes[i]);
            }
        }
        element.appendChild(line);
        element.appendChild(divide());
    }

    var elements = document.getElementsByTagName('pre');
    for (var i = 0; i < elements.length; i++) {
        decorate(elements[i]);
    }
    return module;
}(KOT || {}));
