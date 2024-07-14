

---

# Backend (Servidor)

## Configuración inicial

1. Acceda al directorio `server` y abra una terminal en su editor de código.

2. Instale las dependencias necesarias ejecutando el comando:

   ```bash
   npm install
   ```
3. En caso de no existir la carpeta dist utilizar el comando `tsc` para compilar el Ts a Js

## Uso de Docker (opcional)

Si prefiere utilizar Docker para la base de datos PostgreSQL y pgAdmin, siga estos pasos:

1. Asegúrese de tener Docker instalado en su equipo.

2. Levante el contenedor que contiene la base de datos y pgAdmin con:

   ```bash
   docker compose up -d
   ```

3. Verifique que los contenedores estén en estado "UP" con:

   ```bash
   docker ps
   ```

## Migración de modelos y seeders

Para migrar los modelos a la base de datos:

1. Realice la migración de los modelos con Sequelize:

   ```bash
   sequelize db:migrate
   ```

2. Para agregar datos preestablecidos, migre los seeders con:

   ```bash
   sequelize db:seed:all
   ```

### Nota:

- Si necesita deshacer la migración y los seeders:

  ```bash
  sequelize db:seed:undo:all
  sequelize db:migrate:undo:all
  ```

## Acceso a pgAdmin

1. Acceda a pgAdmin de PostgreSQL en su navegador:

   [localhost:8888](http://localhost:8888)

2. Utilice las siguientes credenciales para iniciar sesión:

   - **Email:** admin@admin.com
   - **Contraseña:** adminroot

## Registro del servidor en pgAdmin

1. Registre un nuevo servidor utilizando las siguientes credenciales de la base de datos:

   - **Usuario:** postgres
   - **Contraseña:** password
   - **Nombre de la base de datos:** vibebones
   - **Host:** localhost
   - **Puerto:** 5432

2. Visualice los registros de cada tabla en los esquemas de `vibebones`.

## Iniciar el servidor

Para iniciar el servidor, ejecute el siguiente comando:

```bash
npm run dev
```

---

Este README proporciona instrucciones detalladas para configurar y ejecutar el servidor backend, incluyendo la instalación de dependencias, el uso de Docker para la base de datos, la migración de modelos y seeders, y el acceso y registro en pgAdmin para la administración de la base de datos PostgreSQL.

