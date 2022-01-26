


/* import component Table */
import AdminDashboardCheckAccountEstablishmentTable from './AdminDashboardCheckAccountEstablishmentTable';
import AdminDashboardCheckOpenSkillTable from './AdminDashboardCheckOpenSkillTable';
import AdminDashboardReceiptAndDisbursement from './AdminDashboardReceiptAndDisbursement';
import ServiceRecipientsTable from './ServiceRecipientsTable';
import ReceiptsCompanyTable from './ReceiptsCompanyTable';



function Tables(){
    return(
        <>
            <div class="col-md-3 tb" >
                <label class="box_row4_left_text_in"><b>ทักษะยอดนิยม</b></label>
                <div class="box_row4_left_in"></div>
            </div>
            <div class="col-md-9">
                <div class="box_row4_right_in">
                    {/*------table1-------*/}
                    <AdminDashboardCheckAccountEstablishmentTable/>
                    {/*------table2-------*/}
                    <AdminDashboardCheckOpenSkillTable/>
                    {/*------table3-------*/}
                    <AdminDashboardReceiptAndDisbursement/>
                    {/*------table4-------*/}
                    <ServiceRecipientsTable />
                    {/*------table5-------*/}
                    <ReceiptsCompanyTable />
                </div>
            </div>
        </>
    )
}

export default Tables;