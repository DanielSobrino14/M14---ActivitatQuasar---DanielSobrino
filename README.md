
# 📘 Manual Tècnic - Aplicació F1 amb Quasar

## 🧩 Requisits del Manual

---

## 🟦 Descripció dels components de Quasar utilitzats

### 1. `<q-page>`
- **Què és:** Component de layout de Quasar.
- **Funció:** Defineix l'espai visible d'una pàgina.
- **Motiu d'ús:** Organitza el contingut dins del layout principal.

### 2. `<q-input>`
- **Què és:** Camp de text estilitzat.
- **Funció:** Permet fer cerques reactives.
- **Motiu d'ús:** Facilita la cerca intuïtiva de pilots i escuderies.

### 3. `<q-table>`
- **Què és:** Component per mostrar dades en taula.
- **Funció:** Mostra llistats de pilots i escuderies.
- **Motiu d'ús:** Molt complet i personalitzable per mostrar dades.

### 4. `<q-tab>`, `<q-tabs>`, `<q-tab-panel>`, `<q-tab-panels>`
- **Funció:** Crear pestanyes i organitzar contingut.
- **Motiu d'ús:** Millora la navegació i separa la informació.

### 5. `<q-card>`, `<q-card-section>`
- **Funció:** Mostrar informació detallada amb estil targeta.
- **Motiu d'ús:** Presentació clara i visual per detalls de pilots/equips.

### 6. `<q-avatar>`
- **Funció:** Mostrar imatges de pilots.
- **Motiu d'ús:** Millora l'aspecte visual de les taules i targetes.

### 7. `<q-btn>`
- **Funció:** Executar accions com "Ver detalles".
- **Motiu d'ús:** Interacció intuïtiva per l'usuari.

---

## ⚙️ Llistat de `props`, `events` i `methods` utilitzats

### `q-input`
- **Props:** `v-model`, `label`, `filled`
- **Events:** (internament gestionat per `v-model`)

### `q-table`
- **Props:** `rows`, `columns`, `row-key`, `flat`, `bordered`
- **Slots:**
  - `body-cell-image`: mostra l'avatar del pilot
  - `body-cell-actions`: mostra el botó per veure detalls

### `q-tabs`, `q-tab-panels`
- **Props:** `v-model`, `animated`

### `q-btn`
- **Props:** `color`, `label`
- **Events:** `@click`

---

## 🌐 Documentació de l'API

### 🌍 URL base:
```
https://f1-api-7h7q.onrender.com/api/
```

### 🔗 Rutes utilitzades:

| Endpoint                            | Mètode | Descripció                              |
|------------------------------------|--------|------------------------------------------|
| `/drivers`                         | GET    | Llista de pilots                         |
| `/drivers/:id` (filtrat local)     | GET    | Detalls d’un pilot                       |
| `/standings/constructors`          | GET    | Posicions i dades de les escuderies      |

### 📤 Exemple de peticions:

```js
// Obtenir pilots
axios.get('https://f1-api-7h7q.onrender.com/api/drivers');

// Obtenir detalls d’un pilot (filtrat per ID)
axios.get('https://f1-api-7h7q.onrender.com/api/drivers')
  .then(res => res.data.find(p => p.driverId === 'leclerc'));

// Obtenir escuderies
axios.get('https://f1-api-7h7q.onrender.com/api/standings/constructors');
```

### 📥 Respostes típiques:

#### `GET /drivers`
```json
[
  {
    "driverId": "leclerc",
    "givenName": "Charles",
    "familyName": "Leclerc",
    "nationality": "Monegasque",
    "dateOfBirth": "1997-10-16",
    "permanentNumber": "16",
    "code": "LEC",
    "url": "https://...",
    "image": "https://..."
  },
  ...
]
```

#### `GET /standings/constructors`
```json
[
  {
    "position": "1",
    "Constructor": {
      "constructorId": "red_bull",
      "name": "Red Bull",
      "nationality": "Austrian",
      "url": "https://..."
    },
    "points": "123",
    "wins": "3"
  },
  ...
]
```

---

## 🧭 Explicació del flux de l'aplicació

### 🔄 Diagrama de navegació

```
        +-----------------+
        |     F1Page      |
        +-----------------+
         |         |
         v         v
   [Pilots Tab]   [Teams Tab]
         |             |
         v             v
Ver Detalles      Ver Detalles
         |             |
         v             v
  DriverDetail     TeamDetail
```

### 📋 Descripció del flux

1. L’usuari obre `F1Page.vue`, amb pestanyes per **pilots** i **escuderies**.
2. Cada pestanya mostra una taula amb dades i un buscador.
3. Els botons "Ver Detalles" porten a `/drivers/:id` o `/teams/:id`.
4. En aquestes vistes es carreguen els detalls des de l’API (amb filtratge si cal).
5. Tot el consum de dades es gestiona mitjançant el `composable` `useF1Api`.

---

## ✅ Resum de la implementació

- **Frameworks:** Vue 3, Quasar, Vue Router, Axios.
- **Estat:** `ref()` i `composable` per gestionar drivers i equips.
- **Dades:** Obtingudes asíncronament des de l’API.
- **Funcionalitats:**
  - Visualització llistes amb filtres.
  - Navegació entre pestanyes.
  - Vistes de detall per pilots i escuderies.
  - Navegació amb `router.push()` a partir d’ID.
