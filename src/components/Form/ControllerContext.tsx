import React from 'react';

const ControllerContext = React.createContext<{ status?: 'default' | 'success' | 'warning' | 'error' | 'loading' }>({});

export default ControllerContext;
