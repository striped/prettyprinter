var KOT = (function (module) {

    module.Iterator = function(fn) {
        this.current = fn();
        this.hasNext = function() {
            return (this.current)? true: false;
        };
        this.next = function() {
            if (this.current) {
                var result = this.current;
                this.current = fn();
                return result;
            }
        };
    };

    module.Lexeme = function(clazz, expression) {
        this.clazz = clazz;
        this.indexIn = function(string) {
            if (expression) {
                var match = expression.exec(string);
                if (match) {
                    this.value = match[0];
                    return match.index;
                }
                return -1;
            }
            return 0;
        };
    };

    module.Token = function(value, clazz) {
        this.toHTML = function(factory) {
            var i, result = [], lines = value.split('\n');
            for (i = 0; i < lines.length; i++) {
                result[i] = factory(lines[i], clazz);
            }
            return result;
        };
    };

    module.Lexer = function(lexemes) {
        this.parse = function(source) {
            return new module.Iterator(
                function() {
                    if (source) {
                        var lexeme, token, i, pos, min = source.length;
                        for (i = 0; i < lexemes.length; i++) {
                            pos = lexemes[i].indexIn(source);
                            if (0 <= pos && pos < min) {
                                  lexeme = lexemes[i];
                                  min = pos;
                            }
                        }
                        if (0 === min) {
                            source = source.substr(lexeme.value.length);
                            return new module.Token(lexeme.value, lexeme.clazz);
                        }
                        token = new module.Token(source.substring(0, min));
                        source = source.substr(min);
                        return token;
                    }
                }
            );
        };
    };
    return module;
}(KOT || {}));

