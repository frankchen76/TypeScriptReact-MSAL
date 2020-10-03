import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";

import { About } from "./About";
import { User } from "./User";
import { Home } from "./Home";
import { UploadFile } from "./UploadFile";
import { Header } from "./Header";
import { AuthProvider2 } from "../msal/AuthProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Account } from "msal";

interface IMainProps {
    account?: Account;
}

export class Main extends React.Component<IMainProps, {}>{
    render() {
        const style = {
            width: "800px"
        };
        return (
            <Router>
                <div className="ms-Grid" style={style}>
                    {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <Header account={this.props.account.name} />
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <Switch>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <Route path="/users">
                                    <User />
                                </Route>
                                <Route path="/uploadfile">
                                    <UploadFile />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
// wrap up with AuthProvider
export default AuthProvider2<IMainProps>(Main);

// export class Main extends React.Component<{}, {}> {
//     private testOnClickHandler(val?: string) {
//         alert(val);
//         let a = {
//             id: 1,
//             name: "test"
//         };
//         for (let key in a) {
//             console.log(key);
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <Hello compiler="TypeScript" framework="React" />
//                 <MyTimer label="Current time:" />
//                 <button onClick={this.testOnClickHandler.bind(this, "Test")}>Test</button>
//             </div>
//         );
//     }
// };