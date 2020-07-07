# Iconator

Generate Icons and favicons with a simple command.

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
})
```

### Settings

| Setting             | Default              | Description |
| ------------------- | -------------------- | ----------- |
| input               | `assets/favicon.png` |             |
| output              | `img/favicons`       |             |
| debug               | `false`              |             |
| color               | `white`              |             |
| themeColor          | `white`              |             |
| appleStatusBarStyle | `default`            |             |
| appName             | `NULL`               |             |
| appDeveloper        | `NULL`               |             |
| appDeveloperUrl     | `NULL`               |             |
| appDescription      | `NULL`               |             |
