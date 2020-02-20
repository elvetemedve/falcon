#! /usr/bin/env node

console.log('Creating your local config...');

// Dependencies
const { resolve: resolvePath } = require('path'),
  fs = require('fs'),
  inquirer = require('inquirer'),
  prompt = inquirer.createPromptModule(),
  template = require('./templates/server-config');

// Common Variables
// @todo - this will need replacing with the real path
const filePath = resolvePath(__dirname, './local.json');

// Data
const configData = {
  algolia: {
    id: '',
    key: '',
    index: ''
  },
  base: {
    name: 'falcon-server-demo',
    port: 4000
  },
  bigcommerce: {
    siteId: '',
    clientId: '',
    clientSecret: '',
    token: '',
    gqlUrl: '',
    gqlToken: ''
  },
  stripe: {
    key: '',
    secret: ''
  }
};

// Check if the file exists
function checkIfConfigExists() {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(filePath)) {
        prompt([
          {
            name: 'deleteFile',
            type: 'confirm',
            message: 'You already have a config file, do you want to recreate it?'
          }
        ]).then(config => {
          if (config.deleteFile) {
            try {
              fs.unlinkSync(filePath);
              console.log('Your current config file has been removed');
              resolve();
            } catch (err) {
              console.error(err);
            }
          } else {
            reject(new Error('Stopping config setup, your current config file has not been changed'));
          }
        });
      } else {
        resolve();
      }
    } catch (err) {
      console.error(err);
    }
  });
}

// Create the json file
const createFile = () => {
  const content = template(configData);
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log('The file was succesfully saved!');
    }
  });
};

// Base Config
function getBaseConfig() {
  return new Promise(resolve => {
    prompt([
      {
        name: 'name',
        message: 'App Name?',
        default: 'falcon-server-demo'
      },
      {
        type: 'number',
        name: 'port',
        message: 'What port do you want to run on?',
        default: 4000
      }
    ])
      .then(config => {
        configData.base = { ...configData.base, ...config };
      })
      .then(() => {
        resolve();
      });
  });
}

// Big Commerce Config
function getBigcommerceConfig() {
  return new Promise(resolve => {
    prompt([
      {
        name: 'addDetails',
        type: 'confirm',
        message: `Do you want to add Bigcommerce details?`
      },
      {
        name: 'siteId',
        message: 'Site ID',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'clientId',
        message: 'Client ID',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        type: 'password',
        name: 'clientSecret',
        message: 'Client Secret',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'token',
        message: 'Access Token',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'gqlUrl',
        message: 'GraphQL Url',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'gqlToken',
        message: 'GraphQL Token',
        when(answers) {
          return answers.addDetails;
        }
      }
    ])
      .then(config => {
        configData.bigcommerce = { ...configData.bigcommerce, ...config };
      })
      .then(() => {
        resolve();
      });
  });
}

// Algolia Config
function getAlgoliaConfig() {
  return new Promise(resolve => {
    prompt([
      {
        name: 'addDetails',
        type: 'confirm',
        message: `Do you want to add Algolia details?`
      },
      {
        name: 'id',
        message: 'Application ID',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'key',
        message: 'Search-Only API Key',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        name: 'index',
        message: 'Search Index',
        when(answers) {
          return answers.addDetails;
        }
      }
    ])
      .then(config => {
        configData.algolia = { ...configData.algolia, ...config };
      })
      .then(() => {
        resolve();
      });
  });
}

// Stripe Config
function getStripeConfig() {
  return new Promise(function(resolve) {
    prompt([
      {
        name: 'addDetails',
        type: 'confirm',
        message: `Do you want to add Stripe details?`
      },
      {
        name: 'key',
        message: 'Public Key',
        when(answers) {
          return answers.addDetails;
        }
      },
      {
        type: 'password',
        name: 'secret',
        message: 'Secret Key',
        when(answers) {
          return answers.addDetails;
        }
      }
    ])
      .then(config => {
        configData.stripe = { ...configData.stripe, ...config };
      })
      .then(() => {
        resolve();
      });
  });
}

// Run Events
checkIfConfigExists()
  .then(() => {
    return getBaseConfig();
  })
  .then(() => {
    return getBigcommerceConfig();
  })
  .then(() => {
    return getAlgoliaConfig();
  })
  .then(() => {
    return getStripeConfig();
  })
  .then(() => {
    return createFile();
  })
  .catch(error => {
    console.log(error.message);
  });
