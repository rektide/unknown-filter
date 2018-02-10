# Unknown Filter

> Filter that returns only things it has not seen

# Usage

```
import UnknownFilter from "unknown-filter"

var myFilter= new UnknownFilter()
myFilter(42) //=> 42
myFilter(42) //=> [undefined]
var a= {a: 1}
myFilter(a) //=> {a: 1}
myFilter(a) //=> [undefined]
```
