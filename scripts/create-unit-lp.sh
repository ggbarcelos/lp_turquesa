#!/bin/bash
# Script para criar nova LP de unidade dentro da pasta unidades/ (dentro de lp_turquesa)
# Uso: ./scripts/create-unit-lp.sh "NomeDaUnidade"

if [ -z "$1" ]; then
  echo "Uso: $0 \"NomeDaUnidade\""
  echo "Exemplo: $0 \"Sao-Bernardo-Plaza\""
  exit 1
fi

LP_NAME=$1
LP_FOLDER=$(echo "$LP_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
LP_DIR="unidades/${LP_FOLDER}"

if [ -d "$LP_DIR" ]; then
  echo "❌ Erro: $LP_DIR já existe"
  exit 1
fi

echo "Criando nova unidade LP: $LP_DIR"

# 1. Copiar do template master
cp -r . "$LP_DIR"

# 2. Remover a pasta unidades (recursivamente) e .git
cd "$LP_DIR"
rm -rf unidades .git .idea .DS_Store

# 3. Remover pastas que serão compartilhadas via symlinks
rm -rf css js fonts videos

# 4. Criar symlinks para assets compartilhados (1 nível acima)
ln -s ../css css
ln -s ../js js
ln -s ../fonts fonts
ln -s ../videos videos

cd ..

echo "✅ LP '$LP_NAME' criada em: $LP_DIR/"
echo ""
echo "Próximos passos:"
echo "1. Editar $LP_DIR/index.html (hero, stats, tags)"
echo "2. Remover dobras desnecessárias (ex: financeiros)"
echo "3. Substituir imagens em $LP_DIR/img/ (se necessário)"
echo "4. Testar: open $LP_DIR/index.html"
