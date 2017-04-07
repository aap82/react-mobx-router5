import { inject, observer } from 'mobx-react';
import BaseLink from './BaseLink';
import withRoute from './withRoute';

const Link = withRoute(BaseLink, true);

export default Link;