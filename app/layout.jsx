import '../styles/index.scss';
import '../assets/main.css'

export const metadata = {
  title: 'Novo Fit Club',
  description: 'Somos un gimnasio de acondicionamiento físico. Train like a beast!',
  icons: {
    icon: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-32x32.png',
    shortcut: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-192x192.png',
    apple: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-180x180.png',   
  },
  robots: 'noindex, nofollow',
  verification: {
    google: 'nm62yAjhSE1VBCQXw08RK41l9B-nOhQX6QuxWGAuC8c'
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <main className='container-app'>
          {children}
        </main>
      </body>
    </html>
  )
}
