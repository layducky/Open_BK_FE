'use client'
import { ToggleBtn } from '@/components/common/buttons/toggleBtn';
import { UnitProvider } from '@/context/UnitContext';
import * as React from 'react'

export default function UnitLayout({
        children,
        params
    }: Readonly<{
        children: React.ReactNode;
        params: Promise<{ unitID: string }>
    }>) {
        const [unitID, setUnitId] = React.useState<string | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        React.useEffect(() => {
            const fetchUnitId = async () => {
                setIsLoading(true);
                const { unitID } = await params;
                setUnitId(unitID);
                setIsLoading(false);
            };
        
            fetchUnitId();
        }, [params]);

        if (isLoading) {
            return (
            <main className="flex flex-col">
                <div>Loading...</div>
            </main>
            );
        }
        
        return (
            <UnitProvider unitID={unitID}>
                <main className="flex flex-col">                
                    <ToggleBtn unitID={unitID as string} />
                    {children}
                </main>
            </UnitProvider>
        )
    }
