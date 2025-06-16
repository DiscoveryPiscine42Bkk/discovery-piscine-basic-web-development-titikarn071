#!/bin/bash
# filepath: argv.sh

for i in 1 2 3
do
  eval arg=\${$i}
  if [ -n "$arg" ]; then
    echo "Argument $i: $arg"
  fi
done