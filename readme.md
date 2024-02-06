<h3 align="center">¡Hola! 😊 Soy Celeste, ¡bienvenido a mi repositorio! ❤️</h3>

# **¡Asincronismo / APIs!** 
> *Cuarto proyecto como estudiantes de **desarrollo de FRONTEND** en ADA ITW, Tecnologias implementadas:*
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="45" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="45" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="45" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bulma/bulma-plain.svg" height="45" alt="bulma logo"  />
</div>

## Pautas y requirimientos
### Los requisitos mínimos para que el proyecto sea considerado para la entrega son:

* [Ejemplo](https://youtu.be/kbw9MZhuuS0/)
* Este TP tiene un desarrollo individual.
* Tecnologias:
    * Utilizar HTML, CSS y Javascript.
* Disenio
    * La eleccion de paleta de colores y tipografia es libre.
    * Deben respetar la estructura dada por el ejemplo, en tamanio y dimensiones.
    * DEBE ser responsive. Se revisara mobile y tablets tanto en portrait como en landscape.
    * DEBE respetar el flow propuesto, es decir, donde y como aparecen los elementos segun los clicks del usuario.
* API:
    * La API a utilizar es MockAPI. Cada alumna debe tener su propia API y por lo tanto su propio endpoint.
    * Endpoint habra solo uno y sera llamado /jobs en donde se haran peticiones GET, POST, PUT y DELETE.
## Flow del proyecto
* Al cargarse la pagina se visualiza el navbar, el formulario de busqueda y el footer.
* Hay un componente que simula una carga, este durara 2 segundos, y al finalizar se cargaran los todos jobs disponibles (metodo GET).
* El formulario permite filtrar la busqueda de jobs mediante los fields location, seniority o category. La busqueda realizada mostrara todos los resultados coincidentes con lo que elige el usuario. (metodo GET con filtros, recuerden que mockAPI muestra todos los resultados que coincidan con cualquiera de los filtros puestos).
* Si el usuario da click en "Clear" se deben limpiar los filtros del formulario y reiniciarse la busqueda (es decir, volveran a aparecer todos los jobs, metodo GET).
* Si el usuario da click en "Create a job" debe desaparecer la homepage dejando ver un formulario para crear jobs (metodo POST). Al volver a la home, se vera el nuevo job creado igual que los preexistentes.
* Si el usuario da click en "Details" se debera ver en pantalla unicamente el detalle del job seleccionado, tras 2 segundos de visualizar el componente de carga.
* En el detalle del job se vera informacion adicional del mismo y los botones de "Edit" y "Delete".
* Si el usuario da click en "Edit", debera aparecer debajo del detalle un formulario con los datos del job ya precargados. Al enviar el fomulario se debe actualizar este job con las modificaciones hechas (metodo PUT).
* Si el usuario da click en "Delete", debe desaparecer el detalle y en su lugar aparecer un componente de alerta preguntando si estas seguro de realizar esta accion, en conjunto con el respectivo boton de "Delete" que efectiviza la solicitud (metodo DELETE) y el de "Cancel" que devolvera al usuario a la pagina principal.
* Se les da la posibilidad de agregar datos adicionales al objeto job, pero como MINIMO debe contener la estructura propuesta y seran 20 objetos de minima.
* Los datos de la API seran un array de objetos que cumplan con la siguiente estructura:

```js
const jobs = [
  {
    "name": "FrontEnd Developer",
    "image": "https://someimageaboutthejob.com/job1.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus turpis in eu mi bibendum neque. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sagittis purus sit amet volutpat consequat mauris nunc congue.",
    "location": "Remote",
    "category": "Development",
    "seniority": "Junior",
    "benefits": {
        "vacation": "3 weeks",
        "health_ensurance": "OSDE 210",
        "internet_paid": true
    },
    "salary": 350000,
    "long_term": true,
    "languages": ["ReactJS", "Javascript", "SASS", "NodeJS"],
    "id": "1"
  }
];
```
[Ver sitio web deployado](https://celesteselena2022.github.io/Buscador-de-Comics/)

<h3 align="center">¡Hecho con ❤️ y mucho cariño!</h3>

<div align="center">
  <img height="200" src="https://media4.giphy.com/media/opDRL3H2A9iLNuvbOv/giphy.webp?cid=790b7611rnr2qgedubbi673x0cd2xe95m1nndlp9h9bloqn9&ep=v1_gifs_search&rid=giphy.webp&ct=g"  />
</div>

###

###

<div align="center">
  <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289DA&logoColor=white&labelColor=&style=for-the-badge" height="27" alt="discord logo"  />
  <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="27" alt="gmail logo"  />
  <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="27" alt="linkedin logo"  />
  <img src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=2CA5E0&logoColor=white&labelColor=&style=for-the-badge" height="27" alt="telegram logo"  />
</div>

###