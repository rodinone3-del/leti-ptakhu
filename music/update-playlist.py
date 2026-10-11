#!/usr/bin/env python3
"""Заповнює playlist.json назвами аудіофайлів з цієї папки."""
import json, os
here = os.path.dirname(os.path.abspath(__file__))
exts = ('.mp3', '.ogg', '.oga', '.m4a', '.aac', '.wav', '.flac', '.opus', '.webm')
tracks = sorted(f for f in os.listdir(here) if f.lower().endswith(exts))
with open(os.path.join(here, 'playlist.json'), 'w', encoding='utf-8') as fh:
    json.dump({'tracks': tracks}, fh, ensure_ascii=False, indent=2)
print('Треків у списку:', len(tracks))
