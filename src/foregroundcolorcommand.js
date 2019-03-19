import Command from '@ckeditor/ckeditor5-core/src/command';
export default class ForegroundColorCommand extends Command {
   /**
    * @inheritDoc
    */
   refresh() {
      const model = this.editor.model;
      const doc = model.document;

      this.value = doc.selection.getAttribute('foregroundcolor');
      this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, 'foregroundcolor');
   }

   execute(options = {}) {
      const model = this.editor.model;
      const document = model.document;
      const selection = document.selection;

      const highlighter = options.value;

      model.change(writer => {
         const ranges = model.schema.getValidRanges(selection.getRanges(), 'foregroundcolor');

         if (selection.isCollapsed) {
            const position = selection.getFirstPosition();

            if (selection.hasAttribute('foregroundcolor')) {
               const isSameForegroundColor = value => {
                  return value.item.hasAttribute('foregroundcolor') && value.item.getAttribute('foregroundcolor') === this.value;
               };

               const Start = position.getLastMatchingPosition(isSameForegroundColor, {direction: 'backward'});
               const End = position.getLastMatchingPosition(isSameForegroundColor);

               const Range = writer.createRange(Start, End);

               // Then depending on current value...
               if (!highlighter || this.value === highlighter) {
                  writer.removeAttribute('foregroundcolor', Range);
                  writer.removeSelectionAttribute('foregroundcolor');
               } else {
                  writer.setAttribute('foregroundcolor', highlighter, Range);
                  writer.setSelectionAttribute('foregroundcolor', highlighter);
               }
            } else if (highlighter) {
               writer.setSelectionAttribute('foregroundcolor', highlighter);
            }
         } else {
            for (const range of ranges) {
               if (highlighter) {
                  writer.setAttribute('foregroundcolor', highlighter, range);
               } else {
                  writer.removeAttribute('foregroundcolor', range);
               }
            }
         }
      });
   }
}
