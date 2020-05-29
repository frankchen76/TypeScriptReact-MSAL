import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";
import { JsonOutput } from "./JsonOutput";
import { PrimaryButton, Spinner } from "@fluentui/react";
import {
    msalApp,
    //requiresInteraction,
    fetchMsGraph,
    isIE,
    GRAPH_ENDPOINTS,
    GRAPH_SCOPES,
    GRAPH_REQUESTS
} from "../msal/auth-utils";

interface IHomeState {
    loading: boolean;
    jsonObj: any;
}

export class Home extends React.Component<{}, IHomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: false,
            jsonObj: undefined
        };
    }
    //@autobind
    private async _testHandler(): Promise<void> {
        //alert("hello");
        this.setState({ loading: true });

        const account = msalApp.getAccount();
        if (account) {
            const tokenResponse = await msalApp.acquireTokenSilent(GRAPH_REQUESTS.LOGIN);
            if (tokenResponse) {
                const response = await fetchMsGraph(GRAPH_ENDPOINTS.ME, tokenResponse.accessToken);
                this.setState({
                    loading: false,
                    jsonObj: response
                });
            }
        }
    }
    private _testHandler2() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, jsonObj: "done" });
        }, 3000);
    }

    public render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is home page.
                <PrimaryButton text="Test Me" onClick={this._testHandler.bind(this)} />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        {
                            this.state.loading ? <Spinner />
                                :
                                <JsonOutput jsonObj={this.state.jsonObj} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}