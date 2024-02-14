/* eslint i18next/no-literal-string: "off" */
import {Meta} from '@storybook/react';
import {CustomPagination, PaginationProps} from './CustomPagination.tsx';

const meta: Meta<PaginationProps> = {
    component: CustomPagination,
    title: 'shared/components/CustomPagination',
};

export default meta;


export const Component = () => {
    return (
        <>
            <CustomPagination
                totalPages={10}
            />
        </>
    );
};

Component.parameters = {
    msw: {
        handlers: []
    },
}