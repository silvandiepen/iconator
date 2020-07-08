# Iconator

Generate Icons and favicons with a simple command.

Iconator takes an input image and generates a full set of icons out of this and passes back information which you can use in your project.

### Usage

**cli**

```bash
npx iconator --input=icon.png --output=img/favicons
```

**functional**

```js
import Iconator from 'iconator';

Iconator({
    input: 'myfile.jpg'
    output: 'my/output/dir'
}).then((result)=>{
// Now you can use the information passed back. For instance you can use the html passed back in your html (result.html)`
})
```

### Settings

| Setting             | Default              | Description                                                                                                            |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| input               | `assets/favicon.png` | Input file (jpg,png)                                                                                                   |
| output              | `img/favicons`       | Output directory, where the files will be placed.                                                                      |
| destination         | `img/favicons`       | When the output is different from the destination which should be used in the meta tags. You can give the destination. |
| color               | `white`              | Color used for default backgrounds.                                                                                    |
| themeColor          | `white`              | Theme color used in the meta tags.                                                                                     |
| appleStatusBarStyle | `default`            | Apple Status bar style used in the meta tags. (Default, black, black-translucent)                                      |
| appName             | `NULL`               | App name used in meta tags.                                                                                            |
| appDeveloper        | `NULL`               | App developer used in meta tags.                                                                                       |
| appDeveloperUrl     | `NULL`               | App developer url used in meta tags.                                                                                   |
| appDescription      | `NULL`               | App description used in meta tags.                                                                                     |
| logging             | `[]`                 | Logging can be slightly altered, you can give no options for default and `silent`,`inline` and debug.                  |

### Logging

Logging can be slightly altered, you can give no options for default and `silent`,`inline`, `minimal` or `debug`.

By default the logging will be complete, this shows all information.

**debug**
Debug will show some more extra information.

**silent**
Will make sure there is no logging output from Iconator

**inline**
The loggin has opening and closing elements. these will be hidden when using inline. This option is especially for use in other generators which already provide logging.

**Minimal**
A minimal way of showing the logs. Without all files, just the headlines.
