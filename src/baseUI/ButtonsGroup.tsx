import React from 'react';


export type ButtonConfig = {
    title: string,
    onClick: (value: any) => void,
    disabled: boolean,
    value: any
}

export function ButtonsGroup({ buttonConfigs }: { buttonConfigs: ButtonConfig[] }) {
    return <>
        {buttonConfigs.map((buttonConfig: ButtonConfig) => {
            return (
                <button onClick={() => buttonConfig.onClick(buttonConfig.value)}
                    disabled={buttonConfig.disabled}
                    key={buttonConfig.value}>
                    {buttonConfig.title}
                </button>
            )
        })
        }
    </>



}
