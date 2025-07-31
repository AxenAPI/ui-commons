import {HTMLAttributes, PropsWithChildren} from 'react';


/**
 * Неймспейс с типизацией NScrollArea
 */

export namespace NScrollArea {
    export type TProps = PropsWithChildren &
        HTMLAttributes<HTMLElement> & {
        className?: string;
        orientation?: 'vertical' | 'horizontal' | 'both';
        options?: {
            theme?: string;
        };
    };
}
