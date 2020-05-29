import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";


export class User extends React.Component<{}, {}> {
    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>User</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is user page.
                    </div>
                </div>
            </div>
        );
    }
}