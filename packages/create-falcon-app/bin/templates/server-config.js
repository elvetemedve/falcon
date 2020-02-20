module.exports = data => {
  const { base = {}, algolia = {}, stripe = {}, bigcommerce = {} } = data;
  return `{
      "appName": "${base.name}",
      "debug": false,
      "port": ${base.port},
      "logLevel": "info",
      "verboseEvents": false,
      "components": {
        "algolia": {
          "config": {
            "appId": "${algolia.id}",
            "apiKey": "${algolia.key}",
            "indexName": "${algolia.index}"
          }
        },
        "mailer": {
          "config": {
            "transport": {
              "service": "",
              "user": "",
              "password": ""
            }
          }
        },
        "payments": {
          "config": {
            "providers": {
              "stripe": {
                "config": {
                  "secretKey": "${stripe.secret}",
                  "publicKey": "${stripe.key}"
                }
              }
            }
          }
        }
      },
      "endpoints": {
        "bigcommerce": {
          "config": {
            "host": "api.bigcommerce.com/stores/${bigcommerce.siteId}/",
            "accessToken": "${bigcommerce.token}",
            "clientId": "${bigcommerce.clientId}",
            "clientSecret": "${bigcommerce.clientSecret}"
          }
        }
      },
      "extensions": {
        "blog": {
          "package": "@deity/falcon-blog-extension",
          "config": {
            "api": "wordpress"
          }
        },
        "shop": {
          "package": "@deity/falcon-shop-extension",
          "config": {
            "api": "bigcommerce"
          }
        },
        "search": {
          "package": "@deity-io/falcon-search-extension",
          "config": {
            "api": "algolia"
          }
        },
        "falcon-custom-shop-extension": {
          "package": "./src/falcon-custom-shop-extension",
          "config": {
            "api": "bigcommerce"
          }
        }
      },
      "apis": {
        "bigcommerce": {
          "config": {
            "paymentHost": "payments.bigcommerce.com/stores/${bigcommerce.siteId}/",
            "host": "api.bigcommerce.com/stores/${bigcommerce.siteId}/",
            "accessToken": "${bigcommerce.token}",
            "clientId": "${bigcommerce.clientId}",
            "clientSecret": "${bigcommerce.clientSecret}",
            "gqlUrl": "${bigcommerce.gqlUrl}",
            "gqlToken": "${bigcommerce.gqlToken}"
          }
        }
      },
      "session": {
        "keys": [
          "secret key"
        ],
        "options": {
          "key": "session-key",
          "maxAge": 86400000,
          "overwrite": true,
          "httpOnly": true,
          "signed": true,
          "rolling": false,
          "renew": false
        }
      },
      "cache": {
        "url": "/cache",
        "resolvers": {
          "enabled": true,
          "invalidation": true,
          "default": {
            "ttl": 10
          },
          "query.menu": {
            "ttl": 15
          }
        }
      }
    }
    `;
};
