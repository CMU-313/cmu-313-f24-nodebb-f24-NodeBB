#!/bin/bash

# Stop NodeBB if it's running
./nodebb stop

# Remove the existing configuration file
rm -f config.json

# Flush all data from Redis
redis-cli flushall

# Run NodeBB setup with predefined options
./nodebb setup '{ "url": "http://localhost:4568","secret": "27b3b80b-5bcb-4bcb-bd81-da24bbfd7bzz","database": "redis", "redis": {"host": "127.0.0.1", "port": "6379", "password": "", "database": "0"},"port": "4567", "admin:username": "shantinghou", "admin:password": "shanting", "admin:password:confirm": "shanting", "admin:email": "asdf@asdf.com" }'

# Start NodeBB
./nodebb start