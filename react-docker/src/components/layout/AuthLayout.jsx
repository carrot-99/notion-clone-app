import { Box, Container } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from '../../utils/authUtils'

// ここでJWTを感知すれば全ての画面で適応される 
// outletがないと下のルートのやつ表示されない 

const AuthLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // JWTを持っているのか確認
        const checkAuth = async () => {
            //認証チェック
            const isAuth = await authUtils.isAuthenticated();
            if(isAuth){
                navigate("/");
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div>
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <img src={notionLogo} alt="" 
                    style={{ width: 100, height: 100, marginBottom: 3 }}
                />
                Notionクローン開発
            </Box>
            <Outlet />
        </Container>
    </div>
  )
}

export default AuthLayout