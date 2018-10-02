#!/bin/bash
rsync -a --delete dist/* root@s0.dysv.de:/var/www/contested.de/www/
