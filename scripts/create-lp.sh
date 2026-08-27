#!/bin/bash
# Script simples para criar novas LPs
# Uso: ./scripts/create-lp.sh "NomeDaUnidade"

if [ -z "$1" ]; then
  echo "Uso: $0 \"NomeDaUnidade\""
  echo "Exemplo: $0 \"Sao-Bernardo-Plaza\""
  exit 1
fi

LP_NAME=$1
LP_FOLDER=$(echo "$LP_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo "Criando nova LP: $LP_FOLDER"

# 1. Copiar base
cp -r lp_turquesa "lp_${LP_FOLDER}"

# 2. Criar symlinks para assets compartilhados
cd "lp_${LP_FOLDER}"
rm -rf css js fonts videos
ln -s ../lp_turquesa/css css
ln -s ../lp_turquesa/js js
ln -s ../lp_turquesa/fonts fonts
ln -s ../lp_turquesa/videos videos

cd ..

echo "✅ LP criada em: lp_${LP_FOLDER}/"
echo ""
echo "Próximos passos:"
echo "1. Editar lp_${LP_FOLDER}/index.html (hero, stats, tags)"
echo "2. Substituir imagens em lp_${LP_FOLDER}/img/"
echo "3. Testar: open lp_${LP_FOLDER}/index.html"
