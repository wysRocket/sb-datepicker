## DatePicker

Forked from original code. See CHANGES-SB.txt.

To build:

* `cd vite-preact-dp`
* `./mybuild`
* copy newly created `dist/assets/index.[a-z0-9].js` to `app/`

Setting `minify: false` in `vite.config.js` will turn off minification.

Replace `node_modules/react-datepicker-tz` with our git repo to modify that code. To build it, run `npm run build` in its root directory (probably also have to run `npm install` first).


`~~~~~~~~~~~~~~~~`



Main variant build with the [ViteJS](https://vitejs.dev) because it compiles the bundle with the [ESBuild](https://esbuild.github.io)

Entry-point is the `index.html` to run it i'm using [LiveServer VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

inside `index.html` i'm connecting compiled version of [React Date Picker](https://www.npmjs.com/package/react-datepicker)
compairing to any other module this one with 1.3M Weekly Downloads has best support

Module can be upgraded with functionality and layout can be overwriten with `sass` variables inside
folder [vite-preact-dp]
to start dev process we need to install dependencies with Yarn

```bash
yarn
```

to run the dev server

```bash
vite
```

after updating the Module it can be compiled with

```bash
vite build
```

also need to import appropriate bundles to `index.html` cause their names are dynamicaly generated

# `datepicker` (component)

# `docs` [DP Docs](https://github.com/Hacker0x01/react-datepicker/tree/master/docs)

General datepicker component.

| name                         | type                           | default value   | description                                                                                   |
| ---------------------------- | ------------------------------ | --------------- | --------------------------------------------------------------------------------------------- |
| `allowSameDay`               | `bool`                         | `false`         |                                                                                               |
| `ariaDescribedBy`            | `string`                       | `null`          |                                                                                               |
| `ariaInvalid`                | `string`                       | `null`          |                                                                                               |
| `ariaLabelledBy`             | `string`                       | `null`          |                                                                                               |
| `ariaRequired`               | `string`                       | `null`          |                                                                                               |
| `autoComplete`               | `string`                       |                 |                                                                                               |
| `autoFocus`                  | `bool`                         |                 |                                                                                               |
| `calendarClassName`          | `string`                       |                 |                                                                                               |
| `children`                   | `node`                         |                 |                                                                                               |
| `className`                  | `string`                       |                 |                                                                                               |
| `clearButtonTitle`           | `string`                       |                 |                                                                                               |
| `clearButtonClassName`       | `string`                       |                 | Customize the clear button                                                                    |
| `customInput`                | `element`                      |                 |                                                                                               |
| `customInputRef`             | `string`                       | `'ref'`         | The property used to pass the ref callback                                                    |
| `dateFormat`                 | `union(string\|array)`         | `'MM/dd/yyyy'`  |                                                                                               |
| `dateFormatCalendar`         | `string`                       | `'LLLL yyyy'`   |                                                                                               |
| `dayClassName`               | `func`                         |                 |                                                                                               |
| `weekDayClassName`           | `func`                         |                 |                                                                                               |
| `disabled`                   | `bool`                         | `false`         |                                                                                               |
| `disabledKeyboardNavigation` | `bool`                         | `false`         |                                                                                               |
| `dropdownMode` (required)    | `enum('scroll'\|'select')`     | `'scroll'`      |                                                                                               |
| `endDate`                    | `instanceOf(Date)`             |                 |                                                                                               |
| `excludeDates`               | `array`                        |                 |                                                                                               |
| `excludeDateIntervals`       | `array`                        |                 |                                                                                               |
| `excludeTimes`               | `array`                        |                 |                                                                                               |
| `excludeScrollbar`           | `array`                        |                 |                                                                                               |
| `filterDate`                 | `func`                         |                 |                                                                                               |
| `filterTime`                 | `func`                         |                 |                                                                                               |
| `fixedHeight`                | `bool`                         |                 |                                                                                               |
| `focusSelectedMonth`         | `bool`                         | `false`         |                                                                                               |
| `forceShowMonthNavigation`   | `bool`                         |                 |                                                                                               |
| `formatWeekNumber`           | `func`                         |                 |                                                                                               |
| `highlightDates`             | `array`                        |                 |                                                                                               |
| `id`                         | `string`                       |                 |                                                                                               |
| `includeDates`               | `array`                        |                 |                                                                                               |
| `includeDateIntervals`       | `array`                        |                 |                                                                                               |
| `includeTimes`               | `array`                        |                 |                                                                                               |
| `injectTimes`                | `array`                        |                 |                                                                                               |
| `inline`                     | `bool`                         |                 |                                                                                               |
| `isClearable`                | `bool`                         |                 |                                                                                               |
| `locale`                     | `string`                       |                 |                                                                                               |
| `maxDate`                    | `instanceOf(Date)`             |                 |                                                                                               |
| `maxTime`                    | `instanceOf(Date)`             |                 |                                                                                               |
| `minDate`                    | `instanceOf(Date)`             |                 |                                                                                               |
| `minTime`                    | `instanceOf(Date)`             |                 |                                                                                               |
| `monthsShown`                | `number`                       | `1`             |                                                                                               |
| `name`                       | `string`                       |                 |                                                                                               |
| `onBlur`                     | `func`                         | `function() {}` |                                                                                               |
| `onCalendarClose`            | `func`                         |                 |                                                                                               |
| `onCalendarOpen`             | `func`                         |                 |                                                                                               |
| `onChange` (required)        | `func`                         | `function() {}` |                                                                                               |
| `onChangeRaw`                | `func`                         |                 |                                                                                               |
| `onClickOutside`             | `func`                         | `function() {}` |                                                                                               |
| `onFocus`                    | `func`                         | `function() {}` |                                                                                               |
| `onKeyDown`                  | `func`                         | `function() {}` |                                                                                               |
| `onMonthChange`              | `func`                         | `function() {}` |                                                                                               |
| `onSelect`                   | `func`                         | `function() {}` |                                                                                               |
| `onWeekSelect`               | `func`                         |                 |                                                                                               |
| `onYearChange`               | `func`                         | `function() {}` |                                                                                               |
| `openToDate`                 | `instanceOf(Date)`             |                 |                                                                                               |
| `peekNextMonth`              | `bool`                         |                 |                                                                                               |
| `placeholderText`            | `string`                       |                 |                                                                                               |
| `popperClassName`            | `string`                       |                 |                                                                                               |
| `popperContainer`            | `func`                         |                 |                                                                                               |
| `popperModifiers`            | `object`                       |                 |                                                                                               |
| `popperPlacement`            | `enumpopperPlacementPositions` |                 |                                                                                               |
| `preventOpenOnFocus`         | `bool`                         | false           | When this is true, the datepicker will not automatically open when the date field is focussed |
| `readOnly`                   | `bool`                         |                 |                                                                                               |
| `required`                   | `bool`                         |                 |                                                                                               |
| `scrollableYearDropdown`     | `bool`                         |                 |                                                                                               |
| `selected`                   | `instanceOf(Date)`             |                 |                                                                                               |
| `selectsEnd`                 | `bool`                         |                 |                                                                                               |
| `selectsStart`               | `bool`                         |                 |                                                                                               |
| `shouldCloseOnSelect`        | `bool`                         | `true`          |                                                                                               |
| `showMonthDropdown`          | `bool`                         |                 |                                                                                               |
| `showTimeSelect`             | `bool`                         | `false`         |                                                                                               |
| `showWeekNumbers`            | `bool`                         |                 |                                                                                               |
| `showYearDropdown`           | `bool`                         |                 |                                                                                               |
| `startDate`                  | `instanceOf(Date)`             |                 |                                                                                               |
| `startOpen`                  | `bool`                         |                 |                                                                                               |
| `tabIndex`                   | `number`                       |                 |                                                                                               |
| `timeClassName`              | `func`                         |                 |                                                                                               |
| `timeFormat`                 | `string`                       |                 |                                                                                               |
| `timeIntervals`              | `number`                       | `30`            |                                                                                               |
| `title`                      | `string`                       |                 |                                                                                               |
| `todayButton`                | `node`                         |                 |                                                                                               |
| `useWeekdaysShort`           | `bool`                         |                 |                                                                                               |
| `utcOffset`                  | `union(number\|string)`        |                 |                                                                                               |
| `value`                      | `string`                       |                 |                                                                                               |
| `weekLabel`                  | `string`                       |                 |                                                                                               |
| `withPortal`                 | `bool`                         | `false`         |                                                                                               |
| `portalId`                   | `string`                       |                 |                                                                                               |
| `portalHost`                 | `instanceOf(ShadowRoot)`       |                 | When set, portals will be attached to this ShadowRoot instead of the document body.           |
| `wrapperClassName`           | `string`                       |
|                              |
| `yearItemNumber`             | `number`                       | `12`            |                                                                                               |
| `yearDropdownItemNumber`     | `number`                       |                 |                                                                                               |
