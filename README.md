# Agenda Telefónica API

API RESTful de una agenda telefónica, para la materia arquitectura web, construida con Node.js, utilizando express y usando como base de datos MongoDB.

## Rutas

#### Crear registro
<details>
 <summary><code>POST</code> <code><b>/v1/contactos/</b></code><code>Agregar un nuevo contacto</code></summary>

##### Body ejemplo

```json
{
  "nombre": "Raul Gomez",
  "telefono": "01145623454",
  "email": "rgomez@ejemplo.com",
  "sector": "Ventas"
}
```

##### Respuesta

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `text/plain;charset=UTF-8`        | `contacto creado exitosamente      `                                |
> | `500`         | `text/plain;charset=utf-8`         | `Error al crear el contacto`                                       |

##### Ejemplo cURL

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:3000/v1/contactos -d '{
  "nombre": "Pablo Perez",
  "telefono": "543665655",
  "email": "pperez@ejemplo.com",
  "sector": "Ventas"
}'
```

</details>

------------------------------------------------------------------------------------------
#### Consultar registros

<details>
 <summary><code>GET</code> <code><b>/v1/contactos/</b></code><code>Consultar todos los contactos</code></summary>

##### Parameters

> None
 
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `JSON String`                                                        |
> | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                            |
> | `500`         | `text/plain;charset=utf-8`         | `Error al crear el contacto`                                       |

##### Ejemplo cURL

```bash
curl http://localhost:3000/v1/contactos
```

</details>

<details>
 <summary><code>GET</code> <code><b>/v1/contactos/{_id}</b></code><code>Consultar por ID</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `_id` |  `required` | `String`                   | `ID del contacto`                     |
 
##### Responses
> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `JSON string`                                                       |
> | `400`         | `text/plain;charset=UTF-8`        | `formato _id invalido`                                              |
> | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                            |
> | `500`         | `text/plain;charset=utf-8`        | `Error al obtener el contacto`                                      |


##### Ejemplo cURL

```bash
curl http://localhost:3000/v1/contactos/65503187742acfc9d7396ca1
```
</details>

<details>
 <summary><code>GET</code> <code><b>/v1/contactos/telefonos/{_telefono}</b></code><code>Consultar por telefono</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `telefono` |  `required` | `String`                    | `Telefono del contacto`           |
 
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `JSON string`              `                                          |
> | `404`         | `text/plain;charset=UTF-8`        | `telefono no encontrado`                                            |
> | `500`         | `text/plain;charset=utf-8`        | `Error al obtener el telefono`                                      |

##### Ejemplo cURL

```bash
curl http://localhost:3000/v1/contactos/telefonos/435456
```
</details>

<details>
 <summary><code>GET</code> <code><b>/v1/contactos/?nombre={:nombre}& sector={:sector} </b></code><code>Consultar contactos por querystring (nombre/sector) </code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `nombre` |  `opcional` |` String `                   | `nombre del contacto`         |
> | `sector` |  `opcional` | `String`                    | `sector del contacto`         |
 
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`               | `JSON String`                                                           |
> | `500`         | `text/plain;charset=utf-8`         | `Error al crear el contacto`                                       |
 > | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                            |

##### Ejemplo cURL

```bash
curl http://localhost:3000/v1/contactos?sector=IT&nombre=Ignacio
```

</details>

------------------------------------------------------------------------------------------
#### Actualizar registro

<details>
   <summary><code>PUT</code> <code><b>/v1/contactos/{_id}</b></code><code>Actualizar registro por ID</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `_id` |  `required` | `String`                    | `ID del contacto`                     |

##### Responses
> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `contacto actualizado exitosamente`                                |
> | `400`         | `text/plain;charset=UTF-8`        | `formato id invalido`                                               |
> | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                             |
> | `500`         | `text/plain;charset=utf-8`         | `Error al actualizar el contacto`                                   |

##### Example cURL

```bash
curl -X PUT -H "Content-Type: application/json" http://localhost:3000/v1/contactos/65503187742acfc9d7396ca1 -d '{"nombre":"Alejandra Martinez","email":"amartinez@ejemplo.com","telefono":"345435345435","sector": "IT"}'
```

</details>

<details>
   <summary><code>PATCH</code> <code><b>/v1/contactos/{_id}</b></code><code>Actualizar parcialmente un registro por ID (email, sector)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `_id` |  `required` | `String`                    | `ID del contacto`                |

##### Responses
> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `contacto actualizado exitosamente`                                |
> | `400`         | `text/plain;charset=UTF-8`        | `formato id invalido`                                               |
> | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                             |
> | `403`         | `text/plain;charset=UTF-8`        | `Operación no válida. Solo se permite actualizar los campos telefono o sector`|
> | `500`         | `text/plain;charset=utf-8`         | `Error al actualizar el contacto`                                   |

##### Example cURL

```bash
curl -X PUT -H "Content-Type: application/json" http://localhost:3000/v1/contactos/65503187742acfc9d7396ca1 -d '{"sector": "IT"}'
```

</details>

------------------------------------------------------------------------------------------
#### Eliminar registro

<details>
  <summary><code>DELETE </code> <code><b>/v1/contactos/{_id}</b></code><code>Eliminar registro por ID</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `_id` |  `required` | `String`                    | `ID del contacto`                     |

##### Responses
> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `contacto borrado exitosamente`                                |
> | `400`         | `text/plain;charset=UTF-8`        | `formato id invalido`                                               |
> | `404`         | `text/plain;charset=UTF-8`        | `Contacto no encontrado`                                             |
> | `500`         | `text/plain;charset=utf-8`         | `Error al borrar el contacto`                                   |

##### Example cURL

> ```javascript
>  curl -X DELETE http://localhost:3000/v1/contactos/65503187742acfc9d7396ca1
> ```
</details>

------------------------------------------------------------------------------------------

