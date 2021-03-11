const tokens = {
  admin: {
    token: "admin-permission-token",
  },
  editor: {
    token: "editor-permission-token",
  },
};

const users = {
  "admin-permission-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
  },
  "editor-permission-token": {
    roles: ["editor"],
    introduction: "I am an editor",
  },
};

module.exports = [
  // user login
  {
    url: "/user/login",
    type: "post",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect.",
        };
      }

      return {
        code: 200,
        data: token,
      };
    },
  },

  // get user info
  {
    url: "/user/info\.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details.",
        };
      }

      return {
        code: 200,
        data: info,
      };
    },
  },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: (_) => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
];
