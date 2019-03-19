import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import buttonIcon from './../theme/icons/button.svg';
import boxIcon from './../theme/icons/box.svg';
import clearIcon from './../theme/icons/clear.svg';

import ToolbarSeparatorView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarseparatorview';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import './../theme/foregroundcolor.css';

export default class ForegroundColorUI extends Plugin {
   get localizedOptionTitles() {
      const t = this.editor.t;

      return {
         'Black 1': t('Black 1'),
         'Black 2': t('Black 2'),
         'Black 3': t('Black 3'),
         'Black 4': t('Black 4'),
         'Black 5': t('Black 5'),
         'Black 6': t('Black 6'),
         'White 1': t('White 1'),
         'White 2': t('White 2'),
         'White 3': t('White 3'),
         'White 4': t('White 4'),
         'White 5': t('White 5'),
         'White 6': t('White 6'),
         'Beige 1': t('Beige 1'),
         'Beige 2': t('Beige 2'),
         'Beige 3': t('Beige 3'),
         'Beige 4': t('Beige 4'),
         'Beige 5': t('Beige 5'),
         'Beige 6': t('Beige 6'),
         'Blue 1': t('Blue 1'),
         'Blue 2': t('Blue 2'),
         'Blue 3': t('Blue 3'),
         'Blue 4': t('Blue 4'),
         'Blue 5': t('Blue 5'),
         'Blue 6': t('Blue 6'),
         'Red 1': t('Red 1'),
         'Red 2': t('Red 2'),
         'Red 3': t('Red 3'),
         'Red 4': t('Red 4'),
         'Red 5': t('Red 5'),
         'Red 6': t('Red 6'),
         'Green 1': t('Green 1'),
         'Green 2': t('Green 2'),
         'Green 3': t('Green 3'),
         'Green 4': t('Green 4'),
         'Green 5': t('Green 5'),
         'Green 6': t('Green 6'),
         'Purple 1': t('Purple 1'),
         'Purple 2': t('Purple 2'),
         'Purple 3': t('Purple 3'),
         'Purple 4': t('Purple 4'),
         'Purple 5': t('Purple 5'),
         'Purple 6': t('Purple 6'),
         'Cyan 1': t('Cyan 1'),
         'Cyan 2': t('Cyan 2'),
         'Cyan 3': t('Cyan 3'),
         'Cyan 4': t('Cyan 4'),
         'Cyan 5': t('Cyan 5'),
         'Cyan 6': t('Cyan 6'),
         'Orange 1': t('Orange 1'),
         'Orange 2': t('Orange 2'),
         'Orange 3': t('Orange 3'),
         'Orange 4': t('Orange 4'),
         'Orange 5': t('Orange 5'),
         'Orange 6': t('Orange 6'),
         'Yellow 1': t('Yellow 1'),
         'Yellow 2': t('Yellow 2'),
         'Yellow 3': t('Yellow 3'),
         'Yellow 4': t('Yellow 4'),
         'Yellow 5': t('Yellow 5'),
         'Yellow 6': t('Yellow 6'),
      };
   }

   /**
    * @inheritDoc
    */
   static get pluginName() {
      return 'ForegroundColorUI';
   }

   /**
    * @inheritDoc
    */
   init() {
      const options = this.editor.config.get('foregroundcolor.options');

      for (const option of options) {
         this._addForegroundColorButton(option);
      }

      this._addRemoveForegroundColorButton();

      this._addDropdown(options);
   }

   _addRemoveForegroundColorButton() {
      const t = this.editor.t;

      this._addButton('removeForegroundColor', t('Remove ForegroundColor'), clearIcon);
   }

   _addForegroundColorButton(option) {
      const command = this.editor.commands.get('foregroundcolor');
      // TODO: change naming
      this._addButton('foregroundcolor:' + option.model, option.title, boxIcon, option.model, decorateForegroundColorButton);

      function decorateForegroundColorButton(button) {
         button.bind('isEnabled').to(command, 'isEnabled');
         button.bind('isOn').to(command, 'value', value => value === option.model);
         button.iconView.fillColor = option.color;
      }
   }

   _addButton(name, label, icon, value, decorateButton = () => {}) {
      const editor = this.editor;

      editor.ui.componentFactory.add(name, locale => {
         const buttonView = new ButtonView(locale);
         console.log(label);
         const localized = this.localizedOptionTitles[ label ] ? this.localizedOptionTitles[ label ] : label;
         console.log(localized);

         buttonView.set({
            label: localized,
            icon,
            tooltip: true
         });

         buttonView.on('execute', () => {
            editor.execute('foregroundcolor', {value});
            editor.editing.view.focus();
         });

         // Add additional behavior for buttonView.
         decorateButton(buttonView);

         return buttonView;
      });
   }

   _addDropdown(options) {
      const editor = this.editor;
      const t = editor.t;
      const componentFactory = editor.ui.componentFactory;

      const startingForegroundColor = options[ 0 ];

      const optionsMap = options.reduce((retVal, option) => {
         retVal[ option.model ] = option;

         return retVal;
      }, {});

      componentFactory.add('foregroundcolor', locale => {
         const command = editor.commands.get('foregroundcolor');
         const dropdownView = createDropdown(locale, SplitButtonView);
         const splitButtonView = dropdownView.buttonView;

         splitButtonView.set({
            tooltip: t('ForegroundColor'),
            lastExecuted: startingForegroundColor.model,
            commandValue: startingForegroundColor.model
         });

         splitButtonView.bind('icon').to(command, 'value', value => buttonIcon);
         splitButtonView.bind('color').to(command, 'value', value => getActiveOption(value, 'color'));
         splitButtonView.bind('commandValue').to(command, 'value', value => getActiveOption(value, 'model'));
         splitButtonView.bind('isOn').to(command, 'value', value => !!value);

         splitButtonView.delegate('execute').to(dropdownView);

         // Create buttons array.
         const buttons = options.map(option => {
            const buttonView = componentFactory.create('foregroundcolor:' + option.model);
            this.listenTo(buttonView, 'execute', () => dropdownView.buttonView.set({lastExecuted: option.model}));

            return buttonView;
         });

         // Add Class
         dropdownView.set('class', 'ckeditor5-foreground-color');
         // Make toolbar button enabled when any button in dropdown is enabled before adding separator and eraser.
         dropdownView.bind('isEnabled').toMany(buttons, 'isEnabled', (...areEnabled) => areEnabled.some(isEnabled => isEnabled));

         // Add separator and eraser buttons to dropdown.
         buttons.push(componentFactory.create('removeForegroundColor'));

         addToolbarToDropdown(dropdownView, buttons);
         bindToolbarIconStyleToActiveColor(dropdownView);

         // Execute current action from dropdown's split button action button.
         splitButtonView.on('execute', () => {
            editor.execute('foregroundcolor', {value: splitButtonView.commandValue});
            editor.editing.view.focus();
         });

         function getActiveOption(current, key) {
            const whichForegroundColor = !current || current === splitButtonView.lastExecuted ? splitButtonView.lastExecuted : current;
            return optionsMap[ whichForegroundColor ][ key ];
         }

         return dropdownView;
      });
   }
}

// Extends split button icon style to reflect last used button style.
function bindToolbarIconStyleToActiveColor(dropdownView) {
   const actionView = dropdownView.buttonView.actionView;

   actionView.iconView.bind('fillColor').to(dropdownView.buttonView, 'color');
}
