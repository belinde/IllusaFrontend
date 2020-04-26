import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { SceneBreadcrumb } from '../types';
import { connect } from 'react-redux';
import { IllusaState } from '../state';

const Component = ({ breadcrumbs }: { breadcrumbs: SceneBreadcrumb[] }) => (
    <Breadcrumb>
        {breadcrumbs.map((crumb) => (
            <Breadcrumb.Item>{crumb.label}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
);

export default connect((state: IllusaState) => ({
    breadcrumbs: state.breadcrumbs,
}))(Component);
