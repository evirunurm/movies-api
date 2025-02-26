## Funcionalidades:

### ✅ Ver las películas más populares

Los usuarios pueden ver una lista de las películas más populares basadas en las calificaciones y el número de visualizaciones.

#### Requisitos funcionales

Página de inicio con una sección destacada de películas populares. 
Filtro para ordenar las películas por popularidad.

#### Requisitos API

- Endpoint: `GET /movies/popular`
- Query params: 
  - `limit`, con el número de películas a mostrar.
- Response: Lista de películas, ordenadas por popularidad.

``` json
{
  data: [
    {
      title: "The Shawshank Redemption",
      popularity: 1,
      rating: 9.3,
    }
  ]
}
```

___

### ✅ Ver las películas mejor valoradas

Los usuarios pueden ver una lista de las películas mejor valoradas según las críticas y puntuaciones.

#### Requisitos funcionales

Página con una sección de las películas mejor valoradas. 
Filtro para ordenar las películas por valoración.

#### Requisitos API

- Endpoint: `GET /movies/top-rated`
- Query params: 
  - `limit`, con el número de películas a mostrar.
- Response: Lista de películas, ordenadas por valoración.

``` json
{
  data: [
    {
      title: "The Shawshank Redemption",
      popularity: 1,
      rating: 9.3,
    }
  ]
}
```

___

### ✅ Ver próximos estrenos

Los usuarios pueden ver una lista de las películas que se estrenarán próximamente.

#### Requisitos funcionales

Página con una sección dedicada a los próximos estrenos. 
Filtro para ordenar las películas por fecha de estreno. 
Paginación para navegar entre las películas.

#### Requisitos API

- Endpoint: `GET /movies/new-releases`
- Query params:
  - `order`, Orden de las películas por fecha de estreno (`asc` para ascendente, `desc` para descendente).
  - `page`, número de página.
  - `perPage`, número de películas por página.
- Response: Lista de películas consideradas como próximos estrenos.

``` json
{
  data: [
    {
      title: "The Shawshank Redemption",
      popularity: 1,
      rating: 9.3,
    }
  ],
  pagination: {
    "totalPages": 10,
    "currentPage": 2,
    "perPage": 10,
    "next": "/movies/new-releases?page=3&perPage=10",
    "prev": "/movies/new-releases?page=1&perPage=10"
  }
}
```
___

### ✅ Guardar películas favoritas

Los usuarios pueden guardar sus películas favoritas en una lista personalizada.

#### Requisitos funcionales

Botón para agregar/quitar una película a/de la lista de favoritos. 
Página de perfil de usuario con la lista de películas favoritas.

#### Requisitos API

##### Guardar película favorita

- Endpoint: `POST /user/:id/favorites`
- Response: 201

##### Quitar película favorita

- Endpoint: `DELETE /user/:id/favorites`
- Response: 204

##### Ver películas favoritas

- Endpoint `GET /user/:id/favorites`
- Response: Lista de películas favoritas del usuario.

``` json
{
  data: [
    {
      title: "The Shawshank Redemption",
      popularity: 1,
      rating: 9.3,
      favorited-date: "2021-09-01"
    }
  ]
}
```

___

### 🕐 Detalle de la película

Los usuarios pueden ver detalles específicos de una película seleccionada.

**Requisitos**: Página de detalles que incluye el título, sinopsis, tráiler, reparto, críticas y valoraciones. Enlace a la página de detalles desde las listas de películas.

### Ver los cines más cercanos

Desde la página de detalles de una película, los usuarios pueden ver los cines más cercanos a su ubicación donde se proyecta la película.

**Requisitos**: Mostrar un Google Maps embebido con los cines más cercanos a mi ubicación.