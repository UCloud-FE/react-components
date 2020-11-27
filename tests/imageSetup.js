
// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';

// This was here before as we added it earlier. We still need it.
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
