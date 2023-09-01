import type { AppProps } from "next/app"
import "../styles/globals.css"

import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { WagmiConfig, createClient } from "wagmi"
import Layout from "../components/layout/Layout"

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const client = createClient(
    getDefaultClient({
        appName: "Your App Name",
        infuraId,
        autoConnect: false
    })
)

const App = ({ Component, pageProps }: AppProps) => (
    <WagmiConfig client={client}>
        <ConnectKitProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ConnectKitProvider>
    </WagmiConfig>
)

export default App
