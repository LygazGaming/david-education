// app/admin/login/layout.js
export default function LoginLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {children}
        </div>
    );
}