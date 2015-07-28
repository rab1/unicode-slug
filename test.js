var expect = require('unexpected'),
    unicodeSlug = require('./unicodeSlug');

describe('unicode generator', function () {
    beforeEach(function (cb) {
        cb();
    });

    it('generates dashed url', function (cb) {
        expect(unicodeSlug(" aaa bb "), 'to be', "aaa-bb");
        cb();
    });


    it('should remove special chars', function (cb) {
        expect(unicodeSlug('aaa %^&*&)*)*^(_\"{}:|<>?:\"bb '), 'to be', "aaa-bb");
        cb();
    });


    it('should keeps unicode chars', function (cb) {
        expect(unicodeSlug("aaa bb  漢語"), 'to be', "aaa-bb-漢語");
        cb();
    });
});
