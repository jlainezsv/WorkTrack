module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: {
        circular: true
      }
    }
  ],

  options: {
    doNotFollow: {
      path: "node_modules"
    },
    exclude: {
      path: "node_modules"
    },
    includeOnly: "^src"
  }
};
module.exports = {
  forbidden: [
    {
      name: "no-domain-dependency",
      severity: "error",
      from: {
        path: "^src/domain"
      },
      to: {
        pathNot: "^src/domain"
      }
    }
  ],

  options: {
    includeOnly: "^src",
    doNotFollow: {
      path: "node_modules"
    },
    exclude: {
      path: "node_modules"
    }
  }
};