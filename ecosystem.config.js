module.exports = {
    apps: [
        {
            name: 'priolab-prod-front',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3010',
            autorestart: true,
            watch: false
        },
    ],
};