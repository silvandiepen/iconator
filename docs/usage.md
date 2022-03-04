
# Usage

### CLI

```bash
npx iconator --input=icon.png --output=img/favicons
```

### JavaScript

```js
import Iconator from 'iconator';

Iconator({
    input: 'myfile.jpg'
    output: 'my/output/dir'
}).then((result)=>{
// Now you can use the information passed back. For instance you can use the html passed back in your html (result.html)`
})
```