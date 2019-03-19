import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ForegroundColorEditing from './foregroundcolorediting';
import ForegroundColorUI from './foregroundcolorui';


export default class ForegroundColor extends Plugin {
   /**
    * @inheritDoc
    */
   static get requires() {
      return [ForegroundColorEditing, ForegroundColorUI];
   }

   /**
    * @inheritDoc
    */
   static get pluginName() {
      return 'ForegroundColor';
   }
}