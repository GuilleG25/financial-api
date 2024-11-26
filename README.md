# Nuxt Finacial API

## Configuracón

Instalar dependecias

```bash
$ yarn install
```

Variables de entorno

```bash
cp .env.example .env
#example:
MONGO_URI={URI base de datos de mongodb}
JWT_SECRET={secret_key para jwt}
ALLOWED_ORIGIN={origines permitidos separados por comas}

NOTA: Mirar .env.example
```

Compilar y iniciar el proyecto

```bash
# desarrollo
$ yarn run start

# desarrollo watch
$ yarn run start:dev

# producción
$ yarn build
$ yarn run start:prod
```
