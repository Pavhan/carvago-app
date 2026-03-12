#!/usr/bin/env bash

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed or not in PATH." >&2
  exit 1
fi

default_images_dir="public/images/cars"
images_dir="${1:-$default_images_dir}"
output_dir="${images_dir%/}/thumbs"

if [[ ! -d "$images_dir" ]]; then
  echo "Error: Directory '$images_dir' does not exist." >&2
  exit 1
fi

mkdir -p "$output_dir"

while IFS= read -r -d '' input_file; do
  filename="$(basename "$input_file")"
  output_file="$output_dir/$filename"

  if [[ -f "$output_file" ]]; then
    echo "Skipping (already exists): $output_file"
    continue
  fi

  echo "Creating: $output_file"
  ffmpeg -hide_banner -loglevel error -i "$input_file" -vf scale=20:-1 "$output_file"
done < <(find "$images_dir" -path "$output_dir" -prune -o -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' \) -print0)

echo "Done."
