(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require("purify"), require("unorm"));
  } else if (typeof define === 'function' && define.amd) {
    define(['purify', 'unorm'], factory);
  } else {
    root.unicodeSlug = factory(root.purify);
  }
}(this, function () {

    function unicodeSlug(url) {
        var blocked = [
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+',
            '[', '{', '}', ']', ':', ';', '\'', ',', '<', '>', '.', '/', '\\', '?'];

        var slugchars = (url || '').split(''),
            slug;

        slugchars = slugchars.map(function (c) {
            c = purify.nonEmptyPrintableUnicode(c, '');
            return blocked.indexOf(c) !== -1 ? '' : c;
        });

        slug = slugchars.join('');

        // remove whitespace, replace to - for valid url
        slug = slug.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        slug = slug.replace(/[\s\-_]+/g, '-').toLowerCase();
        slug = slug.replace(/\-+$/, '');

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
        return slug.normalize();
    }

    return unicodeSlug;

}));
