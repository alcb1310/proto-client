#!/usr/bin/env bash

ROOT_DIR=$(git rev-parse --show-toplevel)
PROTOC_GEN_PATH="${ROOT_DIR}/node_modules/.bin/protoc-gen-ts"

SRC_DIR="${ROOT_DIR}/schemas"
OUT_DIR="${ROOT_DIR}/src/generated"

rm -rf "${OUT_DIR}"
mkdir -p "${OUT_DIR}"

protoc \
    --plugin="${PROTOC_GEN_PATH}" \
    --ts_opt=esModuleInterop=true \
    --ts_out="${OUT_DIR}" \
    --proto_path="${SRC_DIR}" \
    $(find "${SRC_DIR}" -iname "*.proto")
