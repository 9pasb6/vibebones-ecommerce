

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


---------------------------------------------------------

Para complementar el README con la sección sobre el front-end hecho en Handlebars, considerando el contexto del desarrollo y las rutas definidas en tu aplicación Express, aquí tienes la sección correspondiente:

---

# Front-end (Cliente) con Handlebars

## Configuración inicial

1. Asegúrese de tener configurado y ejecutando el servidor backend según las instrucciones proporcionadas en la sección anterior.

## Rutas y vistas en Handlebars

El front-end de esta aplicación utiliza Handlebars como motor de plantillas para renderizar vistas dinámicas. A continuación se detallan las rutas y las vistas asociadas:

### Rutas y vistas principales

- **Inicio de sesión (Login)**

  - **Ruta:** `/login`
  - **Descripción:** Permite a los usuarios autenticados iniciar sesión.
  - **Vista:** `login.hbs`

- **Registro de usuario (Register)**

  - **Ruta:** `/register`
  - **Descripción:** Permite a los usuarios autenticados registrarse en la plataforma.
  - **Vista:** `register.hbs`

- **Página de inicio**

  - **Ruta:** `/`
  - **Descripción:** Página principal mostrando información general.
  - **Vista:** `index.hbs`

### Gestión de productos

- **Actualizar producto**

  - **Ruta:** `/products/update/:id`
  - **Descripción:** Permite la actualización de un producto existente.
  - **Vista:** `updateProduct.hbs`

- **Crear producto**

  - **Ruta:** `/products/create/`
  - **Descripción:** Permite la creación de un nuevo producto.
  - **Vista:** `createProduct.hbs`

- **Listado de productos**

  - **Ruta:** `/products`
  - **Descripción:** Muestra todos los productos disponibles.
  - **Vista:** `products.hbs`

### Gestión de compras

- **Compra (para administrador)**

  - **Ruta:** `/purchase`
  - **Descripción:** Visualización de compras para administradores.
  - **Vista:** `purchase.hbs`

- **Crear compra**

  - **Ruta:** `/purchase/create/:id`
  - **Descripción:** Permite la generación de una nueva compra.
  - **Vista:** `purchaseCreate.hbs`

- **Compras del usuario**

  - **Ruta:** `/purchase/user/`
  - **Descripción:** Muestra las compras realizadas por el usuario.
  - **Vista:** `purchaseUser.hbs`

### Carrito de compras

- **Carrito de compras**

  - **Ruta:** `/cart`
  - **Descripción:** Visualización y gestión del carrito de compras.
  - **Vista:** `cart.hbs`

## Uso y desarrollo

- Asegúrese de que el servidor backend esté activo y ejecutándose para utilizar correctamente las rutas y vistas mencionadas.
  
- Personalice las vistas de Handlebars según las necesidades específicas de su aplicación, asegurándose de integrar correctamente con las funcionalidades implementadas en el backend.

---

Este README proporciona una visión general de las rutas y vistas configuradas en el front-end de la aplicación utilizando Handlebars. Asegúrese de tener correctamente configurado tanto el servidor backend como el entorno para el desarrollo front-end para un funcionamiento óptimo de la aplicación.
