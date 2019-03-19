CKEditor 5 Highlight Color Feature
===================================

Custom Highlighter to add font color to your text within Ckeditor 5.

## Quick start

First, install the build from npm:

```bash
npm i ckeditor5-highlight-color
```

Use it in your JavaScript application:

```js
import Highlight from 'ckeditor5-highlight-color/src/highlight';
```

```example
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Highlight, ... ],
        toolbar: [ 'highlight', ... ]
    } )
    .then( ... )
    .catch( ... );
```

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html).