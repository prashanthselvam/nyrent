import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { ReactNode } from 'react';

const cubejsApi = cubejs(
    process.env.NEXT_PUBLIC_CUBE_API_TOKEN as string,
    { apiUrl: process.env.NEXT_PUBLIC_CUBE_API_URL as string }
);

const MyCubeProvider = ({ children }: { children: ReactNode }) => {
    return <CubeProvider cubejsApi={cubejsApi}>{children}</CubeProvider>
}

export default MyCubeProvider