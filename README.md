CKEditor 5 Foreground Color Feature
===================================

## Quick start

First, install the build from npm:

```bash
npm i ckeditor5-foreground-color
```

Use it in your JavaScript application:

```js
import ForegroundColor from 'ckeditor5-foreground-color/src/foregroundcolor';
```

```example
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ ForegroundColor, ... ],
        toolbar: [ 'foregroundcolor', ... ]
    } )
    .then( ... )
    .catch( ... );
```

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html).