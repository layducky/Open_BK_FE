'use client'
import { ToggleBtn } from '@/components/common/buttons/toggleBtn';
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";
import { TestProvider } from '@/context/TestContext';
import { useUser } from '@/hooks/querys/useUser';
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
        const { data: user } = useUser();

        React.useEffect(() => {
            const fetchTestId = async () => {
                setIsLoading(true);
                const { testID } = await params;
                setTestId(testID);
                setIsLoading(false);
            };

            fetchTestId();
        }, [params]);

        const canEdit = user?.role === 'COLLAB' || user?.role === 'ADMIN';
        const showLoading = useMinimumLoading(isLoading);

        if (showLoading) {
            return <LoadingScreen />;
        }

        return (
            <TestProvider testID={testID}>
                <main className="flex flex-col">
                    {canEdit && <ToggleBtn testID={testID as string} />}
                    {children}
                </main>
            </TestProvider>
        )
    }
