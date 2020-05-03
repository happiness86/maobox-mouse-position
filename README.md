# mouse-position
> A mapbox plugin that can get the latitude and longitude of the map

## Install
`npm i mouse-position`

## Setup
```javascript
import { MousePosition } from 'mouse-position'
```

## Usage
```javascript
map.addControl(new MousePosition())
```
### options

parameter | description 
---|---
accuracy (`Number`) | Latitude and longitude accuracy 
duration (`Number`)| The time the pop-up window exists (ms)
