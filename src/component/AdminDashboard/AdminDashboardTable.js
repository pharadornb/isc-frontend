import * as React from 'react'

/* import component Table */
import AdminDashboardCheckAccountEstablishmentTable from './AdminDashboardCheckAccountEstablishmentTable';
import AdminDashboardCheckOpenSkillTable from './AdminDashboardCheckOpenSkillTable';
import AdminDashboardReceiptAndDisbursement from './AdminDashboardReceiptAndDisbursement';

function Tables(){
    return(
        <>
            <div class="col-md-4 tb" >
                <label class="box_row4_left_text_in"><b>ทักษะยอดนิยม</b></label>
                <div class="box_row4_left_in"></div>
            </div>
            <div class="col-md-8">
                <div class="box_row4_right_in">
                    {/*------table1-------*/}
                    <AdminDashboardCheckAccountEstablishmentTable/>
                    {/*------table2-------*/}
                    <AdminDashboardCheckOpenSkillTable/>
                    {/*------table3-------*/}
                    <AdminDashboardReceiptAndDisbursement/>
                </div>
            </div>
        </>
    )
}

export default Tables;