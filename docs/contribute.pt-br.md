# Como contribuir

[pt-br](https://github.com/polutz/generator-ptz-react/docs/contribute.pt-br.md)
[en-us](https://github.com/polutz/generator-ptz-react/docs/contribute.md)


## Setup

### Download do projeto
```
    git clone https://github.com/polutz/generator-ptz-react.git
```

### Abrir pasta do projeto
```
    cd generator-ptz-react
```

### Instalar dependencias
```
    npm install -g yo
```

```
    npm install && typings install
```

### Instalar globalmente

With 'npm link', you can run 'yo ptz-react' from anywhere on your machine,
and it will always points to this directory

```
    npm link
```


## Testes
```
    npm test
```

## Teste de integração

### Criar pasta do projeto teste
```
    mkdir ptz-react-test && cd ptz-react-test 
```

### Criar base do projeto com Yeoman
```
    yo ptz-react
```

### Limpar pasta do projeto teste
```
    find . -path ./.git -prune -o \( \! -path ./.yo-rc.json \) -exec rm -rf {} \; 2> /dev/null
```