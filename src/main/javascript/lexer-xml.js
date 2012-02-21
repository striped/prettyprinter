var KOT = (function (module) {

    module.lexer = module.lexer || {};
    module.lexer.xml = new module.Lexer([
        new module.Lexeme('pi', /\<\?[\S\s]*\?\>/m),
        new module.Lexeme('doctype', /\<\!DOCTYPE[^\>]*\>/m),
        new module.Lexeme('comment', /\<\!--[\s\S]*?--\>/m),
        new module.Lexeme('cdata', /\<\!\[CDATA\[[\S\s]*?\]\]\>/m),
        new module.Lexeme('tag', /\<\/?[\w-]+\>?/),
        new module.Lexeme('tag', /\>/),
        new module.Lexeme('attribute', /\s+\w+=/),
        new module.Lexeme('value', /".*?"/)
    ]);

    return module;
}(KOT || {}));
