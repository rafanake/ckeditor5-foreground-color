import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ForegroundColorCommand from './foregroundcolorcommand';

/**
 * @extends module:core/plugin~Plugin
 */
export default class ForegroundColorEditing extends Plugin {
   /**
    * @inheritDoc
    */
   constructor(editor) {
      super(editor);

      editor.config.define('foregroundcolor', {
         options: [
            {color: '#000000', model: 'black1', title: 'Black 1'},
            {color: '#ffffff', model: 'white1', title: 'White 1'},
            {color: '#eeece1', model: 'beige1', title: 'Beige 1'},
            {color: '#1f497d', model: 'blue1', title: 'Blue 1'},
            {color: '#c0504d', model: 'red1', title: 'Red 1'},
            {color: '#9bbb59', model: 'green1', title: 'Green 1'},
            {color: '#8064a2', model: 'purple1', title: 'Purple 1'},
            {color: '#4bacc6', model: 'cyan1', title: 'Cyan 1'},
            {color: '#f79646', model: 'orange1', title: 'Orange 1'},
            {color: '#ffff00', model: 'yellow1', title: 'Yellow 1'},
            //
            {color: '#7f7f7f', model: 'black2', title: 'Black 2'},
            {color: '#f2f2f2', model: 'white2', title: 'White 2'},
            {color: '#ddd9c3', model: 'beige2', title: 'Beige 2'},
            {color: '#c6d9f0', model: 'blue2', title: 'Blue 2'},
            {color: '#f2dcdb', model: 'red2', title: 'Red 2'},
            {color: '#ebf1dd', model: 'green2', title: 'Green 2'},
            {color: '#e5e0ec', model: 'purple2', title: 'Purple 2'},
            {color: '#dbeef3', model: 'cyan2', title: 'Cyan 2'},
            {color: '#fdeada', model: 'orange2', title: 'Orange 2'},
            {color: '#fff2ca', model: 'yellow2', title: 'Yellow 2'},
            //
            {color: '#595959', model: 'black3', title: 'Black 3'},
            {color: '#eeeeee', model: 'white3', title: 'White 3'},
            {color: '#c4bd97', model: 'beige3', title: 'Beige 3'},
            {color: '#8db3e2', model: 'blue3', title: 'Blue 3'},
            {color: '#e5b9b7', model: 'red3', title: 'Red 3'},
            {color: '#d7e3bc', model: 'green3', title: 'Green 3'},
            {color: '#ccc1d9', model: 'purple3', title: 'Purple 3'},
            {color: '#b7dde8', model: 'cyan3', title: 'Cyan 3'},
            {color: '#fbd5b5', model: 'orange3', title: 'Orange 3'},
            {color: '#ffe694', model: 'yellow3', title: 'Yellow 3'},
            //
            {color: '#444444', model: 'black4', title: 'Black 4'},
            {color: '#d8d8d8', model: 'white4', title: 'White 4'},
            {color: '#938953', model: 'beige4', title: 'Beige 4'},
            {color: '#548dd4', model: 'blue4', title: 'Blue 4'},
            {color: '#d99694', model: 'red4', title: 'Red 4'},
            {color: '#c3d69b', model: 'green4', title: 'Green 4'},
            {color: '#b2a2c7', model: 'purple4', title: 'Purple 4'},
            {color: '#a3d4e0', model: 'cyan4', title: 'Cyan 4'},
            {color: '#fac08f', model: 'orange4', title: 'Orange 4'},
            {color: '#f2c314', model: 'yellow4', title: 'Yellow 4'},
            //
            {color: '#333333', model: 'black5', title: 'Black 5'},
            {color: '#cccccc', model: 'white5', title: 'White 5'},
            {color: '#494429', model: 'beige5', title: 'Beige 5'},
            {color: '#17365d', model: 'blue5', title: 'Blue 5'},
            {color: '#953734', model: 'red5', title: 'Red 5'},
            {color: '#76923c', model: 'green5', title: 'Green 5'},
            {color: '#5f497a', model: 'purple5', title: 'Purple 5'},
            {color: '#92cddc', model: 'cyan5', title: 'Cyan 5'},
            {color: '#e36c09', model: 'orange5', title: 'Orange 5'},
            {color: '#c09100', model: 'yellow5', title: 'Yellow 5'},
            //
            {color: '#222222', model: 'black6', title: 'Black 6'},
            {color: '#a5a5a5', model: 'white6', title: 'White 6'},
            {color: '#33301c', model: 'beige6', title: 'Beige 6'},
            {color: '#0f243e', model: 'blue6', title: 'Blue 6'},
            {color: '#632423', model: 'red6', title: 'Red 6'},
            {color: '#4f6128', model: 'green6', title: 'Green 6'},
            {color: '#3f3151', model: 'purple6', title: 'Purple 6'},
            {color: '#31859b', model: 'cyan6', title: 'Cyan 6'},
            {color: '#974806', model: 'orange6', title: 'Orange 6'},
            {color: '#7f6000', model: 'yellow6', title: 'Yellow 6'},
         ]
      });
   }

   /**
    * @inheritDoc
    */
   init() {
      const editor = this.editor;

      // Allow highlight attribute on text nodes.
      editor.model.schema.extend('$text', {allowAttributes: 'foregroundcolor'});

      const options = editor.config.get('foregroundcolor.options');

      // Set-up the two-way conversion.
      editor.conversion.attributeToElement(_buildDefinition(options));

      editor.commands.add('foregroundcolor', new ForegroundColorCommand(editor));
   }
}

// Converts the options array to a converter definition.
//
// @param {Array.<module:highlight/highlight~HighlightOption>} options An array with configured options.
// @returns {module:engine/conversion/conversion~ConverterDefinition}
function _buildDefinition(options) {
   const definition = {
      model: {
         key: 'foregroundcolor',
         values: []
      },
      view: {}
   };

   for (const option of options) {
      definition.model.values.push(option.model);
      definition.view[ option.model ] = {
         name: 'span',
         classes: 'ck5-fgcolor-span',
         styles: {
            'color': option.color
         }
      };
   }

   return definition;
}
