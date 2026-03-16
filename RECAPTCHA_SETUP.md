# Configuración de Google reCAPTCHA v3

## ¿Qué es reCAPTCHA v3?
reCAPTCHA v3 es un sistema de verificación invisible que evalúa las interacciones del usuario para detectar actividad sospechosa sin mostrar desafíos al usuario.

## Pasos para configurar:

### 1. Registrar tu sitio en Google reCAPTCHA
1. Ve a [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Haz clic en "+" para registrar un nuevo sitio
3. Completa el formulario:
   - **Etiqueta**: Nombre de tu sitio (ej: "ARUYEN Apart Hotel")
   - **Tipo de reCAPTCHA**: Selecciona "reCAPTCHA v3"
   - **Dominios**: Agrega tu dominio (ej: `aruyenaparthotel.com`) y `localhost` para desarrollo
4. Acepta los términos y haz clic en "Enviar"

### 2. Obtener las claves
Después del registro obtendrás:
- **Site Key (Clave del sitio)**: Se usa en el frontend (visible)
- **Secret Key (Clave secreta)**: Se usa en el backend (privada)

### 3. Configurar las variables de entorno
1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y reemplaza los valores:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
   RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
   ```

### 4. Reiniciar el servidor de desarrollo
```bash
npm run dev
# o
pnpm dev
```

## ¿Cómo funciona?

1. **Frontend**: Cuando el usuario envía el formulario, se ejecuta reCAPTCHA automáticamente
2. **Backend**: El servidor verifica el token con Google y obtiene un score (0.0 - 1.0)
3. **Evaluación**: Si el score es < 0.5, se considera actividad sospechosa y se rechaza

## Ajustes opcionales

### Cambiar el umbral de score
En `app/api/contact/route.js`, línea ~35:
```javascript
if (recaptchaResult.score < 0.5) {  // Cambiar 0.5 por el valor deseado
```

**Valores recomendados:**
- `0.3`: Más estricto (menos falsos positivos, más usuarios legítimos bloqueados)
- `0.5`: Equilibrado (recomendado)
- `0.7`: Más permisivo (menos usuarios bloqueados, más bots podrían pasar)

### Personalizar acciones
En `components/contact-section.js`, puedes cambiar la acción:
```javascript
const recaptchaToken = await executeRecaptcha('contact_form')  // Cambiar 'contact_form'
```

## Troubleshooting

### Error: "Token de verificación requerido"
- Verifica que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` esté configurada
- Asegúrate de que el dominio esté registrado en reCAPTCHA

### Error: "Verificación de seguridad fallida"
- Verifica que `RECAPTCHA_SECRET_KEY` sea correcta
- Comprueba que el dominio coincida con el registrado

### El formulario no se envía
- Abre las herramientas de desarrollador del navegador
- Revisa la consola por errores de JavaScript
- Verifica que reCAPTCHA esté cargado correctamente