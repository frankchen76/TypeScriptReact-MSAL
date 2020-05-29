import * as React from 'react';
import {
    msalApp,
    //requiresInteraction,
    fetchMsGraph,
    isIE,
    GRAPH_ENDPOINTS,
    GRAPH_SCOPES,
    GRAPH_REQUESTS
} from "./auth-utils";

import { AuthError, AuthResponse, AuthenticationParameters, Account } from "msal";

// If you support IE, our recommendation is that you sign-in using Redirect APIs
//const useRedirectFlow = isIE();
const useRedirectFlow = true;

interface IAuthState {
    account: Account;
    error: string;
    emailMessages: string;
    graphProfile: any;
}


export function AuthProvider2<TOriginalProps>(
    WrappedComponent: React.ComponentClass<TOriginalProps> | React.StatelessComponent<TOriginalProps>)
    : React.ComponentClass<TOriginalProps> {
    return class Auth extends React.Component<TOriginalProps, IAuthState> {
        constructor(props: TOriginalProps) {
            super(props);

            this.state = {
                account: null,
                error: null,
                emailMessages: null,
                graphProfile: null
            };
        }
        async acquireToken(request: AuthenticationParameters, redirect: boolean) {
            return msalApp.acquireTokenSilent(request);
            // return msalApp.acquireTokenSilent(request).catch(error => {
            //     // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
            //     // due to consent or interaction required ONLY
            //     if (requiresInteraction(error.errorCode)) {
            //         return redirect ?
            //             msalApp.acquireTokenRedirect(request) :
            //             msalApp.acquireTokenPopup(request);
            //     } else {
            //         console.error('Non-interactive error:', error.errorCode)
            //     }
            // });
        }

        async componentWillMount() {
            msalApp.handleRedirectCallback((authErr: AuthError, response?: AuthResponse) => {
                if (authErr) {
                    const errorMessage = authErr.errorMessage ? authErr.errorMessage : "Unable to acquire access token.";
                    // setState works as long as navigateToLoginRequestUrl: false
                    this.setState({
                        error: errorMessage
                    });
                }
            });

            const account = msalApp.getAccount();

            if (!account) {
                msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
                return;
            }

            this.setState({
                account: account
            });


            if (account) {
                const tokenResponse = await this.acquireToken(GRAPH_REQUESTS.LOGIN, useRedirectFlow);

                if (tokenResponse) {
                    const graphProfile = await fetchMsGraph(
                        GRAPH_ENDPOINTS.ME,
                        tokenResponse.accessToken
                    ).catch(() => {
                        this.setState({
                            error: "Unable to fetch Graph profile."
                        });
                    });

                    if (graphProfile) {
                        this.setState({
                            graphProfile
                        });
                    }

                }
            }
        }

        public render(): JSX.Element {
            return (
                <WrappedComponent {...this.props}
                    account={this.state.account}
                    error={this.state.error}
                    graphProfile={this.state.graphProfile}
                />
            );
        }

    };
};
