import React, {FC} from 'react';
import s from './AddPackModal.module.css'
type MyModalPropsType = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const AddPackModal: FC<MyModalPropsType> = ({children, visible, setVisible}) => {
    const rootClasses = [s.myModal];
    if (visible) {
        rootClasses.push(s.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={s.myModalContent} onClick={event => {
                event.stopPropagation()
            }}>
                {children}
            </div>
        </div>
    );
};

export default AddPackModal;
