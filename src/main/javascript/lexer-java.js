var KOT = (function (module) {

    module.lexer = module.lexer || {};
    module.lexer.java = new module.Lexer([
        new module.Lexeme('comment', /\/\*(?:.|\n)*\*\//m),
        new module.Lexeme('comment', /\/\/.*/),
        new module.Lexeme('keyword', /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|double|do|else|enum|extends|false|finally|final|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throws|throw|true|transient|try|void|volatile|while)\b/),
        new module.Lexeme('annotation', /\@\w+\b/),
        new module.Lexeme('string-literal', /".*?"/),
        new module.Lexeme('string-literal', /'.*?'/),
        new module.Lexeme('numeric-literal', /\b(?:0x)?\d+[lfd]?\b/i)
    ]);

    return module;
}(KOT || {}));
