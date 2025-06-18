'use client'
import { ToggleBtn } from '@/components/common/buttons/toggleBtn';
import { TestProvider } from '@/context/TestContext';
import * as React from 'react'

export default function TestLayout({
        children,
        params
    }: Readonly<{
        children: React.ReactNode;
        params: Promise<{ testID: string }>
    }>) {
        const [testID, setTestId] = React.useState<string | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        React.useEffect(() => {
            const fetchTestId = async () => {
                setIsLoading(true);
                const { testID } = await params;
                setTestId(testID);
                setIsLoading(false);
            };
        
            fetchTestId();
        }, [params]);

        if (isLoading) {
            return (
            <main className="flex flex-col">
                <div>Loading...</div>
            </main>
            );
        }
        
        return (
            <TestProvider testID={testID}>
                <main className="flex flex-col">                
                    <ToggleBtn testID={testID as string} />
                    {children}
                </main>
            </TestProvider>
        )
    }
