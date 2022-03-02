module.exports = {
  apps: [
    {
      name: 'travelr',
      script: 'dist/src/index.js',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      exec_mode: 'cluster',
      instances: 2,
      kill_timeout: 5000,
      autorestart: true,
      max_restarts: 10,
      watch: false,
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        port: 8080,
      },
      merge_logs: true,
      log_date_format: 'YYYY-MM-DDTHH:mm:ss.sssZ',
    },
  ],
  // https://pm2.keymetrics.io/docs/usage/deployment/
  deploy: {
    production: {
      key: process.env.EC2_PEM_PATH,
      host: process.env.EC2_HOST,
      user: 'ubuntu',
      ref: 'origin/main',
      repo: 'git@github.com:Diversion2k22/TravelR',
      path: '/home/ubuntu',
      'post-deploy':
        'yarn && yarn clean && yarn build && pm2 startOrRestart ecosystem.config.js --env production && pm2 set pm2:autodump true && pm2 save',
    },
  },
};