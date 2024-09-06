module.exports = {
    apps: [
        {
            name: 'prod-front',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3010',
            autorestart: true,
            watch: false
        },
    ],
};
