# Settings

| Setting             | Default              | Description                                                                                                            |                                                                            |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| input               | `assets/favicon.png` | Input file (jpg,png)                                                                                                   |                                                                            |
| output              | `img/favicons`       | Output directory, where the files will be placed.                                                                      |                                                                            |
| destination         | `img/favicons`       | When the output is different from the destination which should be used in the meta tags. You can give the destination. |                                                                            |
| color               | `white`              | Color used for default backgrounds.                                                                                    |                                                                            |
| themeColor          | `white`              | Theme color used in the meta tags.                                                                                     |                                                                            |
| appleStatusBarStyle | `default`            | Apple Status bar style used in the meta tags.                                                                          | default, black, black-translucent                                          |
| appName             | `NULL`               | App name used in meta tags.                                                                                            |                                                                            |
| appDeveloper        | `NULL`               | App developer used in meta tags.                                                                                       |                                                                            |
| appDeveloperUrl     | `NULL`               | App developer url used in meta tags.                                                                                   |                                                                            |
| appDescription      | `NULL`               | App description used in meta tags.                                                                                     |                                                                            |
| logging             | `[]`                 | Logging can be slightly altered, you can give no options for default.                                                  | silent, inline, debug                                                      |
| url                 | ``                   | By default all urls are relative. You can give a url to add this to the links for the files                            |                                                                            |
| sets                | `[]`                 | By default all sets will be generated, by defining any set, only the defined sets will be generated                    | android, appleIcon, appleStartup, coast, favicons, firefox,windows, yandex |

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
