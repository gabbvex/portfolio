export const testData = {
  validCredentials: {
    username: 'Admin',
    password: 'admin123'
  },
  invalidCredentials: {
    username: 'InvalidUser',
    password: 'InvalidPass'
  },
  emptyCredentials: {
    username: '',
    password: ''
  },
  specialCharacters: {
    username: "user'name@test.com",
    password: "p@ssw0rd!#$%"
  },
  sqlInjection: {
    username: "' OR '1'='1",
    password: "' OR '1'='1"
  }
};

export const expectedMessages = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
  loginSuccess: '/dashboard'
};
