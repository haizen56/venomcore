import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
       {
      name: 'google-site-verification',
      content: 'lwkYQS4O-f948Ew5pdECSVz5Hk9VELDY5EZ4Pxlqw3U',
    },
      title: 'Venom Core',
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
         <meta
    name="google-site-verification"
    content="lwkYQS4O-f948Ew5pdECSVz5Hk9VELDY5EZ4Pxlqw3U"
         />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
