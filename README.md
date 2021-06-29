# STRAVA-APP

Aplicación para la simulación de inserción y visualización de actividades y comunidades de Strava, que consta de una API desarrollada con Spring Boot (strava-api) y un sitio web desarrollado con React (strava-app).

El módulo de actividades utiliza una base de datos **Apache Cassandra**, y el módulo comunidad utiliza una base de datos **Neo4j**.

## Configuración de bases de datos

### Apache Cassandra

El sistema está configurado para conectarse a Cassandra utilizando: 

- host: **'localhost'** 
- puerto: **9042**
- keyspace: **'strava'**

Sentencias de creación de keyspace y tabla de actividades:

```CQL

CREATE KEYSPACE strava WITH REPLICATION = {
'class': 'SimpleStrategy',
'replication_factor': 1
};

CREATE TABLE activity(
    id timeuuid,
    usuario text,
    fecha timestamp,
    tipo text,
    titulo text,
    datos text,
    PRIMARY KEY(usuario,id)
) WITH CLUSTERING ORDER BY (id DESC);

```

### Neo4J

El sistema está configurado para conectarse a Neo4J utilizando: 

- host: **'localhost'** 
- puerto: **7687**
- usuario: **'neo4j'**
- contraseña: **'bdnr'**



## Instrucciones de ejecución

### API

Posicionado en el directorio strava-api, ejecutar:

```shell
./mvnw clean install package
java -jar target/strava-api-0.0.1-SNAPSHOT.jar
```

### Web

Posicionado en el directorio strava-app, ejecutar:

```shell
npm install
npm run start
```

Ingresar a http://localhost:3000
