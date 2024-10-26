import '../styles/index.scss';
import '../assets/main.css'


export const metadata = {
  title: 'Novo Fit Club',
  description: 'Somos un gimnasio de acondicionamiento físico. Train like a beast!',
  icons: {
    icon: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-32x32.png',
    shortcut: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-192x192.png',
    apple: 'https://novofitclub.com/wp-content/uploads/2024/10/cropped-favicon-1-180x180.png',   
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
