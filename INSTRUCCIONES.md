# Les devoirs de Noah: instalar la app en la tablet Android

La app es una página web instalable (PWA). Se abre desde un icono en la tablet, funciona sin internet y se actualiza sola cuando cambias las lecciones.

## 1. Subirla a GitHub Pages (una sola vez, unos 10 minutos)

1. Entra en https://github.com y crea una cuenta gratuita (o inicia sesión).
2. Arriba a la derecha pulsa **+ > New repository**.
   - Nombre: `devoirs-noah`
   - Visibilidad: **Public** (GitHub Pages gratis lo necesita).
   - Marca **Add a README file** y pulsa **Create repository**.
3. En el repositorio pulsa **Add file > Upload files**.
4. Descomprime el zip de la app en tu ordenador y arrastra TODO su contenido (los archivos `index.html`, `app.js`, `drawings.js`, `lessons.json`, `manifest.webmanifest`, `sw.js` y la carpeta `icons`) a la página. Pulsa **Commit changes**.
5. Ve a **Settings > Pages**. En «Build and deployment», elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y pulsa **Save**.
6. Espera uno o dos minutos y recarga. GitHub te muestra la dirección de la app, por ejemplo `https://TU-USUARIO.github.io/devoirs-noah/`.

## 2. Instalarla en la tablet

1. En la tablet abre **Chrome** y entra en esa dirección.
2. Pulsa el menú de los tres puntos y elige **Instalar app** (o **Añadir a la pantalla de inicio**).
3. Abre la app desde el icono nuevo, con la cara de Noah. La primera vez necesita internet; después abre también sin conexión.
4. Voz en francés de Francia: en Android ve a Ajustes > Sistema > Idiomas > Texto a voz (o Accesibilidad > Salida de texto a voz) y descarga la voz «Français (France)». En «Para mamá y papá», dentro de la app, puedes elegir y probar la voz.

## 3. Cómo se actualiza

Cada vez que abres la app con internet, descarga la última versión de `lessons.json` y del código. Si hay cambios, muestra el aviso «Nouvelles leçons !». Sin internet usa la última copia guardada.

Para cambiar una lección tienes dos caminos:

- **Cambio pequeño** (corregir una palabra, una frase, una fecha): en GitHub abre `lessons.json`, pulsa el lápiz, edita y pulsa **Commit changes**.
- **Lección nueva de cada semana**: envíame la foto de la hoja de deberes y las páginas del libro. Te devuelvo `lessons.json` actualizado, y `drawings.js` si hay vocabulario nuevo que necesite dibujos. Los subes a GitHub con **Add file > Upload files** (reemplazan a los anteriores).
- Si conectas tu cuenta de GitHub en la configuración de Claude, puedo subir yo los cambios directamente y no tendrás que hacer nada.

## 4. Lecciones anteriores y repasos

`lessons.json` guarda todas las lecciones. La actual es la que dice `"current"`. Al añadir una lección nueva, las anteriores quedan en «Leçons précédentes» con sus tareas, y en cada reto se puede elegir:

- La dictée de la lección actual.
- Todos los mots de la lección actual.
- Toutes les leçons (repaso de todo lo anterior).
- Una lección anterior en concreto.

El progreso y los récords se guardan en la tablet. Si borras los datos de la app, vuelven a cero.
