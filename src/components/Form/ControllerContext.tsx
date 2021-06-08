import React from 'react';

const ControllerContext = React.createContext<{ status?: 'error' }>({});

export default ControllerContext;
