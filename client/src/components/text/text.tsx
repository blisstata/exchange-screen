import * as React from 'react';
import './text.less';

const BASE_CLASS= 'Revolut__text';

export enum TextType {
    default = 'default',
    text = 'text',
    title2 = 'title-2',
    title1 = 'title-1',
    detailTextBold = 'detail-text-bold'
}

export enum TextTransform {
    default = 'default',
    uppercase = 'uppercase',
    capitalize = 'capitalize'
}

export enum TextColor {
    black = 'black',
    gray = 'gray',
    mediumgray = 'mediumgray',
    lightgray = 'lightgray',
    almostwhite = 'almostwhite',
    white = 'white',
    red = 'red'
}

export interface TextProps {
    type?: TextType;
    children?: any;
    textTransform?: TextTransform;
    textColor?: TextColor;
}

const defaultProps = {
    type: TextType.default,
    textColor: TextColor.black,
    textTransform: TextTransform.default
}

export const Text = (props: TextProps = defaultProps) => {
    return (
        <span 
            className={
                `${BASE_CLASS} ${BASE_CLASS}-${props.type} 
                ${BASE_CLASS}-${props.textColor} ${BASE_CLASS}-${props.textTransform}`
            }
        >
            {props.children}
        </span>
    )
};
