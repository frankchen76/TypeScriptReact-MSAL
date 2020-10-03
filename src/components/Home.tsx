import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";
import { JsonOutput } from "./JsonOutput";
import { PrimaryButton, Spinner, loadTheme } from "@fluentui/react";
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
    private _applyTheme() {
        loadTheme({
            palette: {
                "themePrimary": "#f55e07",
                "themeLighterAlt": "#fff8f5",
                "themeLighter": "#fde4d6",
                "themeLight": "#fcceb3",
                "themeTertiary": "#f99d68",
                "themeSecondary": "#f67124",
                "themeDarkAlt": "#dc5507",
                "themeDark": "#ba4806",
                "themeDarker": "#893504",
                "neutralLighterAlt": "#e9e9e9",
                "neutralLighter": "#e5e5e5",
                "neutralLight": "#dcdcdc",
                "neutralQuaternaryAlt": "#cdcdcd",
                "neutralQuaternary": "#c4c4c4",
                "neutralTertiaryAlt": "#bcbcbc",
                "neutralTertiary": "#a19f9d",
                "neutralSecondary": "#605e5c",
                "neutralPrimaryAlt": "#3b3a39",
                "neutralPrimary": "#323130",
                "neutralDark": "#201f1e",
                "black": "#000000",
                "white": "#f0f0f0"
            }
        });
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
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-bgColor-white" >
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is home page.
                <PrimaryButton text="Test Me" onClick={this._testHandler.bind(this)} />
                        <PrimaryButton text="Change Theme" onClick={this._applyTheme.bind(this)} />
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