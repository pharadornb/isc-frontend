import '../../css/AdminDashboard/AdminDashboardBox.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import MessageIcon from '@mui/icons-material/Message';

function AdminDashboardBox(){
    
    return(
        <>
        <div class="col-md-3">
            <div class='box b1'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดผู้รับบริการ</b></label>
                    <label class="textbox_style2">58</label>
                    <label class="textbox_style1">คน</label>
                </div>
                <div class="inbox_right">
                    <AccountCircleIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class='box b2'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดสถานประกอบการ</b></label>
                    <label class="textbox_style2">58</label>
                    <label class="textbox_style1">แห่ง</label>
                </div>
                <div class="inbox_right">
                    <BusinessIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>
        
        <div class="col-md-3">
            <div class='box b3'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดคลังทักษะ</b></label>
                    <label class="textbox_style2">58</label>
                    <label class="textbox_style1">ทักษะ</label>
                </div>
                <div class="inbox_right">
                    <MessageIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>
        
        <div class="col-md-3">
            <div class='box b4'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดรายรับบริการ</b></label>
                    <label class="textbox_style2">58</label>
                    <label class="textbox_style1">บาท</label>
                </div>
                <div class="inbox_right">
                    <AccountBalanceWalletIcon style={{fontSize: 60}} />
                </div>
            </div>    
        </div>
        

        </>
    )
}

export default AdminDashboardBox;