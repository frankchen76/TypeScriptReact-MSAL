import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";
import { PrimaryButton, Spinner, loadTheme, TextField } from "@fluentui/react";


export interface IUploadFileState {
    selectedFile: any;
    fileContent: string;
    fileName: string;
}
export interface IContentDef {
    AffectedObjectLeadIn: string;
}
export class UploadFile extends React.Component<{}, IUploadFileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedFile: undefined,
            fileContent: "Test doc",
            fileName: undefined
        }
    }
    private _onChangeHandler = (event: any) => {
        var file = event.target.files[0];
        console.log(file);
        // if return true allow to setState
        const reader = new FileReader();
        reader.onload = async (e) => {
            console.log(e);
            console.log(e.target.result.toString());
            var parseString = require('xml2js').parseString;
            parseString(e.target.result.toString(), (err: any, result: IContentDef) => {
                let objContent: IContentDef = result;

                this.setState({
                    selectedFile: file,
                    fileName: file.name,
                    //fileContent: objContent.AffectedObjectLeadIn
                    fileContent: e.target.result.toString()
                });

            });

        };
        reader.readAsText(file);

    }
    private _fileUploadHandler = () => {
        console.log("test");
    }
    private _testHandler() {

    }

    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>Upload File</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" name="file" className="form-control" onChange={this._onChangeHandler} />
                            </div>
                            <div className="col-md-6 pull-right">
                                <PrimaryButton text="Upload" onClick={this._fileUploadHandler} />
                            </div>
                        </form>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <TextField label={this.state.fileName} multiline rows={5} value={this.state.fileContent} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <PrimaryButton text="Test" onClick={this._testHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}