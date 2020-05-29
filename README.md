# TypeScriptReact-MSAL

This is a sample to demonstrate how to use MSAL with a TypeScript+React application. 

## Setup the project
* Create Azure AD Application
* In order to test Grapph API /me endpoint, you need to configure your AAD App to have "User.Read" permssion
* Update AAD configuration from src/msal/auth-utils.ts and replace the following items: 

```Typescript
export const msalApp = new UserAgentApplication({
    auth: {
        clientId: "[AAD App ID]",
        authority: "https://login.microsoftonline.com/[TenantId]",
        validateAuthority: true,
        postLogoutRedirectUri: "http://localhost:3000",
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: isIE()
    },
    system: {
        navigateFrameWait: 0
    }
});
```
## Building the code
* Run `npm install` to install npm packages. 
* Run the following command to compile the code and start a local webpack-dev-server: 
```command
npm run start
```
* you can open up a default browser to access  https://localhost:8080/
* if you want to start a browser after compile, replace `"start": "webpack-dev-server --https --hot --inline"` to `"start": "webpack-dev-server --https --hot --inline --open"`
