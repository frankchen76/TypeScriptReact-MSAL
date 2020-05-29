import * as React from "react";
import {
    Link
} from "react-router-dom";
import { Account } from "msal";

export interface IHeaderProps {
    account?: string;
}

export class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const customStyle = {
            "display": "inline",
            "list-style-type": "none"
        };
        return (
            <div>
                <ul className="ms-Grid-row" style={customStyle} >
                    <li className="ms-Grid-col">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
                <div>{this.props.account}</div>
            </div>
        );
    }
}