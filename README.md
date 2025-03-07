# graphql

A learning phrase for graphql

# Single Node Modules for both

## root package.json

{
"name": "app_name",
"private": true,
"workspaces": [
"server",
"client"
]
}

1. npm install some-package -w=server
2. npm install some-package -w=client
