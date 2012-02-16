describe('Lexema object',function() {
    it('can lookup RegExp',  function() {
        var lexeme = new KOT.Lexeme("string-literal", /".*"/);

        expect(lexeme.indexIn('private String str = "yyyy";')).toBe(21);
        expect(lexeme.value).toEqual('"yyyy"');
        expect(lexeme.indexIn('private int str = 1;')).toBeLessThan(0);
    });
});

describe('Iterator object',function() {
    it('correctly iterate over',  function() {
        var data = [1, 2], i = 0;

        var iterator = new KOT.Iterator(function() {
            return (i < data.length)? data[i++]: null;
        });
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBe(1);
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBe(2);
        expect(iterator.hasNext()).toBeFalsy();
    });
});

describe('Token object',function() {
    it('correctly split text into lines',  function() {
        var factory = function(text, clazz) { return clazz; };

        expect((new KOT.Token('single line', 'class1')).toHTML(factory)).toEqual(['class1']);
        expect((new KOT.Token('two\nlines', 'class1')).toHTML(factory)).toEqual(['class1', 'class1']);
    });
});

describe('Lexer object',function() {
    it('can parse simple text',  function() {
        var lexemes = [
            new KOT.Lexeme('class1', /\b(?:private|final)\b/)
        ];

        var parser = new KOT.Lexer(lexemes).parse('    private final String value;');

        var factory = function(text, clazz) { return text; };

        expect(parser.hasNext()).toBeTruthy();
        expect(parser.next().toHTML(factory)).toEqual(['    ']);
        expect(parser.hasNext()).toBeTruthy();
        expect(parser.next().toHTML(factory)).toEqual(['private']);
        expect(parser.hasNext()).toBeTruthy();
        expect(parser.next().toHTML(factory)).toEqual([' ']);
        expect(parser.hasNext()).toBeTruthy();
        expect(parser.next().toHTML(factory)).toEqual(['final']);
        expect(parser.hasNext()).toBeTruthy();
        expect(parser.next().toHTML(factory)).toEqual([' String value;']);
        expect(parser.hasNext()).toBeFalsy();
    });
});
