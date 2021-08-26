import React, {ChangeEvent, DetailedHTMLProps, FC, SelectHTMLAttributes} from 'react';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type MySelectPropsType = DefaultSelectPropsType & {
    options: Array<{ value: string, name: string }>;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const MySelect: FC<MySelectPropsType> = ({options, defaultValue, value, onChange}, ...restProps) => {

    return (
        <select value={value}
                onChange={onChange}
        >
            <option disabled value=''>{defaultValue}</option>
            {
                options.map(o => <option value={o.value} key={o.value}>
                    {o.name}
                </option>)
            }
        </select>
    );
};

export default MySelect;
