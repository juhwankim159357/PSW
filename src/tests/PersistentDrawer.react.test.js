import React from 'react';
import renderer from 'react-test-renderer';
import PersistentDrawer from '../components/Layout/PersistentDrawer';

test('Drawer menu changes depending on user role', () => {
    const root = document.createElement("div");
    ReactDOM.render(<PersistentDrawer />, root);
})