# Asteriums 2026 · Revista interactiva

**[Abrir la revista](https://sylyx739.github.io/asteriums-2026/)**

**[Descargar el proyecto completo · ZIP de 393 MB](https://github.com/Sylyx739/asteriums-2026/releases/download/v1.1.0/Asteriums_Revista_Flipbook.zip)**

La revista contiene 60 páginas, 14 videos originales y 84 perfiles interactivos. Abre con la portada individual y continúa en pliegos dobles; en móvil muestra una página. Incluye miniaturas, búsqueda, zoom, pantalla completa y controles de sonido.

El proyecto completo actualizado está en el ZIP adjunto a la versión v1.1.0. La opción «Code → Download ZIP» de este repositorio contiene la configuración de publicación; utiliza la descarga anterior para obtener también videos y páginas.

Los videos se solicitan al visitar sus páginas. Su contenido audiovisual se conserva sin recompresión. Las páginas que eran estáticas permanecen estáticas. Los enlaces originales a sitios externos requieren conexión y están sujetos a la disponibilidad de esos sitios.

Para escuchar, pulsa «Activar sonido». Los navegadores pueden bloquear la reproducción automática con audio hasta que interactúes.

El visor actual añade un lomo central, grosor de papel y giro de hojas en ambas direcciones. Los fotogramas temporales del paso de página son parte de la transición exterior; los MP4 originales siguen reproduciéndose en sus elementos de video.

Los cambios del visor están en `web/`. El ZIP de la versión v1.1.0 incluye el visor actualizado y todos los recursos; la versión v1.0.0 conserva el paquete base.

## Publicación y mantenimiento

GitHub Pages se publica mediante Actions desde la rama main. Para volver a desplegar esta versión: Actions → Publicar revista Asteriums → Run workflow → main. El flujo descarga el ZIP de la versión v1.0.0 y verifica SHA-256, recursos y número de páginas antes de publicar.

SHA-256 del ZIP: `70f7f2fee2e9dbf81bac8f99e0f900f7cb4168761ed73af7469277bff3162a89`.

El ZIP incluye las instrucciones de alojamiento y el informe de validación. Para ejecutarlo localmente, extrae el ZIP y sirve la carpeta `asteriums-web` con un servidor HTTP local; el enlace público está listo para usar sin instalación.
