# 🚀 AWS CLI Playground

**Simulador interactivo para aprender AWS CLI sin necesidad de una cuenta AWS real.**

![AWS CLI Playground](https://img.shields.io/badge/AWS-CLI-orange?style=for-the-badge&logo=amazon-aws)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Descripción

AWS CLI Playground es una aplicación web educativa que te permite practicar comandos de AWS CLI en un entorno simulado, completamente seguro y sin necesidad de tener una cuenta de AWS.

### ✨ Características

- ✅ **50+ comandos AWS CLI simulados** (S3, EC2, IAM, Lambda, CloudWatch)
- ✅ **20 challenges progresivos** (Beginner → Intermediate → Advanced)
- ✅ **Terminal interactiva real** con xterm.js
- ✅ **Sistema de puntos y niveles**
- ✅ **Historial de comandos** (↑/↓)
- ✅ **Autocompletado** inteligente
- ✅ **Manejo de errores educativo** con sugerencias
- ✅ **Dark mode** incluido
- ✅ **Progreso persistente** (localStorage)
- ✅ **100% offline** después de cargar

---

## 🎯 ¿Para quién es esto?

- 🎓 **Estudiantes** aprendiendo AWS
- 👨‍💻 **Developers** preparándose para certificaciones AWS
- 🏢 **Empresas** entrenando equipos sin costos de AWS
- 🌍 **Comunidades** AWS User Groups educando miembros

---

## 🚀 Quick Start

### Instalación Local

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/aws-cli-playground.git
cd aws-cli-playground

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

### Deploy en Cloudflare Pages

```bash
# 1. Build para producción
npm run build

# 2. Deploy con Wrangler (opción 1)
npm install -g wrangler
wrangler pages publish dist --project-name=aws-cli-playground

# 3. O conectar GitHub a Cloudflare Pages (opción 2)
# - Ve a dash.cloudflare.com/pages
# - Connect GitHub repository
# - Build command: npm run build
# - Build output: dist
```

---

## 📚 Comandos Disponibles

### S3 - Simple Storage Service
```bash
aws s3 mb s3://nombre-bucket              # Crear bucket
aws s3 ls                                  # Listar buckets
aws s3 ls s3://nombre-bucket              # Listar contenido
aws s3 cp archivo.txt s3://bucket/        # Subir archivo
aws s3 rm s3://bucket/archivo.txt         # Eliminar archivo
aws s3 rb s3://nombre-bucket --force      # Eliminar bucket
aws s3 sync ./carpeta s3://bucket/        # Sincronizar
```

### EC2 - Elastic Compute Cloud
```bash
aws ec2 describe-instances                           # Listar instancias
aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro  # Crear
aws ec2 stop-instances --instance-ids i-xxx          # Detener
aws ec2 start-instances --instance-ids i-xxx         # Iniciar
aws ec2 terminate-instances --instance-ids i-xxx     # Terminar
aws ec2 describe-security-groups                     # Ver security groups
```

### IAM - Identity & Access Management
```bash
aws iam list-users                                    # Listar usuarios
aws iam create-user --user-name juan                  # Crear usuario
aws iam delete-user --user-name juan                  # Eliminar usuario
aws iam attach-user-policy --user-name juan --policy-arn arn:...  # Adjuntar política
aws iam create-access-key --user-name juan            # Crear access keys
aws iam list-policies                                 # Listar políticas
```

### Lambda - Serverless Functions
```bash
aws lambda list-functions                             # Listar funciones
aws lambda create-function --function-name mi-func --runtime python3.9  # Crear
aws lambda invoke --function-name mi-func output.txt # Invocar
aws lambda delete-function --function-name mi-func    # Eliminar
```

### CloudWatch - Monitoring
```bash
aws cloudwatch list-metrics                          # Listar métricas
aws cloudwatch describe-alarms                       # Listar alarmas
aws cloudwatch put-metric-alarm --alarm-name HighCPU --threshold 80  # Crear alarma
```

---

## 🎮 Challenges

| # | Challenge | Dificultad | Puntos |
|---|-----------|------------|--------|
| 1 | Mi Primer Bucket S3 | Beginner | 100 |
| 2 | Listar Mis Buckets | Beginner | 50 |
| 3 | Subir un Archivo | Beginner | 150 |
| 4 | Primera Instancia EC2 | Beginner | 200 |
| 5 | Ver Mis Instancias | Beginner | 100 |
| 6 | Crear Usuario IAM | Beginner | 150 |
| 7 | Listar Usuarios | Beginner | 100 |
| 8 | Detener Instancia | Intermediate | 200 |
| 9 | Políticas IAM | Intermediate | 250 |
| 10 | Eliminar Bucket | Intermediate | 150 |
| 11 | Access Keys | Intermediate | 200 |
| 12 | Primera Función Lambda | Intermediate | 300 |
| 13 | Invocar Lambda | Intermediate | 200 |
| 14 | CloudWatch Alarm | Intermediate | 250 |
| 15 | Sincronización S3 | Advanced | 300 |
| 16 | Múltiples Instancias | Advanced | 350 |
| 17 | Bucket con Región | Advanced | 300 |
| 18 | Terminar Instancias | Advanced | 400 |
| 19 | Eliminar Usuario IAM | Advanced | 250 |
| 20 | Maestro de AWS CLI | Advanced | 1000 |

**Total:** 5,350 puntos disponibles

---

## 🏗️ Arquitectura

```
aws-cli-playground/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Terminal.jsx     # Terminal interactiva (xterm.js)
│   │   ├── ChallengesPanel.jsx  # Panel de retos
│   │   ├── ProgressTracker.jsx  # Barra de progreso
│   │   └── WelcomeModal.jsx     # Modal de bienvenida
│   ├── data/
│   │   ├── commands.js      # Base de datos de comandos AWS
│   │   └── challenges.js    # Definición de challenges
│   ├── utils/
│   │   └── commandParser.js # Parser y validador de comandos
│   ├── store/
│   │   └── useStore.js      # Estado global (Zustand)
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Stack Tecnológico

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **State Management:** Zustand
- **Terminal:** xterm.js + @xterm/addon-fit
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Storage:** localStorage (persistencia)

---

## 🔧 Desarrollo

### Comandos npm disponibles

```bash
npm run dev      # Servidor desarrollo (localhost:3000)
npm run build    # Build producción → dist/
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

### Añadir nuevos comandos AWS

1. Edita `src/data/commands.js`
2. Añade el servicio o subcomando:

```javascript
'nuevo-servicio': {
  description: 'Descripción del servicio',
  subcommands: {
    'nuevo-comando': {
      description: 'Qué hace el comando',
      syntax: 'aws nuevo-servicio nuevo-comando [opciones]',
      examples: ['aws nuevo-servicio nuevo-comando --param value'],
      validate: (args) => ({ valid: true }),
      execute: (args, state) => ({
        success: true,
        output: 'Resultado del comando',
        tips: ['Tip útil']
      })
    }
  }
}
```

### Añadir nuevos challenges

1. Edita `src/data/challenges.js`
2. Añade el challenge:

```javascript
{
  id: 21,
  title: "Nombre del Challenge",
  difficulty: "beginner|intermediate|advanced",
  category: "s3|ec2|iam|lambda|cloudwatch",
  description: "Descripción larga",
  objective: "Objetivo específico",
  hints: ["Pista 1", "Pista 2"],
  solution: "aws comando completo",
  validation: (command, state) => {
    // Lógica de validación
    return true/false;
  },
  reward: 100,
  timeLimit: null, // segundos (opcional)
  nextChallenge: 22
}
```

---

## 📊 Features Avanzados

### Sistema de Progreso

- **Niveles:** 1 nivel cada 1,000 puntos
- **Streak:** Días consecutivos practicando
- **Achievements:** Badges especiales (futuro)

### Persistencia de Datos

El progreso se guarda automáticamente en `localStorage`:
- Puntos y nivel
- Challenges completados
- Historial de comandos (últimos 50)
- Preferencias UI

### Manejo de Errores

Todos los comandos tienen:
- Validación de sintaxis
- Sugerencias de corrección (Levenshtein distance)
- Tips educativos
- Ejemplos de uso

---

## 🎨 Personalización

### Cambiar colores del tema

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'aws-orange': '#FF9900',  // Color principal
      'aws-blue': '#232F3E',    // Color secundario
    }
  }
}
```

### Modificar fuente de terminal

Edita `src/components/Terminal.jsx`:

```javascript
fontFamily: 'Tu-Fuente, monospace'
```

---

## 🚀 Deployment

### Cloudflare Pages (Recomendado - GRATIS)

**Opción 1: GitHub Integration**
1. Push a GitHub
2. Conecta repo en dash.cloudflare.com/pages
3. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output: `dist`
4. Deploy automático en cada push

**Opción 2: Wrangler CLI**
```bash
npm run build
npx wrangler pages publish dist --project-name=aws-cli-playground
```

**Custom Domain:**
```bash
# En Cloudflare Pages dashboard:
# Custom domains → Add domain → awscli.tudominio.com
```

### Otras opciones

- **Vercel:** `vercel --prod`
- **Netlify:** `netlify deploy --prod`
- **GitHub Pages:** Configurar GitHub Actions

---

## 📝 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Byron Lainez**
- Email: byronsasvin@gmail.com
- LinkedIn: [Byron Lainez](https://linkedin.com/in/byron-lainez)
- GitHub: [@byronlainez](https://github.com/byronlainez)

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres añadir:
- Nuevos comandos AWS
- Nuevos challenges
- Mejoras al UI
- Corrección de bugs

**Proceso:**
1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🙏 Agradecimientos

- AWS por crear la mejor plataforma cloud
- Comunidad AWS User Groups
- Todos los que contribuyen al proyecto

---

## ⚠️ Disclaimer

Este es un **simulador educativo**. Los comandos ejecutados aquí:
- ❌ NO afectan servicios AWS reales
- ❌ NO generan costos
- ❌ NO requieren credenciales AWS
- ✅ Solo sirven para aprender

Para usar AWS CLI real, visita: https://aws.amazon.com/cli/

---

## 📧 Soporte

¿Problemas o preguntas?
- 🐛 Reporta bugs en [Issues](https://github.com/tu-usuario/aws-cli-playground/issues)
- 💬 Únete a nuestra [comunidad Discord](#)
- 📧 Email: byronsasvin@gmail.com

---

**⭐ Si te gusta el proyecto, dale una estrella en GitHub!**

Made with ❤️ for the AWS Community
