import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from '../../utils/authUtils'
import Sidebar from '../common/Sidebar'
import {useDispatch} from "react-redux"
import { setUser } from '../../redux/features/userSlice'

// ここでJWTを感知すれば全ての画面で適応される 
// outletがないと下のルートのやつ表示されない 

const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // JWTを持っているのか確認
        const checkAuth = async () => {
            //認証チェック
            const user = await authUtils.isAuthenticated();
            if(!user){
                navigate("/login");
            } else {
                // ユーザを保存する。dispatchによってユーザをグローバルに扱える
                dispatch(setUser(user));
            }
        };
        checkAuth();
    }, [navigate]);

    return <div>
        <Box sx={{ display: "flex"}}>
            <Sidebar />
            <Box sx={{flexGrow: 1, p:1, width: "max-content"}}>
                <Outlet /> {/* App.jsで定義したHomeのRouteがここに全部適用される */}
            </Box>
        </Box>
    </div>
};

export default AppLayout;