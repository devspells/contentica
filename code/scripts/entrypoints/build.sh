# !/bin/bash

rm -rf build;

mkdir build;

alias findAllTypescriptFiles="find src/ -type f -name \"*.ts\"";

findAllTypescriptFiles | xargs npx tsc --baseUrl src/ --outDir build --lib es2015 && \
  cp src/contenticarc.json build/contenticarc.json;
