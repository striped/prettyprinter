var KOT = (function (module) {

    module.lexer = module.lexer || {};
    module.lexer.bash = new module.Lexer([
        new module.Lexeme('comment', /#.*/),
        new module.Lexeme('keyword', /\b(?:if|then|elif|else|fi|for|until|while|do|done|case)\b/),
        new module.Lexeme('string-literal', /".*?"/),
        new module.Lexeme('string-literal', /'.*?'/),
        new module.Lexeme('numeric-literal', /\b\d+\b/)
    ]);

    return module;
}(KOT || {}));
