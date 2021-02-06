### SnowFall

Simple library to make snowfall on your browser


## Documenatation

https://nijeesh4all.github.io/snowfall/classes/src_snowflake.snowflake.html


## Demo

https://unruffled-jepsen-423d54.netlify.app/

## Installing

load the script like you would load any external libraries

```html
<script src='./snow-flake.js'></script>
```

# Using

## Browser

### creating a single snow flake
```html
<script>
  const { SnowFlake } = window.SnowFlake
  
  # This is optional, if not provided default values will be used
  # check documentation for more info
  options = { color: 'red', max_z_index: 100 }
  
  flake = new SnowFlake(options)
  flake.animate()
  
</script>
```

### creating a single snow fall

```html
<script>
  const { SnowFlake, SnowFall } = window.SnowFlake
  
  # This is optional, if not provided default values will be used
  # check documentation for more info
  options = { color: 'red', max_z_index: 100 }
  SnowFlake.configure(options)
  
  const flake_count = 100;
  const fall = new SnowFall(flake_count)
  fall.start()
</script>
```


