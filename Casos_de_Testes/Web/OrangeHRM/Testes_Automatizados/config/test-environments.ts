export const environments = {
  production: {
    url: 'https://opensource-demo.orangehrmlive.com',
    username: 'Admin',
    password: 'admin123'
  },
  staging: {
    url: 'https://staging.orangehrmlive.com',
    username: process.env.STAGING_USERNAME || '',
    password: process.env.STAGING_PASSWORD || ''
  },
  development: {
    url: 'http://localhost:8080',
    username: 'dev_admin',
    password: 'dev_password'
  }
};

export const getEnvironment = (env: string = 'production') => {
  return environments[env as keyof typeof environments] || environments.production;
};
