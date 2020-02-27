import Button from '../Button/Button';
import classnames from 'classnames';
import { FORM_MESSAGE_TYPES } from '../utils/constants';
import FormMessage from '../Forms/_FormMessage';
import Popover from '../Popover/Popover';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const Select = React.forwardRef(({
    children,
    className,
    compact,
    disabled,
    disableStyles,
    id,
    placeholder,
    validationState,
    ...props
}, ref) => {

    useEffect(() => {
        if (!disableStyles) {
            require('fundamental-styles/dist/select.css');
        }
    }, []);

    const selectClasses = classnames(
        'fd-select',
        {
            'fd-select--compact': compact
        },
        className
    );

    const selectControlClasses = classnames(
        'fd-select__control',
        {
            'is-disabled': disabled,
            'is-warning': validationState?.state === 'warning',
            'is-invalid': validationState?.state === 'error',
            'is-valid': validationState?.state === 'success',
            'is-information': validationState?.state === 'information'
        }
    );

    const selectControl = (
        <div
            {...props}
            className={selectClasses}
            id={id}
            ref={ref}>
            <div className={selectControlClasses}>
                {placeholder}
                <Button
                    className='fd-select__button'
                    disabled={disabled}
                    glyph='slim-arrow-down'
                    option='light'
                    ref={ref} />
            </div>
        </div>
    );

    const listClassNames = classnames(
        'fd-list--dropdown',
        {
            'fd-list--has-message': validationState?.state
        }
    );

    const popoverBody = () => {
        return React.cloneElement(children, {
            compact: compact,
            className: listClassNames,
            role: 'listbox'
        });
    };

    return (
        <Popover
            body={
                validationState ? (
                    <>
                        <FormMessage type={validationState.state}>{validationState.text}</FormMessage>
                        {popoverBody()}
                    </>
                ) : popoverBody()}
            control={selectControl}
            disabled={disabled}
            noArrow
            placement='bottom-start'
            popperProps={{ id }} />
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    compact: PropTypes.bool,
    disabled: PropTypes.bool,
    disableStyles: PropTypes.bool,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    validationState: PropTypes.shape({
        state: PropTypes.oneOf(FORM_MESSAGE_TYPES),
        text: PropTypes.string
    })
};


export default Select;