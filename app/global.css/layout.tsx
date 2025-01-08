import "./global.css"

export const metadata={
    title: "NFLGPT",
    description: "The place to go for all your NFL questions!"

}

const RootLayout = ({children})=>{
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout