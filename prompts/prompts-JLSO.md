# Prompts - tests JLSO

| Author | Jorge Luis Sánchez Ocampo |
| --- | --- |
| Asistencia IA | Github Copilot |
| LLM | Claude 3.5 sonnet |
| Editor | VS Code |

## 1. Fase de contexto

En esta fase daremos el contexto necesario al asistente de IA, sobre el proyecto y lo que queremos que haga.

1. `*Eres un desarrollador de software fullstack, y tienes total dominio de los siguientes temas: pruebas unitarias usando jest y typescript, el orm prisma, postgress, docker y de la librería @prisma/client.*` 
    1. `*Contexto:*` 
        1. `*Objetivo: Tu misión será crear una **suite de tests unitarios en Jest para la funcionalidad de insertar candidatos en base de datos.***` 
        2. `*Ubicación de los test: carpeta backend/src/test/tests-iniciales.test.ts*`
    2. `*Tips:*` 
        1. `*hay 2 familias principales de tests, **recepción de los datos** del formulario, y **guardado** en la base de datos. Queremos ver tests que cubran ambos procesos con al menos un test.*`
    3. `*Instrucciones o pasos:*` 
        1. `*Primero analiza el contexto del proyecto y sugiere cuales podrían ser los dos principales test que podría implementar para las funcionalidades mencionadas en la sección “tips”.*`
        2. `*Explícame como vas a realizar cada uno de los test y por que*`
    
    `*Has las preguntas que consideres necesarias antes de empezar y espera la instrucción para continuar con el siguiente paso*`
    
2. 
    1. `¿Hay alguna configuración específica de test para la base de datos (ej: base de datos de prueba)?: No hay base de datos de prueba, pero en el siguiente punto están las instrucciones para hacer mock de la conexión a la base de datos.`
    2. `¿Debo implementar mocks para la base de datos o usar una base de datos real para los tests?: crea una conexión mock de la base de datos, para no alterar los datos reales. Usa esta documentación para crear el moc [*https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o#mock-prisma-client*](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o#mock-prisma-client)`
    3. `¿Se requiere alguna limpieza específica de la base de datos entre tests?: no`
    4. `¿Hay algún requerimiento específico de cobertura de código?: no`

## 2. Fase de ejecución

Empezaremos a ejecutar lo que el asistente nos sugirió, en base al contexto suministrado

1. `Comienza con la implementación`
2. `Cannot find module '../lib/prisma' or its corresponding type declarations.`
3. `#selection Property 'isValid' does not exist on type 'void'.`
4. `Dame los shell scripts para crear el archivo "create/update" validator`
5. “En este punto vi que el asistente había modificado los archivos principales para ajustarse a los test creados. Se implementa los prompts indicados en la sección de T**roubleshooting**”
6. Aquí ya los test estaban bien, se ejecutó en comando “npm test”, y los tests pasaron exitosamente.

## 3. Validación de implementación de los test

Se valida que los set de tests implementados cumplan con los parámetros iniciales definidos para la creación de los tests, y las funcionalidades que se querían cubrir.

1. `Explícame los test implementados, y cómo se adecúa con los parámetros iniciales definidos para la creación del set de test y las dos funcionalidades principales que se querían cubrir con los tests`

---
***Análisis creado por el asistente de ia ⤵️***

## Test Suite Implementation Analysis

## 1. Original Requirements

### 1.1 Main Test Families

- Form data validation
- Database storage operations

## 2. Test Implementation Analysis

### 2.1 Form Data Validation Tests

```tsx
describe('Candidate Validation Tests', () => {
  test('should validate correct candidate data', () => {
    // Tests happy path with valid data
    // Ensures validator accepts correct format
  });

  test('should reject invalid email format', () => {
    // Tests error path with invalid email
    // Ensures data quality at entry point
  });
});

```

**Coverage:**

- ✅ Validates input data format
- ✅ Tests both success and failure scenarios
- ✅ Focuses on critical field (email)
- ✅ Uses existing validator function

### 2.2 Database Operations Tests

```tsx
describe('Candidate Database Operations', () => {
  test('should successfully insert valid candidate', async () => {
    // Tests successful database insertion
    // Verifies response structure
    // Confirms service call with correct data
  });

  test('should handle duplicate email error', async () => {
    // Tests duplicate email constraint
    // Verifies error handling
    // Ensures database integrity
  });
});

```

**Coverage:**

- ✅ Tests database insertion
- ✅ Handles common error case (duplicates)
- ✅ Uses mocks to isolate tests
- ✅ Verifies data persistence flow

## 3. Alignment with Requirements

### 3.1 Coverage Matrix

| Requirement | Implementation | Status |
| --- | --- | --- |
| Form Validation | 2 tests | ✅ Complete |
| Database Operations | 2 tests | ✅ Complete |
| Minimum Coverage | 1 test per area | ✅ Exceeded |
| Independence | Uses mocks | ✅ Achieved |

### 3.2 Test Quality Metrics

- ✅ Clear test descriptions
- ✅ Isolated tests
- ✅ Comprehensive assertions
- ✅ Error case handling
- ✅ Mock usage for external dependencies

## 4. Execution

```bash
cd backend
npm test

```

## Troubleshooting

1. El asistente ia estaba tratando de adaptar las validaciones existente para los tests. Tocó sugerirle que no modificase los archivos base utilizados para la creación de tests. Lo que obligó al asistente a adaptar los tests al schema, las validaciones y el servicio existentes.
    1. prompt: 
    
    ```markdown
    "Evalúa de nuevo los test unitarios de #file:tests-iniciales.test.ts , ten en cuenta no modificar las validaciones que están en el archivo #file:validator.ts. Has loas cambios necesarios para que los tests se adapten a las validaciones de #file:validator.ts"
    ```
    
    b. Adicional para restaurar el archivo modificado (validators), tuvo que hacerse manualmente con git.
    
2. Implementé una validación general para evaluar la integridad de los test, y descubrir si había alguna inconsistencia y a pesar de descubrir inconsistencia, la solución implementada no solucionaba el problema. Tocó correr los test y a partir de ese punto implementar las soluciones del asistente ia.
    1. prompt: 
    
    ```markdown
    "#codebase #file:tests-iniciales.test.ts #file:schema.prisma #file:types.ts #file:validator.ts Analiza si hay alguna inconsistencia entre los tests y los archivos que utilizamos como base para crear los test, ten en cuenta que si hay que hacer alguna modificación, solo se deberá hacer sobre los archivos nuevos(tests)"
    ```