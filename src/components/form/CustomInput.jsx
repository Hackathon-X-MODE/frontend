import React from 'react';
import {components} from "react-select";

const Option = (props) => {
    // console.log(props.name)
    return (
        <div className={'bg-[#21243A] text-white hover:bg-red-700'}>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export default Option;