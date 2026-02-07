#!/bin/bash

# AWS CLI Playground - Auto Setup Script
# Este script automatiza la instalación y configuración inicial

echo "🚀 AWS CLI Playground - Auto Setup"
echo "===================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "${BLUE}📦 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "Por favor instala Node.js 18+ desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js $NODE_VERSION detectado. Necesitas versión 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detectado${NC}"

# Verificar npm
echo -e "${BLUE}📦 Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm --version) detectado${NC}"
echo ""

# Instalar dependencias
echo -e "${BLUE}📥 Instalando dependencias...${NC}"
echo "Esto puede tomar 1-2 minutos..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencias instaladas exitosamente${NC}"
else
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

echo ""

# Verificar instalación
echo -e "${BLUE}🔍 Verificando instalación...${NC}"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules creado${NC}"
fi

if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ package-lock.json creado${NC}"
fi

echo ""
echo -e "${GREEN}🎉 ¡Instalación completada exitosamente!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}📝 Próximos pasos:${NC}"
echo ""
echo -e "1. Iniciar servidor de desarrollo:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo -e "2. Abrir en navegador:"
echo -e "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo -e "3. Empezar a practicar:"
echo -e "   ${BLUE}aws s3 mb s3://mi-primer-bucket${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}📚 Documentación:${NC}"
echo "  • INSTALL.md   - Guía de instalación"
echo "  • README.md    - Documentación completa"
echo "  • DEPLOYMENT.md - Guía de deployment"
echo ""
echo -e "${GREEN}¡Bienvenido a AWS CLI Playground! 🚀${NC}"
echo ""
