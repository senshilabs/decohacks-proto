import React, { ReactNode } from "react"
import Header from "./Header"

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-fit min-h-[100vh] w-full justify-center px-[44px] ">
            <div className="flex w-[1176px] max-w-[1176px] flex-col items-center">
                <Header />

                {children}
            </div>

            {/* <Footer /> */}
        </div>
    )
}

export default Layout
