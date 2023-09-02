import type { AppProps } from "next/app"
import "../styles/globals.css"

import { lineaTestnet, optimismGoerli } from "@wagmi/core/chains"
import { publicProvider } from "@wagmi/core/providers/public"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { useEffect, useState } from "react"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import Layout from "../components/layout/Layout"

const { chains, publicClient } = configureChains(
    [lineaTestnet, optimismGoerli],
    [publicProvider(), publicProvider()]
)

// const config = createConfig({
//     autoConnect: false,
//     publicClient,
//     webSocketPublicClient
// })

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: process.env.ALCHEMY_ID, // or infuraId
        walletConnectProjectId: "b0fa395d3802f440492386b0a31f5376",

        // Required
        appName: "Your App Name",

        // Optional
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
        chains,
        publicClient
    })
)

const App = ({ Component, pageProps }: AppProps) => {
    const [hasMounted, setHasMounted] = useState(false);

    // Hooks
    useEffect(() => {
        setHasMounted(true);
    }, [])

    // Render
    if (!hasMounted) return null;

    return(
    <WagmiConfig config={config}>
        <ConnectKitProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ConnectKitProvider>
    </WagmiConfig>
    )
}

export default App
