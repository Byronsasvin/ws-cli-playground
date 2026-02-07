# ⚡ Instalación Rápida - AWS CLI Playground

**Tiempo estimado: 10 minutos**

---

## 🚀 Inicio Rápido (3 pasos)

### 1️⃣ Instalar Dependencias

```bash
npm install
```

### 2️⃣ Iniciar Desarrollo

```bash
npm run dev
```

### 3️⃣ Abrir en Navegador

```
http://localhost:3000
```

**¡Listo! Ya puedes empezar a practicar AWS CLI** 🎉

---

## 📦 Requisitos

- **Node.js:** 18 o superior
- **npm:** 9 o superior

Verificar versiones:
```bash
node --version  # Debe mostrar v18.x.x o superior
npm --version   # Debe mostrar 9.x.x o superior
```

---

## 🔧 Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build para producción → carpeta dist/
npm run preview  # Vista previa del build
npm run lint     # Revisar código con ESLint
```

---

## 📁 Estructura del Proyecto

```
aws-cli-playground/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Terminal.jsx     # Terminal interactiva
│   │   ├── ChallengesPanel.jsx
│   │   ├── ProgressTracker.jsx
│   │   └── WelcomeModal.jsx
│   ├── data/
│   │   ├── commands.js      # 50+ comandos AWS CLI
│   │   └── challenges.js    # 20 challenges
│   ├── utils/
│   │   └── commandParser.js # Parser de comandos
│   ├── store/
│   │   └── useStore.js      # Estado global (Zustand)
│   ├── App.jsx              # Componente principal
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── README.md
```

---

## 🎯 Primeros Pasos

### Comandos para probar:

```bash
# Ver ayuda
help

# Crear bucket S3
aws s3 mb s3://mi-primer-bucket

# Listar buckets
aws s3 ls

# Crear instancia EC2
aws ec2 run-instances --image-id ami-123456 --instance-type t2.micro

# Ver instancias
aws ec2 describe-instances

# Crear usuario IAM
aws iam create-user --user-name developer
```

---

## 🐛 Troubleshooting

### Error: "Module not found: xterm"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"

```bash
# Cambia el puerto en vite.config.js
server: {
  port: 3001  # Cambiar a otro puerto
}
```

### Build falla

```bash
# Limpiar cache y rebuild
rm -rf dist node_modules
npm install
npm run build
```

---

## 📚 Documentación Completa

- **README.md** - Documentación general del proyecto
- **DEPLOYMENT.md** - Guía de deployment en Cloudflare Pages

---

## 🎓 Tutorial Rápido

1. **Abre la app** en localhost:3000
2. **Lee el Welcome Modal** con instrucciones
3. **Escribe tu primer comando:** `aws s3 mb s3://test-bucket`
4. **Completa el Challenge #1** para ganar puntos
5. **Explora el panel de Challenges** (lado derecho)
6. **Sube de nivel** completando más challenges

---

## 💡 Tips

- ✅ Usa `↑` y `↓` para navegar el historial
- ✅ Escribe `help` para ver todos los comandos
- ✅ El progreso se guarda automáticamente
- ✅ Puedes resetear todo en Settings ⚙️

---

## 🚀 Deploy (Opcional)

### Cloudflare Pages (Gratis)

```bash
# 1. Build
npm run build

# 2. Install Wrangler
npm install -g wrangler

# 3. Login
wrangler login

# 4. Deploy
wrangler pages publish dist --project-name=aws-cli-playground
```

Ver **DEPLOYMENT.md** para guía completa.

---

## 📧 ¿Necesitas Ayuda?

- 🐛 **Bugs:** Abre un issue en GitHub
- 💬 **Preguntas:** byronsasvin@gmail.com
- 📖 **Docs:** Lee README.md completo

---

## ✅ Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] App abierta en navegador
- [ ] Primer comando ejecutado exitosamente

---

**¡Bienvenido a AWS CLI Playground! 🎉**

Empieza con:
```bash
aws s3 mb s3://mi-primer-bucket
```
