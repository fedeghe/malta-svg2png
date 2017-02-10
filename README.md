This plugin can be used on: **.svg** files

Options : no options  

Sample usage:  
```
malta app/media/daisy.svg public/media -plugins=malta-svg2png
```
or in the .json file :
```
"app/source/daisy.svg" : "public/media -plugins=malta-svg2png"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/daisy.svg',
    'public/media',
    '-plugins=malta-svg2png',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```