# How to help


## Setup

### Download project
```
    git clone https://github.com/polutz/generator-ptz-react.git
```

### Go to project folder
```
    cd generator-ptz-react
```

### Install dependencies
```
    npm install -g yo
```

```
    npm install && typings install
```

### Make it globally

With 'npm link', you can run 'yo ptz-react' from anywhere on your machine,
and it will always points to this directory

```
    npm link
```


## Tests
```
    npm test
```

## Integration Test

### Create test project folder
```
    mkdir ptz-react-test && cd ptz-react-test 
```

### Clean test project folder
```
    cd .. && rm -r ptz-react-test && mkdir ptz-react-test && cd ptz-react-test
```

### Run Yeoman
```
    yo ptz-react
```
