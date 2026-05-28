Cambios en la web de Help Estudio (help-estudio.es), sección "01 THE LAB / 
OWN PRODUCTS". Tres cambios concretos.

CONTEXTO: La sección Lab muestra 4 productos en un carrusel/scroll horizontal 
que se repite (Donemeter, Smashzone, Motorland.io, Next3hours). 

CAMBIO 1 — REESCRIBIR LA DESCRIPCIÓN DE NEXT3HOURS (lo más importante)

La descripción actual de Next3hours describe una versión ANTIGUA y 
DESCARTADA del producto. Dice algo como:
"A 3D city exploration engine that answers one question: what can you do 
right now, near you, in the next three hours? Renders a live aerial map 
of your city with geo-pinned events, venues and openings — no infinite 
scroll, no algorithm, just place and time."

Eso ya NO es lo que es Next3Hours. El producto actual es un concierge con 
IA marca blanca para hoteles. Sustituir por esta descripción nueva (mismo 
tono técnico-editorial que el resto de la web, en inglés para mantener 
coherencia):

Título: Next3Hours
Categoría/tag: cambiar de "Urban / Real-time Discovery" a 
"Hospitality / AI Concierge"
Stack: mantener Next.js, TypeScript, Mapbox, Vercel (y si cabe, añadir 
"Gemini" o "AI" como tag de stack)
Descripción nueva:
"White-label AI concierge for boutique hotels. Guests answer three 
questions; six chained AI agents craft a bespoke afternoon in the city 
— real venues, timed routes, gamified missions, redeemable rewards — 
all written in the hotel's own editorial voice. Live in Madrid."

Status/badge: mantener "LIVE"
Si hay algún campo extra tipo "RENDER MODE · 3D CITY · LIVE PINS", 
cambiarlo por algo coherente con el producto nuevo, por ejemplo: 
"DELIVERY · WHITE-LABEL · 6 AI AGENTS"

CAMBIO 2 — MOVER NEXT3HOURS AL PRIMER LUGAR

Actualmente el orden de productos es: Donemeter, Smashzone, Motorland.io, 
Next3hours. Cambiar para que Next3Hours sea el PRIMERO de la lista (y por 
tanto el primero que se ve en el carrusel/scroll).

Nuevo orden: Next3Hours, Smashzone, Motorland.io (Donemeter se elimina, 
ver cambio 3).

Imagen Principal: public/assets/next3hours/next3hours-ok.png

IMPORTANTE: el carrusel parece repetir los productos en bucle (aparecen 
3 veces en el HTML). Asegúrate de cambiar el orden en TODAS las 
repeticiones, o mejor, identifica el array/data source único que alimenta 
el carrusel y cámbialo ahí una sola vez.

CAMBIO 3 — ELIMINAR DONEMETER

Quitar Donemeter de la sección Lab por completo. 

Buscar también si Donemeter aparece en el footer (sección PRODUCTS) y 
eliminarlo de ahí también para mantener coherencia.

Tras quitarlo, la sección Lab muestra 3 productos: Next3Hours, Smashzone, 
Motorland.io. Actualizar cualquier contador que diga "04 PRODUCTS · 04 LIVE" 
a "03 PRODUCTS · 03 LIVE".

VERIFICACIÓN:
- pnpm build limpio.
- La sección Lab muestra Next3Hours primero, con la descripción nueva 
  de concierge IA para hoteles (no la de motor 3D).
- Donemeter no aparece ni en Lab ni en footer.
- El contador de productos refleja 3, no 4.
- El carrusel sigue funcionando (si hay animación de loop, que no se rompa 
  al cambiar el número de elementos).

Si encuentras que el número de productos hardcodeado en algún sitio (3 
repeticiones para el loop infinito) se rompe al pasar de 4 a 3 elementos, 
ajústalo para que el loop siga siendo fluido.

NO toques las otras secciones (Craft, Pedigree, Process, Contact).
NO cambies el diseño ni los estilos, solo el contenido y orden.

Commit: "feat(lab): Next3Hours primero con copy actualizado, quitar Donemeter"

Cuando termines, dime:
- Si el carrusel usa un array de datos único o productos hardcodeados 
  repetidos (para saber si el loop quedó bien).
- Si Donemeter estaba en más sitios de los esperados.