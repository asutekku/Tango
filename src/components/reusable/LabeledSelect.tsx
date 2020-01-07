import * as React from 'react';
import {UIItem} from '../../def/IUIitem';
import {Collection} from '../../def/Collection';

interface LabeledState {
    value: string;
}

interface LabeledProps {
    label: string,
    options: UIItem[],
    handleChange?: any,
    emptyDefault?: boolean,
    canBeEmpty?: boolean,
    default?: any,
    name: string
}

class LabeledSelect extends React.Component<LabeledProps, LabeledState> {
    name = this.props.label.toLowerCase().replace(' ', '-');

    constructor(props) {
        super(props);
        this.state = {value: this.props.default ? this.props.default : 'undefined'};
    }

    handleChange = (e: any) => {
        const index = e.target.selectedIndex;
        const subject_ID = e.target.childNodes[index].value;
        this.setState({value: subject_ID});
        this.props.handleChange(e);
    };

    componentDidMount(): void {
        console.log(this.props.default);
        this.setState({value: this.props.default});
    }

    render() {
        return (
            <div className={'input-container'}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select name={this.props.name}
                        onChange={this.handleChange}
                        value={this.props.default}>
                    <option value="undefined" disabled={!this.props.canBeEmpty} hidden>Not selected</option>
                    {
                        this.props.options ? this.props.options.map((e: Collection, i: number) => {
                            return <option key={this.props.label + i}
                                           value={e.id}>{e.name}</option>;
                        }) : null}
                </select>

            </div>
        );
    }
}

export default LabeledSelect;