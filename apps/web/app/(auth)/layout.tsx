import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

const AuthenticationLayout = ({children}:{children:React.ReactNode}) => {
    return ( 
    <AuthLayout>
        {children}
    </AuthLayout>
     );
}
 
export default AuthenticationLayout;