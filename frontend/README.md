# Socialdev Frontend

Red social para desarrolladores construida con Angular 20.3.4.

## Descripción

Plataforma que permite a desarrolladores conectar, compartir contenido y colaborar. Incluye funcionalidades de publicaciones, perfiles de usuario, sistema de seguimiento y feed de actividades.

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Comandos Útiles

```bash
# Compilar para producción
ng build

# Ejecutar tests
ng test

# Generar componente
ng generate component nombre-componente
```

## Despliegue

El proyecto está desplegado en **Vercel** (tanto frontend como backend). La aplicación utiliza:
- **Build optimizado**: Los archivos compilados se generan en `dist/` con optimizaciones de rendimiento
- **API**: Se conecta al backend desplegado en Vercel a través de variables de entorno configurables
