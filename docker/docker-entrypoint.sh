#!/bin/bash
set -eo pipefail
shopt -s nullglob

#################### Project init

yarn install --check-files

#################### End of Project init

exec "$@"
