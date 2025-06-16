#!/bin/bash
# filepath: build.sh

for arg in "$@"
do
  folder="ex$arg"
  mkdir -p "$folder"
done