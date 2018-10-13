# !/bin/bash

alias findAllExceptHidden="find src/ -type f -name \"*.ts\"";

findAllExceptHidden | xargs npx prettier --config ./configs/prettierrc.json --write
