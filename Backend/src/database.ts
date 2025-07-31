import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve(__dirname, '../data.db'));

// Usuario
db.prepare(`
  CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
    partidas_jugadas INTEGER DEFAULT 0,
    victorias INTEGER DEFAULT 0
  )
`).run();

// Amistad
db.prepare(`
  CREATE TABLE IF NOT EXISTS Amistad (
    id_amistad INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario_1 INTEGER NOT NULL,
    id_usuario_2 INTEGER NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_usuario_1) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_usuario_2) REFERENCES Usuario(id_usuario)
  )
`).run();

// Partida
db.prepare(`
  CREATE TABLE IF NOT EXISTS Partida (
    id_partida INTEGER PRIMARY KEY AUTOINCREMENT,
    estado TEXT NOT NULL,
    id_usuario INTEGER NOT NULL, -- anfitrión
    numero_filas INTEGER NOT NULL,
    numero_columnas INTEGER NOT NULL,
    fecha_creacion TEXT NOT NULL,
    ronda INTEGER DEFAULT 1,
    turno_actual INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (turno_actual) REFERENCES Jugador(id_jugador)
  )
`).run();

// Jugador
db.prepare(`
  CREATE TABLE IF NOT EXISTS Jugador (
    id_jugador INTEGER PRIMARY KEY AUTOINCREMENT,
    id_partida INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    estado TEXT NOT NULL,
    rondas_sobrevividas INTEGER DEFAULT 0,
    FOREIGN KEY (id_partida) REFERENCES Partida(id_partida),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
  )
`).run();

// Casilla
db.prepare(`
  CREATE TABLE IF NOT EXISTS Casilla (
    id_casilla INTEGER PRIMARY KEY AUTOINCREMENT,
    id_partida INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    seleccionado INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (id_partida) REFERENCES Partida(id_partida)
  )
`).run();

// Bomba
db.prepare(`
  CREATE TABLE IF NOT EXISTS Bomba (
    id_bomba INTEGER PRIMARY KEY AUTOINCREMENT,
    id_jugador INTEGER NOT NULL,
    id_partida INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES Jugador(id_jugador),
    FOREIGN KEY (id_partida) REFERENCES Partida(id_partida)
  )
`).run();

console.log('Base de datos inicializada con las tablas.');

export default db;
