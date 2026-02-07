# 🚀 Guía de Deployment - AWS CLI Playground

Esta guía te ayudará a deployar AWS CLI Playground en Cloudflare Pages (100% GRATIS).

---

## 📋 Requisitos Previos

- ✅ Node.js 18+ instalado
- ✅ Cuenta de GitHub (gratis)
- ✅ Cuenta de Cloudflare (gratis)

---

## 🎯 Opción 1: GitHub + Cloudflare Pages (Recomendado)

### Paso 1: Preparar Repositorio

```bash
# 1. Inicializar Git (si no lo hiciste)
git init

# 2. Crear repositorio en GitHub
# Ve a: https://github.com/new
# Nombre: aws-cli-playground

# 3. Conectar con GitHub
git remote add origin https://github.com/TU-USUARIO/aws-cli-playground.git
git branch -M main
git add .
git commit -m "Initial commit: AWS CLI Playground"
git push -u origin main
```

### Paso 2: Conectar Cloudflare Pages

1. **Ir a Cloudflare Pages**
   - Visita: https://dash.cloudflare.com/
   - Crea cuenta si no tienes (gratis)
   - Ve a `Workers & Pages` → `Pages`

2. **Conectar Repositorio**
   - Click en `Create application`
   - Click en `Connect to Git`
   - Autoriza GitHub
   - Selecciona tu repositorio `aws-cli-playground`

3. **Configurar Build Settings**
   ```
   Project name:          aws-cli-playground
   Production branch:     main
   Framework preset:      Vite
   Build command:         npm run build
   Build output directory: dist
   Environment variables: (ninguna necesaria)
   ```

4. **Deploy**
   - Click `Save and Deploy`
   - Espera 2-3 minutos
   - ¡Tu app estará en: `https://aws-cli-playground.pages.dev`!

### Paso 3: Dominio Personalizado (Opcional)

1. En Cloudflare Pages dashboard
2. Click en tu proyecto
3. `Custom domains` → `Set up a custom domain`
4. Ingresa tu dominio (ej: `awscli.tudominio.com`)
5. Cloudflare configurará DNS automáticamente
6. ¡Listo en 2 minutos!

---

## 🎯 Opción 2: Wrangler CLI (Deploy Directo)

### Paso 1: Instalar Wrangler

```bash
npm install -g wrangler
```

### Paso 2: Autenticar con Cloudflare

```bash
wrangler login
```

Esto abrirá tu navegador para autorizar Wrangler.

### Paso 3: Build y Deploy

```bash
# Build para producción
npm run build

# Deploy a Cloudflare Pages
wrangler pages publish dist --project-name=aws-cli-playground
```

¡Tu app estará disponible en: `https://aws-cli-playground.pages.dev`!

### Deployments Subsecuentes

```bash
npm run build && wrangler pages publish dist --project-name=aws-cli-playground
```

---

## 🎯 Opción 3: Otras Plataformas

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Crear archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. En GitHub: Settings → Pages → Source: `gh-pages` branch

---

## 🔧 Troubleshooting

### Error: "Module not found"

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "Build failed"

```bash
# Verificar Node version
node --version  # Debe ser 18+

# Verificar que todas las deps estén instaladas
npm install

# Intentar build localmente
npm run build
```

### Error: "Permission denied" en Cloudflare

- Verifica que autorizaste GitHub correctamente
- Revisa que el repositorio sea público (o plan Pro de Cloudflare)
- Reconecta GitHub en Cloudflare Pages settings

---

## 📊 Métricas de Rendimiento

Una vez deployado, verifica:

### Lighthouse Score Target

- 🎯 Performance: 95+
- 🎯 Accessibility: 95+
- 🎯 Best Practices: 95+
- 🎯 SEO: 90+

### Prueba tu deployment

```bash
# Lighthouse CI (opcional)
npm install -g @lhci/cli
lhci autorun --collect.url=https://tu-dominio.pages.dev
```

---

## 🌍 URLs de Deployment

### Producción
- **Cloudflare Pages:** `https://aws-cli-playground.pages.dev`
- **Dominio custom:** `https://awscli.tudominio.com`

### Preview (por branch)
Cada branch en GitHub genera un preview URL automático:
- `https://BRANCH-NAME.aws-cli-playground.pages.dev`

---

## 🔄 CI/CD Automático

Con GitHub + Cloudflare Pages:

1. **Cada push a `main`** → Deploy automático a producción
2. **Cada PR** → Preview deployment automático
3. **Rollback** → Un click en Cloudflare dashboard

---

## 📈 Monitoreo

### Analytics en Cloudflare

1. Ve a tu proyecto en Cloudflare Pages
2. Tab `Analytics`
3. Verás:
   - Visitas
   - Bandwidth
   - Requests
   - Performance metrics

---

## 🎨 Custom Branding

### Favicon personalizado

Reemplaza `public/aws-icon.svg` con tu logo.

### Metadata SEO

Edita `index.html`:

```html
<meta property="og:title" content="AWS CLI Playground" />
<meta property="og:description" content="Tu descripción" />
<meta property="og:image" content="URL de tu imagen" />
```

---

## 💰 Costos

### Cloudflare Pages (Plan Gratuito)

- ✅ Builds ilimitados
- ✅ Bandwidth ilimitado
- ✅ 500 builds/mes
- ✅ Certificado SSL gratis
- ✅ CDN global
- ✅ Preview deployments

**Costo:** $0/mes 🎉

---

## 🔐 Seguridad

### Headers de Seguridad

Cloudflare Pages añade automáticamente:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### HTTPS

- Certificado SSL automático (Let's Encrypt)
- HTTP → HTTPS redirect automático
- TLS 1.3 soportado

---

## 🚀 Optimizaciones Post-Deploy

### 1. Comprimir Assets

Ya incluido en Vite build automáticamente.

### 2. Cache Headers

Cloudflare Pages configura cache óptimo automáticamente.

### 3. CDN

Tu app se sirve desde 300+ ubicaciones globalmente.

---

## 📧 Soporte

¿Problemas con el deployment?

- 📖 Documentación Cloudflare: https://developers.cloudflare.com/pages/
- 💬 Discord Cloudflare: https://discord.gg/cloudflaredev
- 🐛 Issues GitHub: Abre un issue en el repo

---

## ✅ Checklist de Deployment

- [ ] Código pusheado a GitHub
- [ ] Repositorio conectado a Cloudflare Pages
- [ ] Build settings configurados
- [ ] Deploy exitoso
- [ ] App funciona en URL production
- [ ] Dominio custom configurado (opcional)
- [ ] Analytics activado
- [ ] Lighthouse score > 90

---

**¡Felicidades! Tu AWS CLI Playground está en producción! 🎉**
